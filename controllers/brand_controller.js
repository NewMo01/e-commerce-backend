const Brand = require("../models/brand_model");
const handlerFactory = require("../helpers/handler_factory");
//@Desc   create brand
//@Route  POST api/v1/brands/
//@Access Private
exports.createBrand = handlerFactory.createHandler(Brand);

//@Desc   Get list of brands
//@Route  GET api/v1/brands/
//@Access Public
exports.getBrands = handlerFactory.getAllHandler(Brand);

//@Desc   Get specific brand
//@Route  GET api/v1/brands/id
//@Access Public
exports.getBrand = handlerFactory.getOneHandler(Brand);
//@Desc   update specific brand
//@Route  PATCH api/v1/brands/id
//@Access Private
exports.updateBrand = handlerFactory.updateHandler(Brand);

//@Desc   delete brand
//@Route  DELETE api/v1/brands/id
//@Access Private
exports.deleteBrand = handlerFactory.deleteHandler(Brand);