const express = require("express");
const mysql = require("mysql2/promise"); // Use promise-based API
const cors = require("cors");
require("dotenv").config();
// security layers
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
// const xss = require("xss-clean");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//security middlewares
app.use(helmet()); //Helmet helps prevent attacks like cross-site scripting (XSS), clickjacking, and others just by setting the right headers.
// app.use(xss());

// Rate limiter middleware for API endpoints
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15min
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api", limiter);

//Checks the Protocol, Redirects to HTTPS or comment out if your app already use SSL in your Hosting service
// // app.use((req, res, next) => {
// //   if (req.headers["x-forwarded-proto"] !== "https") {
// //     return res.redirect("https://" + req.headers.host + req.url);
// //   }
// //   next();
// // });

// MySQL connection pool (better for production)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, // Explicit port
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Increase the timeout if needed
  connectTimeout: 10000, // 10 seconds
});
// Export the pool so it can be used in other files
module.exports.pool = pool;

// Import and use routes

app.use("/api", require("./routes/wines"));
app.use("/api", require("./routes/register"));
app.use("/api", require("./routes/login"));

// Test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Successfully connected to MySQL database");
    connection.release();
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1); // Exit if connection fails
  }
}
testConnection();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
