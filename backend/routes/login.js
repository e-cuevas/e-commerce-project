const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../server").pool;
const Joi = require("joi");

// API endpoint to Login Users and Admin and match credential into database

router.post("/login", async (req, res) => {
  const {email, password} = req.body;

  //input validation
  // sanitization

  if (!email || !password) {
    const schema = Joi.object({
      email: Joi.string().email().min(3).max(30).required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9#@!%$&]{6,30}$"))
        .required(),
    });
    const {error} = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  }
  try {
    // 1. Find User
    const query = "SELECT id, name, password, role FROM users WHERE email = ?";
    const [results] = await pool.execute(query, [email]);

    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const user = results[0]; // Extract User. Safe after length check

    // 2. Validate Password
    // Compare the hashed password

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    // 3. Generate JWT
   // Include role in token
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET, // Store in .env file
      {expiresIn: "15m"}
    );
    // 4. Send Response
    res.status(200).json({
      message: "Login Successful.",
      token,
      user: {id: user.id, name: user.name}, // Never send password
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      messsage: "Authentication failed. Please try again later.",
    });
  }
});
module.exports = router;
