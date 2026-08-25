const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const constants = require("../helpers/constants");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "user name is required"] },
    email: {
      type: String,
      required: [true, "user email is required"],
      trim: true,
      lowercase: true,
      unique: [true, "user email exists"],
    },
    password: {
      type: String,
      required: [true, "user password is required"],
      minLength: [6, "password must be at least 6 characters"],
    },
    role: { type: String, enum: constants.USER_ROLES, default: "customer" },
    cartItems: {
      type: [
        {
          quantity: { type: Number, default: 1 },
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
        },
      ],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret.password;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      },
    },
  },
);



userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
  } else if (update.$set && update.$set.password) {
    const salt = await bcrypt.genSalt(10);
    update.$set.password = await bcrypt.hash(update.$set.password, salt);
  }
});

userSchema.methods.comparePass = function (pass) {
  return bcrypt.compare(pass, this.password);
};

module.exports = mongoose.model("User", userSchema);
