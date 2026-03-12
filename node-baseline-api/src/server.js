require("dotenv").config();
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const {
  getProductsHandler,
  getProductsCache,
  getProductsDB,
  getProductsHeavyHandler,
} = require("./controllers/productController");

const app = express();
app.use(compression());
app.use(morgan("combined"));

app.get("/products", getProductsHandler);
app.get("/products-cache", getProductsCache);
app.get("/products-db", getProductsDB);
app.get("/products-heavy", getProductsHeavyHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Node API running on port ${PORT}`);
});
