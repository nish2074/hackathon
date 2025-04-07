const mongoose = require("mongoose");

const SensorDataSchema = new mongoose.Schema({
    temperature: Number,
    humidity: Number,
    condition: String,
    timestamp: { type: Date, default: Date.now }
});


module.exports = mongoose.model("SensorData", SensorDataSchema);
