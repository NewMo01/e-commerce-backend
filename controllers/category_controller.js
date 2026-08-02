<<<<<<< HEAD
const jsend = require("jsend");
const Category = require("../models/category_model");
const pagination = require("../helpers/pagination");
const AppError = require("../helpers/app_error");

const notFoundError = AppError.create("category not found", 404);

// @Desc    Create Category
// @Route   POST /api/v1/categories/
// @Access  Private
exports.createCategory = async (req, res) => {
  const cat = await Category.create(req.body);
  res.status(201).jsend.success(cat);
};

// @Desc    Get list of categories
// @Route   GET api/v1/categories/
// @Access  Public
exports.getCategories = async (req, res) => {
  const { limit, skip } = pagination(req);
  const categories = await Category.find().skip(skip).limit(limit);
  res.status(200).jsend.success({
    result: categories.length,
    page: +req.query.page,
    categories,
  });
};

// @Desc    Get specific category
// @Route   GET api/v1/categories/id
// @Access  Public
exports.getCategory = async (req, res) => {
  const { id } = req.params;
  const cat = await Category.findById(id);
  res.status(200).jsend.success(cat);
};

// @Desc    Update specific category
// @Route   PATCH api/v1/categories/id
// @Access  Private
exports.updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const cat = await Category.findByIdAndUpdate(id, { $set: { ...req.body } });

  if (!cat) {
    return next(notFoundError);
  }
  res.status(200).jsend.success("Done");
};

// @Desc    delete category
// @Route   DELETE api/v1/categories/id
// @Access  Private
exports.deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  const cat = await Category.findByIdAndDelete(id);

  if (!cat) {
    return next(notFoundError);
  }
  res.status(200).jsend.success("Done");
=======

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
  const oldCategory = await Category.findById(req.params.catId);
  await Category.findByIdAndUpdate(req.params.catId, { $set: { ...req.body,
  image: req.file?req.file.filename : oldCategory.image} });
  if(req.file){
  deleteFile(oldCategory.image)
}
   
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
>>>>>>> 3660d0d81ea19ae5f235d781e6908fd456d15b4b
};
