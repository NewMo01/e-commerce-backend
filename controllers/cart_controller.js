const jsend = require("jsend");
const Err = require("../helpers/app_error");
const Product = require("../models/product_model");

exports.getCartItems = async function (req, res) {
  const ids = req.user.cartItems.map((item) => item.productId);
  const products = await Product.find({ _id: { $in: ids } }).select(
    "title description price previewImg sold _id",
  );

  const resItems = products.map( (product) => {
    const item = req.user.cartItems.find((i) => i.productId.toString() === product._id.toString());
    const quantity = item.quantity;

    return { product, quantity };
  });

  res.status(200).jsend.success(resItems);
};

exports.addCartItem = async function (req, res) {
  const user = req.user;
  const { productId } = req.params;
  const existItem = user.cartItems.find(
    (item) => item.productId.toString() === productId,
  );

  if (existItem) {
    existItem.quantity += 1;
  } else {
    user.cartItems.push({ productId });
  }

  await user.save();

  res.status(200).jsend.success(user.cartItems);
};

exports.updateCartItem = async function (req, res, next) {
  const user = req.user;
  const { productId } = req.params;
  const { quantity } = req.body;

  const cartItem = user.cartItems.find(
    (item) => item.productId.toString() === productId,
  );
  if (!cartItem) {
    return next(Err.create("product not exists in cart", 400, true));
  } else if (cartItem.quantity === 0) {
    user.cartItems = user.cartItems.filter(
      (item) => item.productId.toString() !== productId,
    );
  } else {
    cartItem.quantity = quantity;
  }

  await user.save();
  res.status(200).jsend.success(user.cartItems);
};

exports.removeCartItem = async function (req, res, next) {
  const user = req.user;
  const { productId } = req.params;

  const exists = user.cartItems.find(
    (item) => item.productId.toString() === productId,
  );
  if (!exists) {
    return next(Err.create("product not found in cart", 400, true));
  }
  user.cartItems = user.cartItems.filter(
    (item) => item.productId.toString() !== productId,
  );
  await user.save();
  res.status(200).jsend.success(user.cartItems);
};

exports.removeAllFromCart = async function (req, res) {
  req.user.cartItems = [];
  await req.user.save();
  res.status(200).jsend.success(req.user.cartItems);
};
