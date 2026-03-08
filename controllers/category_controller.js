
const AppError = require('../helpers/app_error')
const errorCatcher = require('../helpers/error_catcher')
const {pagination} = require('../helpers/find_queries')
const Category = require('../models/category_model')

const addCategory = errorCatcher(async(req,res,next)=>{
    const {name} = req.body
    const oldProduct = await Category.findOne({name})
    if(oldProduct){
        return next(AppError.create("fail", 400, { message: "Category already exists" }))
    }
    
    const product = await Category.insertOne(req.body)
    res.status(201).jsend.success({product})
})

const getCategories = async(req,res)=>{
    const paginating = pagination(req)
    const categories = await Category.find().skip(paginating.skip).limit(paginating.limit)
    res.jsend.success({categories})
}
const getCategory = async(req,res)=>{
    const category = await Category.findById(req.params.catId)
    res.jsend.success({category})

}
const updateCategory = async(req,res)=>{
    await Category.findByIdAndUpdate(req.params.catId,{$set:req.body})
    res.jsend.success({res:'Done!'})
}
const removeCategory = async (req,res)=>{
    await Category.findByIdAndDelete(req.params.catId)
    res.jsend.success({res:'Done!'})
}


module.exports = {
    addCategory,
    getCategories,
    getCategory,
    updateCategory,
    removeCategory
}