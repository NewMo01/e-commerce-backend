const SubCategory = require("../models/subcategory_model");
const handlerFactory = require("../helpers/handler_factory");

//take id from params => category  in body
// req.body.categoryId = req.params.catId
exports.setCatIdFromParamsToBody = function (req, res, next) {
  if (req.params.catId) {
    req.body.categoryId = req.params.catId;
  }
  next();
};

//@Desc   Create new subcategory
//@Route  POST  api/v1/subcategories
//@Access Private
exports.createSubCategory = handlerFactory.createHandler(SubCategory);


// nested route, filter sub categories with category id
exports.createFilterObject = function (req, res, next) {
  if (req.params.catId) {
    req.filterOb = { categoryId: req.params.catId };
  }
  next();
};

//@Desc   get list of subcategory
//@Route  GET api/v1/subcategories
//@Access Public
exports.getSubCategories = handlerFactory.getAllHandler(SubCategory);

//@Desc   get specific subcategory
//@Route  GET api/v1/subcategories/id
//@Access Public
exports.getSubCategory = handlerFactory.getOneHandler(SubCategory);

//@Desc   update specific subcategory
//@Route  PATCH api/v1/subcategories/id
//@Access Private
exports.updateSubCategory = handlerFactory.updateHandler(SubCategory);

//@Desc   delete subcategory
//@Route  DELETE api/v1/subcategories/id
//@Access Private
exports.deleteSubCategory = handlerFactory.deleteHandler(SubCategory);

