require("dotenv").config({ path: "../../.env" }); // Load .env from root

const mongoose = require("mongoose");
const axios = require("axios");
const checkAndNotify = require("./checkandNotify");

const MONGO_URI = process.env.MONGO_URI;
const BLYNK_TOKEN = process.env.BLYNK_TOKEN;

// Debug: Log loaded Mongo URI
console.log("🔍 Loaded MONGO_URI:", MONGO_URI);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const fetchSensorData = async () => {
  try {
    console.log("\n🚀 Script started...");
    const response = await axios.get(
      `https://blr1.blynk.cloud/external/api/get?token=${BLYNK_TOKEN}&v2&v1`
    );

    const temperature = parseFloat(response.data.v2);
    const humidity = parseFloat(response.data.v1);

    console.log("📡 Fetched Temperature:", temperature);
    console.log("💧 Fetched Humidity:", humidity);

    await checkAndNotify(temperature, humidity);
    console.log("🔁 checkAndNotify executed");
    
  } catch (error) {
    console.error("❌ Error fetching or sending SMS:", error);
  }
};

// Run once immediately
fetchSensorData();

// Run every 1 hour (3600000 ms)
setInterval(fetchSensorData, 60 * 60 * 1000);
