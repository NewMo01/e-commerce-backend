require("dotenv").config();
const connectDB = require("./config/database");
const jsend = require("jsend");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const categoryRouter = require("./routes/category_router");
const subCategoryRouter = require("./routes/subcategory_router");
const brandRouter = require("./routes/brand_router");
const productRouter = require("./routes/product_router");
const authRouter = require("./routes/auth_router");
const cartRouter = require("./routes/cart_router");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(jsend.middleware);
app.use(cookieParser());

// API Docs
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Mount Routers
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subcategories", subCategoryRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/cart", cartRouter);

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
