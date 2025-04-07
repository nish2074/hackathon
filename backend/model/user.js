const mongoose = require("mongoose");

const User = new mongoose.Schema({
    userName: String,
    password: String,
    email: String,
    
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("user", User);