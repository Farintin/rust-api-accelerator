const redis = require("../cache/redis");
const { getProducts } = require("../services/productService");

async function getProductsHandler(req, res) {
  const cached = await redis.get("products");

  if (cached) {
    return res.json(JSON.parse(cached));
  }

  const products = await getProducts();

  await redis.set("products", JSON.stringify(products), {
    EX: 10,
  });

  res.json(products);
}

module.exports = { getProductsHandler };
