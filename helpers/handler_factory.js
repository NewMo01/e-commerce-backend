const jsend = require("jsend");
const AppError = require("../helpers/app_error");
const ApiFeatures = require("../helpers/features");
const notFoundError = AppError.create("category not found", 404);

//create
exports.createHandler = (model) => async (req, res) => {
  const doc = await model.create(req.body);
  res.status(201).jsend.success(doc);
};

//get one
exports.getOneHandler = (model) => async (req, res) => {
  const { id } = req.params;
  const doc = await model.findById(id);
  res.status(200).jsend.success(doc);
};

//get all
exports.getAllHandler =
  (model, isProduct = false) =>
  async (req, res) => {
    const filterOb = req.filterOb || {};

    let query = new ApiFeatures(model, req.query, filterOb)
      .filter()
      .search(isProduct)
      .sort()
      .paginate()
      .select().mongoQuery;

    if (isProduct) {
      query = query.populate("category", "name -_id");
    }

    const docs = await query;

    res.status(200).jsend.success({
      result: docs.length,
      page: +req.query.page,
      documents: docs,
    });
  };

// update
exports.updateHandler = (model) => async (req, res, next) => {
  const { id } = req.params;
  const doc = await model.findByIdAndUpdate(id, { $set: { ...req.body } });

  if (!doc) {
    return next(notFoundError);
  }
  res.status(200).jsend.success("Done");
};

//delete
exports.deleteHandler = (model) => async (req, res, next) => {
  const { id } = req.params;
  const doc = await model.findByIdAndDelete(id);

  if (!doc) {
    return next(notFoundError);
  }
  res.status(200).jsend.success("Done");
};
