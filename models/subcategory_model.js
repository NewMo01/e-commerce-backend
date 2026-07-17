const slugify = require("slugify");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const subCatSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "subcategory name is required"],
      unique: [true, "subcategory exists"],
      maxlength: 32,
      minlength: 2,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  },
);

subCatSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name);
  }
});

subCatSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.name) {
    update.slug = slugify(update.name);
  } else if (update.$set && update.$set.name) {
    update.$set.slug = slugify(update.$set.name);
  }
});

module.exports = mongoose.model("SubCategory", subCatSchema);
