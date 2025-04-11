const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../model/user.js");
require("dotenv").config();
const Jwt=require("jsonwebtoken")

const Jwtkey="nish"
const router = express.Router();
// Store in .env file

// 🟢 REGISTER ROUTE
router.post("/register", async (req, res) => {
    try {
        const { username, email, password,phonenumber } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ userName: username });
        if (existingUser) return res.status(400).json({ error: "Username already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save new user
        const newUser = new User({ userName: username, email, password: hashedPassword,phonenumber:phonenumber });
       
        await newUser.save();
        const result = newUser.toObject();
        const token = Jwt.sign({ result }, Jwtkey, { expiresIn: "6h" });
        res.status(201).json({ result, auth: token }); // Send response only once

    } catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
});

// 🟢 LOGIN ROUTE
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }
        console.log("Login request body:", req.body);
        const user = await User.findOne({ userName: username });

        if (!user) {
            console.log("❌ User not found:", username);
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.log("❌ Invalid password for:", username);
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const token = Jwt.sign({ user }, Jwtkey, { expiresIn: "6h" });

        res.status(200).json({
            message: "Login successful",
            username: user.userName,
            auth: token
        });

    } catch (err) {
        console.error("🔥 Error in /login:", err);
        res.status(500).json({ error: "Login failed" });
    }
});
module.exports = router;
