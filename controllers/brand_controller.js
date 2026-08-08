const jsend = require("jsend");
const Brand = require("../models/brand_model");
const ApiFeatures = require("../helpers/features");
const Err = require("../helpers/app_error");

//@Desc   create brand
//@Route  POST api/v1/brands/
//@Access Private
exports.createBrand = async function (req, res) {
  const brand = await Brand.create(req.body);
  res.status(201).jsend.success(brand);
};

//@Desc   Get list of brands
//@Route  GET api/v1/brands/
//@Access Public
exports.getBrands = async function (req, res) {
  const query = new ApiFeatures(Brand, req.query)
    .filter()
    .sort()
    .paginate()
    .select().mongoQuery;
  console.log(query);
  const brands = await query;
  res
    .status(200)
    .jsend.success({ result: brands.length, page: +req.query.page, brands });
};

//@Desc   Get specific brand
//@Route  GET api/v1/brands/id
//@Access Public
exports.getBrand = async function (req, res) {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  res.status(200).jsend.success(brand);
};

//@Desc   update specific brand
//@Route  PATCH api/v1/brands/id
//@Access Private
exports.updateBrand = async function (req, res, next) {
  const { id } = req.params;
  const brand = await Brand.findByIdAndUpdate(id, { $set: { ...req.body } });
  if (!brand) {
    return next(Err.create("brand not found", 404));
  }
  res.status(200).jsend.success("Done");
};

//@Desc   delete brand
//@Route  DELETE api/v1/brands/id
//@Access Private
exports.deleteBrand = async function (req, res, next) {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    return next(Err.create("brand not found", 404));
  }
  res.status(200).jsend.success("Done");
};
