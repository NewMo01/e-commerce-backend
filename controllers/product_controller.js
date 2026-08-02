<<<<<<< HEAD
const jsend = require("jsend");
const Err = require("../helpers/app_error");
const pagination = require("../helpers/pagination");
const Product = require("../models/product_model");

//@Desc   create new product
//@Route  POST /api/v1/products/
//@Access Private
exports.createProduct = async function (req, res) {
  const product = await Product.create(req.body);
  res.status(201).jsend.success(product);
};

//@Desc   get all productS
//@Route  GET /api/v1/products/
//@Access Public
exports.getProducts = async function (req, res) {
  const { skip, limit } = pagination(req);
  const products = await Product.find()
    .skip(skip)
    .limit(limit)
    .populate("category", "name-_id");

  res.status(200).jsend.success({
    result: products.length,
    page: +req.query.page,
    products,
  });
};

//@Desc   get specific product
//@Route  GET /api/v1/products/:id
//@Access Public
exports.getProduct = async function (req, res) {
  const { id } = req.params;
  const product = await Product.findById(id).populate("category", "name-_id");

  res.status(200).jsend.success(product);
};

//@Desc   update specific product
//@Route  PATCH /api/v1/products/:id
//@Access Private
exports.updateProduct = async function (req, res, next) {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, { $set: req.body });

  if (!product) {
    return next(Err.create("product not found", 404));
  }

  res.status(200).jsend.success("Done");
};

//@Desc   delete specific product
//@Route  DELETE /api/v1/products/:id
//@Access Private
exports.deleteProduct = async function (req, res) {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(Err.create("product not found", 404));
  }

  res.status(200).jsend.success("Done");
};
=======

const AppError = require('../helpers/app_error')
const errorCatcher = require('../helpers/error_catcher')
const {pagination} = require('../helpers/find_queries')
const {deleteFile,deleteFiles} = require('../helpers/delete_files')
const Product = require('../models/product_model')
const Category = require('../models/category_model')

const addProduct = errorCatcher(async(req,res,next)=>{

    const preview = req.files && req.files['previewImg'] && req.files['previewImg'][0]? req.files['previewImg'][0].filename: null
    const imgs = req.files && req.files['imgs']? req.files['imgs'].map(file=>file.filename): []
    const {name} = req.body
    const oldProduct = await Product.findOne({name})
    if(oldProduct){
        deleteFile(preview)
        deleteFiles(imgs)
        return next(AppError.create("fail", 400, { message: "Product already exists" }))
    }

    
    
    const product = await Product.create({...req.body,previewImg:preview,imgs})
    await Category.findByIdAndUpdate(req.body.catId,{$push:{products:product._id}})
    res.status(201).jsend.success({product})
})


const getProductById = async function (req,res){
    const product = await Product.findById(req.params.productId)
    res.jsend.success({product})
}


const getProducts = async function (req,res){
    const paginating = pagination(req)
    const { q } = req.query;
    let products
    if(q){
     products = await Product.find({ name: { $regex: q, $options: 'i' } }
     
    ).skip(paginating.skip).limit(paginating.limit)

    }else{
     products = await Product.find().skip(paginating.skip).limit(paginating.limit)

    }
    res.jsend.success({products})
}


const updateProduct = async function (req,res){
    const {stock , ...rest} = req.body
    const previewImg = req.files['previewImg'][0].filename
    const imgs = req.files['imgs'].map(file=>file.filename)
    const oldProduct = await Product.findByIdAndUpdate(req.params.productId,{$set:{...rest, previewImg, imgs} , $inc:{stock}})
    deleteFile(oldProduct.previewImg)
    deleteFiles(oldProduct.imgs)
    res.jsend.success('Done!')
}


const removeProduct = async function (req,res){
    const product = await Product.findByIdAndDelete(req.params.productId)
    deleteFile(product.previewImg)
    deleteFiles(product.imgs)
    await Category.findByIdAndUpdate(product.catId,{$pull:{products:product._id}}) // remove product from category
    res.jsend.success('Done!')
}


module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    removeProduct
}
>>>>>>> 3660d0d81ea19ae5f235d781e6908fd456d15b4b
