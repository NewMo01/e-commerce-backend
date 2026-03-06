
require('dotenv').config() 
const express = require('express');
const mongoose = require('mongoose');
const jsend = require('jsend');
const productRouter = require('./routes/product_router')
const categoryRouter = require('./routes/category_router')
const userRouter = require('./routes/user_router')
const orderRouter = require('./routes/order_router')

const app = express()
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error:', err));

//create schema -> create model -> use it


app.use(jsend.middleware)
app.use(express.json())

app.use('/api/categories', categoryRouter)
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)

app.use((err,req,res,next)=>{
    if(err.message=='fail'){
        res.status(err.code||404).jsend.fail(err.data)
    }else{
        res.status(err.code||500).jsend.error(err.message)
    }
})

app.all(/.*/, (req, res) => {
    res.status(404).jsend.error('resource not found')

});

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
})