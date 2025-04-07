const express = require("express");
const axios = require("axios");

const cors = require("cors");
require("dotenv").config();
const sensorRoute=require("./routes/sensor")
const app = express();
app.use(express.json());app.use(cors({origin:"http://localhost:5173",credentials:true}))
const userRoute=require("./routes/user");

const BLYNK_API = `https://blr1.blynk.cloud/external/api/get?token=${process.env.BLYNK_TOKEN}&v2&v1`;

 
// Load a pre-trained ML model (Replace with your actual model path)
const mongoose = require("mongoose");
require("dotenv").config();


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));
//let model;
//(async () => {
  //model = await tf.loadLayersModel("file://./ml-model/model.json"); // Replace with actual model
  //console.log("✅ ML Model Loaded Successfully!");
//})();

// Function to determine spraying condition (for reference)

app.use("/api/user",userRoute);
app.use("/api",sensorRoute)
// Fetch live sensor data from Blynk



// Predict future spraying condition using ML model
  /*app.post("/predict", async (req, res) => {
  const { temperature, humidity } = req.body;

  if (!model) {
    return res.status(500).json({ error: "ML Model not loaded yet!" });
  }

  try {
    // Preprocess input for ML model
    const inputTensor = tf.tensor2d([[temperature, humidity]]);
    
    // Make prediction
    const prediction = model.predict(inputTensor);
    const predictedCondition = prediction.dataSync()[0] > 0.5 ? "Ideal" : "Non-Ideal"; // Modify as per model

    res.json({ temperature, humidity, predictedCondition });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Prediction failed" });
  }
});*/;

// Start server

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));