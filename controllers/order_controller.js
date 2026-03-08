const AppError = require("../helpers/app_error");
const errorCatcher = require("../helpers/error_catcher");
const { pagination } = require("../helpers/find_queries");
const Product = require("../models/product_model");
const constants = require("../helpers/constants");
const Order = require("../models/order_model");

const createOrder = errorCatcher(async (req, res, next) => {
  for (const item of req.body.items) {
    const id = item.productId;
    const product = await Product.findById(id);
    if (!product) {
      return next(AppError.create("product not found", 404));
    }
    if (product.stock < item.quantity) {
      return next(AppError.create("Not enough stock available", 500));
    }

    await Product.findByIdAndUpdate(item.productId, {
      $inc: { stock: -item.quantity, soldCount: item.quantity },
    });
  }

  const order = await Order.insertOne(req.body);

  res.status(201).jsend.success({ order });
});

const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  res.jsend.success({ order });
};

const getOrders = async (req, res) => {
  const paginating = pagination(req);
  const { q } = req.query;
  let orders;
  if (q) {
    orders = await Order.find({ status: q })
      .skip(paginating.skip)
      .limit(paginating.limit);
  } else {
    orders = await Order.find().skip(paginating.skip).limit(paginating.limit);
  }

  res.jsend.success({ orders });
};

const updateOrder = async (req, res) => {
  await Order.findByIdAndUpdate(req.params.orderId, { $set: req.body });
  res.jsend.success("Done!");
};

const removeOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.orderId);
  res.jsend.success("Done!");
};


const cancelOrder = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.orderId, {
    $set: { status: constants.CANCELLED },
  });
  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.productId, {
      $inc: { stock: item.quantity, soldCount: -item.quantity },
    });
  }
  res.jsend.success("order Cancelled");
};

module.exports = {
  createOrder,
  getOrderById,
  getOrders,
  updateOrder,
  removeOrder,
  cancelOrder,
};
