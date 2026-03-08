const mongoose = require("mongoose");
const validator = require("validator");
const constants = require('../helpers/constants')

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId, required: true },
          quantity: { type: Number, required: true },
          color: String,
          size: String,
          purchasePrice: { type: Number, required: true },
        },
      ],
      required: [true, "required"],
    },
    total: {
      type: Number,
      required: [true, "required"],
    },
    status: {
      type: String,
      enum: constants.STATUS,
      default: constants.PENDING,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // optional, null for guest checkout
    },
    guestInfo: {
      name: String,
      email: String,
      phone: {
        type: String,
        validate: {
          validator: function (v) {
            return validator.isMobilePhone(v, "ar-EG");
          },
          message: "invalid phone number",
        },
        required: [true, "required"],
      },
      shippingAddress: {
        type:{
        country:String,
        city:String,
        area:String,
        street:String,
        details:String
    },
        required:[true,'required address information']
    },
    },
    paymentInfo: {
      type: String,
      enum: ["card", "paypal", "cash"],
      default: "cash",
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

module.exports = mongoose.model("Order", orderSchema);
