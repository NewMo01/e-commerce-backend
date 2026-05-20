
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