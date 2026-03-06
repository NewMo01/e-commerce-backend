
const AppError = require('../helpers/app_error')
const errorCatcher = require('../helpers/error_catcher')
const tokenGenerator = require('../helpers/token_generator')
const {pagination} = require('../helpers/find_queries')
const Category = require('../models/category_model')

const addCategory = errorCatcher(async(req,res,next)=>{
    const {name} = req.body
    const oldCat = await Category.findOne({name})
    if(oldCat){
        return next(AppError.create("fail", 400, { message: "Category already exists" }))
    }
    
    const category = await Category.insertOne(req.body)
    res.status(201).jsend.success({category})
})
const getCategories = async(req,res)=>{
    const paginating = pagination(req)
    const categories = await Category.find().skip(paginating.skip).limit(paginating.limit)
    res.jsend.success({categories})
}
const getCategory = async(req,res)=>{
    const category = await Category.findOne({_id:req.params.catId})
    res.jsend.success({category})

}
const updateCategory = async(req,res)=>{
    await Category.updateOne({_id:req.params.catId},req.body)
    res.jsend.success({res:'Done!'})
}
const removeCategory = async (req,res)=>{
    await Category.deleteOne({_id:req.params.catId})
    res.jsend.success({res:'Done!'})
}


module.exports = {
    addCategory,
    getCategories,
    getCategory,
    updateCategory,
    removeCategory
}