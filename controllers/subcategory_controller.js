const jsend = require("jsend");
const SubCategory = require("../models/subcategory_model");
const ApiFeatures = require("../helpers/features");
const AppErr = require("../helpers/app_error");

//@Desc   Create new subcategory
//@Route  POST  api/v1/subcategories
//@Access Private

exports.setCatIdFromParamsToBody = function (req, res, next) {
  if (req.params.catId) {
    req.body.categoryId = req.params.catId;
  }
  next();
};
//take id from params => category id in body
// req.body.categoryId = req.params.catId

exports.createSubCategory = async function (req, res) {
  const subcat = await SubCategory.create(req.body);
  res.status(201).jsend.success(subcat);
};

//@Desc   get list of subcategory
//@Route  GET api/v1/subcategories
//@Access Public
exports.getSubCategories = async function (req, res) {
  // nested route, get all sub categories for specific category
  let filterOb = {};
  if (req.params.catId) {
    filterOb = { categoryId: req.params.catId };
  }
  const query = new ApiFeatures(SubCategory, req.query, filterOb).paginate()
    .getQuery;
  const subcats = await query;
  res.status(200).jsend.success({
    result: subcats.length,
    page: +req.query.page,
    subcategories: subcats,
  });
};

//@Desc   get specific subcategory
//@Route  GET api/v1/subcategories/id
//@Access Public
exports.getSubCategory = async function (req, res) {
  const { id } = req.params;
  const subcat = await SubCategory.findById(id);
  res.status(200).jsend.success(subcat);
};

//@Desc   update specific subcategory
//@Route  PATCH api/v1/subcategories/id
//@Access Private
exports.updateSubCategory = async function (req, res) {
  const { id } = req.params;
  const subcat = await SubCategory.findByIdAndUpdate(id, {
    $set: { ...req.body },
  });
  if (!subcat) {
    return next(AppErr.create("subcategory not found", 404));
  }
  res.status(200).jsend.success("Done");
};

//@Desc   delete subcategory
//@Route  DELETE api/v1/subcategories/id
//@Access Private
exports.deleteSubCategory = async function (req, res) {
  const subcat = await SubCategory.findByIdAndDelete(req.params.id);
  if (!subcat) {
    return next(AppErr.create("subcategory not found", 404));
  }
  res.status(200).jsend.success("Done");
};
