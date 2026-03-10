const pool = require("../db");

async function getProducts(req, res) {
  try {
    const result = await pool.query("SELECT * FROM products LIMIT 100");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}

module.exports = { getProducts };
