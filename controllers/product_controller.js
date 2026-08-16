const Product = require("../models/product_model");
const handlerFactory = require("../helpers/handler_factory");

//@Desc   create new product
//@Route  POST /api/v1/products/
//@Access Private
exports.createProduct = handlerFactory.createHandler(Product);

//@Desc   get all productS
//@Route  GET /api/v1/products/
//@Access Public
exports.getProducts = handlerFactory.getAllHandler(Product, true);

//@Desc   get specific product
//@Route  GET /api/v1/products/:id
//@Access Public
exports.getProduct = handlerFactory.getOneHandler(Product);

//@Desc   update specific product
//@Route  PATCH /api/v1/products/:id
//@Access Private
exports.updateProduct = handlerFactory.updateHandler(Product);


//@Desc   delete specific product
//@Route  DELETE /api/v1/products/:id
//@Access Private
exports.deleteProduct = handlerFactory.deleteHandler(Product);