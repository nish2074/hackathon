
// backend/utils/checkAndNotify.js
const sendsms = require('./sendsms');
const pool = require('../model/db');
const User = require('../model/user');

const checkAndNotify = async (temperature, humidity) => {
  const isNonIdeal = temperature > 35 || temperature < 10 || humidity > 80 || humidity < 30;
const isMarginal=temperature >= 5 && temperature <= 40 && humidity >= 20 && humidity <= 30 ||
(temperature >= 25 && temperature <= 45 && humidity >= 30 && humidity <= 50) ||
(temperature >= 30 && temperature <= 45 && humidity >= 50 && humidity <= 70)
const isIdeal=  temperature >= 10 && temperature <= 30 && humidity >= 30 && humidity <= 60 ||
temperature >= 15 && temperature <= 40 && humidity >= 60 && humidity <= 80
  if (isNonIdeal) {
    const message = `⚠️ Alert: Temp: ${temperature}°C, Humidity: ${humidity}% — Non-ideal conditions detected!`;

 
    const phoneNumber = "+919604886245";
    await sendsms(phoneNumber, message);
    console.log("📨 SMS sent to: ${phoneNumber}");
  }
  if (isIdeal) {
    const message =` ⚠️ Alert: Temp: ${temperature}°C, Humidity: ${humidity}% — Non-ideal conditions detected!`;

    const phoneNumber = "+919604886245";
    await sendsms(phoneNumber, message);
    console.log("SMS sent to: ${phoneNumber}");
    
  }
  if (isMarginal) {

    const phoneNumber = "+919604886245";
    const message =`⚠️ Alert: Temp: ${temperature}°C, Humidity: ${humidity}% — Marginal conditions detected!`;
    await sendsms(phoneNumber, message);
    console.log("SMS sent to: ${phoneNumber}");
  }
};

module.exports = checkAndNotify;