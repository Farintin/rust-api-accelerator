require("dotenv").config();
const express = require("express");
const { getProducts } = require("./controllers/productController");

const app = express();

app.get("/products", getProducts);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Node API running on port ${PORT}`);
});
