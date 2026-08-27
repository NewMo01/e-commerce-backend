const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "coupon code is required"],
      unique: [true, "coupon code must be unique"],
    },
    discountPercentage: {
      type: Number,
      required: [true, "coupon must have discount percentage"],
      min: 0,
      max: 100,
    },
    expireDate: { type: Date, required: [true, "expire date is required"] },
    isActive: { type: Boolean, default: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "userid is required"],
      unique: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret.updatedAt;
        return ret;
      },
    },
  },
);

module.exports = mongoose.model("Coupon", couponSchema);
