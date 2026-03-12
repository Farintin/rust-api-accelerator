const redis = require("../cache/redis");
const pool = require("../db/postgres");

async function getProducts() {
  const cacheKey = "products:1000";
  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const result = await pool.query(`
    SELECT id, name, price
    FROM products
    ORDER BY id
    LIMIT 1000
  `);

  const products = result.rows;

  await redis.set(cacheKey, JSON.stringify(products), {
    EX: 300,
  });

  return products;
}

async function getProductsFromDB() {
  const result = await pool.query(`
    SELECT id, name, price
    FROM products
    ORDER BY id
    LIMIT 1000
  `);

  expensiveCalculation();

  const products = result.rows.map((p) => ({
    id: p.id,
    name: p.name,
    price: Number(p.price),
  }));

  return products;
}

function expensiveCalculation() {
  let total = 0;

  for (let i = 0; i < 50000; i++) {
    total += Math.sqrt(i);
  }

  return total;
}

async function getProductsHeavy() {
  const result1 = await pool.query(`SELECT * FROM products LIMIT 1000`);
  const result2 = await pool.query(`SELECT * FROM products LIMIT 1000`);

  expensiveCalculation();

  return [...result1.rows, ...result2.rows];
}

module.exports = { getProducts, getProductsFromDB, getProductsHeavy };
