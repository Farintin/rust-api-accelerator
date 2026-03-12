const {
  getProducts,
  getProductsFromDB,
  getProductsHeavy,
} = require("../services/productService");

async function getProductsCache(req, res) {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getProductsDB(req, res) {
  try {
    const products = await getProductsFromDB();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getProductsHandler(req, res) {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getProductsHeavyHandler(req, res) {
  try {
    const products = await getProductsHeavy();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getProductsCache,
  getProductsDB,
  getProductsHandler,
  getProductsHeavyHandler,
};
