const mongoose = require("mongoose");
<<<<<<< HEAD
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "product title is required"],
      trim: true,
      unique: [true, "product exists"],
      minlength: 3,
      maxlength: 100,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "product description is required"],
      minlength: [20, "product description must be at least 20 character"],
    },
    quantity: {
      type: Number,
      required: [true, "product quantity can not be empty"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "product price can not be empty"],
    },
    discountPrice: Number,
    colors: [String],
    images: [String],
    previewImg: {
      type: String,
      required: [true, "product preview image can not be empty"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "category id is required"],
    },
    subCategoryId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "SubCategory",
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    ratingsAvg: {
      type: Number,
      min: 1,
      max: 5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
=======

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "required field"],
      minlength: [2, "too short name"],
    },
    catId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "required field"],
      ref: "Category",
    },
    previewImg: {
      type: String,
      default: null,
    },
    imgs: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: null,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "required"],
      min: 0,
    },
    colors: {
      type: [String],
      default: [],
    },
    sizes: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      required: [true, "required"],
      validate: [Number.isInteger, "must be integer"],
      min: 0,
    },
    soldCount: {
    type: Number,
    default: 0,
    validate: [Number.isInteger, '{VALUE} is not an integer' ]
  },

    isActive: {
      type: Boolean,
      default: true,
>>>>>>> 3660d0d81ea19ae5f235d781e6908fd456d15b4b
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

<<<<<<< HEAD
productSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title);
  }
});

productSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.title) {
    update.slug = slugify(update.title);
  }
  else if (update.$set && update.$set.title) {
    update.$set.slug = slugify(update.$set.title);
  }
});
=======
>>>>>>> 3660d0d81ea19ae5f235d781e6908fd456d15b4b

module.exports = mongoose.model("Product", productSchema);
