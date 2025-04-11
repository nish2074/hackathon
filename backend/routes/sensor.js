const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const pool = require("../model/db"); // ✅ PostgreSQL connection
const cron = require("node-cron");

const checkAndNotify = require('../utils/checkandNotify');
const router = express.Router();
router.use(express.json());
router.use(cors());

const BLYNK_API = `https://blr1.blynk.cloud/external/api/get?token=${process.env.BLYNK_TOKEN}&v2&v1`;

// 🔹 Function to Determine Condition
const determineCondition = (temperature, humidity) => {
    if ((temperature >= 10 && temperature <= 30 && humidity >= 30 && humidity <= 60) ||
    (temperature >= 15 && temperature <= 40 && humidity >= 60 && humidity <= 80)) {
  return "Ideal Cond.";
} else if ((temperature >= 5 && temperature <= 40 && humidity >= 20 && humidity <= 30) ||
           (temperature >= 25 && temperature <= 45 && humidity >= 30 && humidity <= 50) ||
           (temperature >= 30 && temperature <= 45 && humidity >= 50 && humidity <= 70)) {
  return "Marginal Cond.";
} else {
  return "Non-Ideal Cond.";
}
};

// 🔹 Fetch & Store Data Every Hour (PostgreSQL)
const fetchAndStoreSensorData = async () => {
    try {
      const response = await axios.get(BLYNK_API);
      const temperature = response.data.v2;
      const humidity = response.data.v1;
      const condition = determineCondition(temperature, humidity);
  
      const currentHour = new Date();
      currentHour.setMinutes(0, 0, 0);
  
      const checkQuery = `
        SELECT id FROM sensor_tables
        WHERE timestamp >= NOW() - INTERVAL '1 hour' 
        LIMIT 1;
      `;
      const { rows } = await pool.query(checkQuery);
  
      if (rows.length > 0) {
        console.log("⚠️ Data already exists for this hour. Skipping storage...");
        return;
      }
  
      // Save data
      const insertQuery = `
        INSERT INTO sensor_tables (temperature, humidity, condition, timestamp)
        VALUES ($1, $2, $3, NOW());
      `;
      await pool.query(insertQuery, [temperature, humidity, condition]);
  
      // ✅ Send alert if condition is non-ideal
      await checkAndNotify(temperature, humidity);
  
      console.log(`✅ Data stored in PostgreSQL at: ${currentHour}`);
    } catch (error) {
      console.error("❌ Error fetching or storing data:", error);
    }
  };
  
// 🔹 Cron Job: Runs Every Hour
cron.schedule("0 * * * *", async () => {
    console.log("⏳ Running scheduled sensor data fetch...");
    await fetchAndStoreSensorData();
});
router.get("/get-hourly-data", async (req, res) => {
  try {
    const { hour } = req.query; // ✅ Make sure this line exists

    const query = `
      SELECT * FROM sensor_tables 
      WHERE EXTRACT(HOUR FROM timestamp) = $1
      ORDER BY timestamp ASC;
    `;
    const { rows } = await pool.query(query, [hour]);
    
    res.json(rows);
  } catch (err) {
    console.error("❌ Error in /get-hourly-data route:", err.message);
    res.status(500).send("Server error");
  }
});

// 🔹 Route to Get Last 24 Hours of Data (One Entry Per Hour)
router.get("/get-24hr-data", async (req, res) => {
    try {
        const query = `
            SELECT * FROM sensor_tables 
            WHERE timestamp >= NOW() - INTERVAL '24 hours' 
            ORDER BY timestamp ASC;
        `;

        const { rows } = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error("❌ Error fetching data:", error);
        res.status(500).send("Server error");
    }
});
router.get("/predict-24hr-data", async (req, res) => {
    try {
        // ✅ Fetch last 24-hour data from PostgreSQL
        const { rows } = await pool.query(
            "SELECT temperature, humidity FROM sensor_tables ORDER BY timestamp DESC LIMIT 24"
        );

        if (rows.length < 24) return res.status(400).json({ error: "Not enough data" });

        const inputData = rows.map((row) => [row.temperature, row.humidity]);

        // ✅ Send Data to Flask API
        const response = await axios.post("http://localhost:5001/predict", {
            sensor_data: inputData
        });

        const predictions = response.data.predictions;

        // ✅ Store predictions in PostgreSQL
        for (let i = 0; i < predictions.length; i++) {
            const [temperature, humidity] = predictions[i];

            await pool.query(
                "INSERT INTO predicted_sensor_tables (temperature, humidity, timestamp) VALUES ($1, $2, NOW() + INTERVAL '1 hour' * $3)",
                [temperature, humidity, i + 1]
            );
        }

        res.json({ message: "Predictions stored successfully!", predictions });
    } catch (error) {
        console.error("❌ Prediction error:", error);
        res.status(500).json({ error: "Prediction failed" });
    }
});

module.exports = router;