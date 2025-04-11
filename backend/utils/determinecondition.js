const determineCondition = (temperature, humidity) => {
    if (
      (temperature >= 10 && temperature <= 30 && humidity >= 30 && humidity <= 60) ||
      (temperature >= 15 && temperature <= 40 && humidity >= 60 && humidity <= 80)
    ) {
      return "Ideal Cond.";
    } else if (
      (temperature >= 5 && temperature <= 40 && humidity >= 20 && humidity <= 30) ||
      (temperature >= 25 && temperature <= 45 && humidity >= 30 && humidity <= 50) ||
      (temperature >= 30 && temperature <= 45 && humidity >= 50 && humidity <= 70)
    ) {
      return "Marginal Cond.";
    } else {
      return "Non-Ideal Cond.";
    }
  };
  
  module.exports = determineCondition;
  