const express = require("express");
const router = express.Router();
const pool = require("../server").pool; // Import the MySQL pool from server.js

// API endpoint to fetch wine data
router.get("/wines", async (req, res) => {
  const query = req.query.query; // Get the query parameter from the request

  try {
    let sql = `
      SELECT wine_id, producer, year, region, price,
     image_url
      FROM wines
    `;
    let params = [];

    // If a search query is provided, filter the results
    if (query) {
      sql += ` WHERE producer LIKE ? OR region LIKE ?`;
      params = [`%${query}%`, `%${query}%`];
    }
    const [results] = await pool.query(sql, params);
    res.json(results);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data");
  }
});

module.exports = router;
