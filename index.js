<<<<<<< HEAD
require("dotenv").config();
require("./config/database").connect;
const jsend = require("jsend");
const cors = require('cors')
const express = require("express");
const swaggerUi = require('swagger-ui-express')
const YAML =  require('yamljs')
const categoryRouter = require("./routes/category_router");
const subCategoryRouter = require("./routes/subcategory_router");
const brandRouter = require('./routes/brand_router')
const productRouter = require('./routes/product_router')



const app = express();

app.use(cors())
app.use(express.json());
app.use(jsend.middleware);

// API Docs
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))
// Mount Routers
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subcategories", subCategoryRouter);
app.use("/api/v1/brands", brandRouter)
app.use("/api/v1/products", productRouter)

app.all(/.*/, (req, res) => {
  res.status(404).jsend.error("resource not found");
});

app.use((err, req, res, next) => {
  if (err.fail) {
    return res.status(err.code || 500).jsend.fail(err.message);
  }
  res.status(err.code || 500).jsend.error(err.message);
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port " + process.env.PORT + "...");
});

process.on("unhandledRejection", (e) => {
  console.log(`ERR: ${e}`);
  server.close(() => console.log("server closed"));
  process.exit(1);
});
=======

require('dotenv').config() 
const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
const jsend = require('jsend');
const {join} = require('path')
const normalizeInput = require('./middlewares/normalize_input')
const productRouter = require('./routes/product_router')
const categoryRouter = require('./routes/category_router')
const userRouter = require('./routes/user_router')
const orderRouter = require('./routes/order_router')

const app = express()
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error:', err.message));



app.use(cors())
app.use(jsend.middleware)
app.use(express.json())
app.use('/uploads',express.static(join(__dirname,'uploads')))
app.use(normalizeInput)

app.use('/api/categories', categoryRouter)
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)

app.use((err,req,res,next)=>{
    if(err.message=='fail'){
        res.status(err.code||404).jsend.fail(err.data)
    }else{
        res.status(500).jsend.error(err.message)
    }
})

app.all(/.*/, (req, res) => {
    res.status(404).jsend.error('resource not found')

});

app.listen(process.env.PORT, () => {
    console.log('Server is running on port:',process.env.PORT);
})
>>>>>>> 3660d0d81ea19ae5f235d781e6908fd456d15b4b
