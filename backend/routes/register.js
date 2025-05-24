const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../server").pool;
const Joi = require("joi");

// API endpoint to registrate Users into database

router.post("/register", async (req, res) => {
  const {name, email, password} = req.body;

  //input validation
  // sanitization

  if (!name || !email || !password) {
    const schema = Joi.object({
      name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .pattern(new RegExp("^[a-zA-Z0-9#@!%$&]{6,30}$"))
        .required(),
      email: Joi.string().email().min(3).max(30).required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9#@!%$&]{6,30}$"))
        .required(),
    });

    return res.status(400).json({message: "All fields required"});
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // hash password
    const query = `INSERT INTO users (name, email, password, role) VALUES(?, ?, ?, 'user')`; //insert users into db
    const [result] = await pool.execute(query, [name, email, hashedPassword]);

    // Create the JWT token, using the inserted user's id
    const token = jwt.sign(
      {id: result.insertId},
      process.env.JWT_SECRET, // Ensure this is defined in your .env file
      {expiresIn: "1h"}
    );

    // Send back a success response with the token (and optionally other user info)
    res.status(201).json({
      message: "Registration successful.",
      token,
      user: {id: result.insertId, name, email},
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({message: "Name or Email already exist"});
    } else {
      res.status(500).json({message: "Registration failed"});
    }
  }
});

module.exports = router;
