const Category = require("../models/category_model");
const handlerFactory = require("../helpers/handler_factory");

// @Desc    Create Category
// @Route   POST /api/v1/categories/
// @Access  Private
exports.createCategory = handlerFactory.createHandler(Category)

// @Desc    Get list of categories
// @Route   GET api/v1/categories/
// @Access  Public
exports.getCategories = handlerFactory.getAllHandler(Category)


// @Desc    Get specific category
// @Route   GET api/v1/categories/id
// @Access  Public
exports.getCategory = handlerFactory.getOneHandler(Category)

// @Desc    Update specific category
// @Route   PATCH api/v1/categories/id
// @Access  Private
exports.updateCategory = handlerFactory.updateHandler(Category)

// @Desc    delete category
// @Route   DELETE api/v1/categories/id
// @Access  Private
exports.deleteCategory = handlerFactory.deleteHandler(Category);
