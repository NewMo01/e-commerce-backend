
const AppError = require("../helpers/app_error");
const errorCatcher = require("../helpers/error_catcher");
const { pagination } = require("../helpers/find_queries");
const {deleteFile} = require('../helpers/delete_files')
const Category = require("../models/category_model");

const addCategory = errorCatcher(async (req, res, next) => {
  const { name } = req.body;
  const oldProduct = await Category.findOne({ name });

  if (oldProduct) {
    deleteFile(req.file.filename)
    return next(
      AppError.create("fail", 400, { message: "Category already exists" }),
    );
  }

  const category = await Category.create({
    ...req.body,
    image: req.file ? req.file.filename : null,
  });
  res.status(201).jsend.success({ category });
});

const getCategories = async (req, res) => {
  const paginating = pagination(req);
  const categories = await Category.find()
    .skip(paginating.skip)
    .limit(paginating.limit);
  res.jsend.success({ categories });
};
const getCategory = async (req, res) => {
  const category = await Category.findById(req.params.catId);
  res.jsend.success({ category });
};
const updateCategory = async (req, res) => {
  const oldCategory =   await Category.findByIdAndUpdate(req.params.catId, { $set: { ...req.body,
    image: req.file.filename} });
    deleteFile(oldCategory.image)
   
  res.jsend.success({ res: "Done!" });
};
const removeCategory = async (req, res) => {
   const oldCategory = await Category.findByIdAndDelete(req.params.catId);
     deleteFile(oldCategory.image)

  res.jsend.success({ res: "Done!" });
};

module.exports = {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  removeCategory,
};
