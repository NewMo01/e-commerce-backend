const jsend = require("jsend");
const Category = require("../models/category_model");
const ApiFeatures = require("../helpers/features");
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
  const query = new ApiFeatures(Category, req.query)
    .filter()
    .sort()
    .paginate()
    .select().mongoQuery;

  const categories = await query;

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
};
