const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "required field"],
      minlength: [2, "too short name"],
    },
    catId: {
      type: mongoose.Types.ObjectId,
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

module.exports = mongoose.model("Product", productSchema);
