require("dotenv").config();
require("./config/database").connect;
const express = require("express");
const jsend = require("jsend");
const categoryRouter = require("./routes/category_router");
const subCategoryRouter = require("./routes/subcategory_router");
const brandRouter = require('./routes/brand_router')

const app = express();

app.use(express.json());
app.use(jsend.middleware);

// Mount Routers
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subcategories", subCategoryRouter);
app.use("/api/v1/brands", brandRouter)

app.all(/.*/, (req, res) => {
  res.status(404).jsend.error("resource not found");
});

app.use((err, req, res, next) => {
  if (err.fail) {
    return res.status(err.code || 500).jsend.fail(err.message);
  }
  res.status(err.code || 500).jsend.error(err.message);
});

const server = app.listen(process.env.PORT || 6000, () => {
  console.log("Server is running on port " + process.env.PORT + "...");
});

process.on("unhandledRejection", (e) => {
  console.log(`ERR: ${e}`);
  server.close(() => console.log("server closed"));
  process.exit(1);
});
