
//CRUD

const AppError = require('../helpers/app_error')
const errorCatcher = require('../helpers/error_catcher')
const {pagination} = require('../helpers/find_queries')
const Product = require('../models/product_model')

const addProduct = errorCatcher(async(req,res,next)=>{
    const {name} = req.body
    const oldProduct = await Product.findOne({name})
    if(oldProduct){
        return next(AppError.create("fail", 400, { message: "Product already exists" }))
    }
    
    const product = await Product.insertOne(req.body)
    res.status(201).jsend.success({product})
})

const getProductById = async function (req,res){
    const product = await Product.findById(req.params.productId)
    res.jsend.success({product})
}
const getProducts = async function (req,res){
    const paginating = pagination(req)
    const products = await Product.find().skip(paginating.skip).limit(paginating.limit)
    res.jsend.success({products})
}
const updateProduct = async function (req,res){
    const {stock , ...rest} = req.body
    await Product.findByIdAndUpdate(req.params.productId,{$set:rest , $inc:{stock}})
    res.jsend.success('Done!')
}
const removeProduct = async function (req,res){
    await Product.findByIdAndDelete(req.params.productId)
    res.jsend.success('Done!')
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    removeProduct
}