const jsend = require("jsend");
const Err = require("../helpers/app_error");
const pagination = require("../helpers/pagination");
const Product = require("../models/product_model");

//@Desc   create new product
//@Route  POST /api/v1/products/
//@Access Private
exports.createProduct = async function (req, res) {
  const product = await Product.create(req.body);
  res.status(201).jsend.success(product);
};

//@Desc   get all productS
//@Route  GET /api/v1/products/
//@Access Public
exports.getProducts = async function (req, res) {
  const { skip, limit } = pagination(req);
  const products = await Product.find()
    .skip(skip)
    .limit(limit)
    .populate("categoryId", "name-_id");

  res.status(200).jsend.success({
    result: products.length,
    page: +req.query.page,
    products,
  });
};

//@Desc   get specific product
//@Route  GET /api/v1/products/:id
//@Access Public
exports.getProduct = async function (req, res) {
  const { id } = req.params;
  const product = await Product.findById(id).populate("categoryId", "name-_id");

  res.status(200).jsend.success(product);
};

//@Desc   update specific product
//@Route  PATCH /api/v1/products/:id
//@Access Private
exports.updateProduct = async function (req, res, next) {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, { $set: req.body });

  if (!product) {
    return next(Err.create("product not found", 404));
  }

  res.status(200).jsend.success("Done");
};

//@Desc   delete specific product
//@Route  DELETE /api/v1/products/:id
//@Access Private
exports.deleteProduct = async function (req, res) {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(Err.create("product not found", 404));
  }

  res.status(200).jsend.success("Done");
};
