const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user id is required"],
    },
    products: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "product id is required"],
          },
          quantity: {
            type: Number,
            min: [1, "quantity must be at least 1"],
            required: [true, "product quantity is required"],
          },
          price: {
            type: Number,
            min: 0,
            required: [true, "product price is required"],
          },
        },
      ],
      required: [true, "products are required"],
    },
    totalAmount: {
      type: Number,
      required: [true, "total amount is required"],
      min: 0,
    },
    stripeSessionId: {
      type: String,
      required: [true, "stripe session id is required"],
      unique: [true, "stripe session id must be unique"],
    },
  },
  {timestamps: true},
);

module.exports = mongoose.model("Order", orderSchema);
