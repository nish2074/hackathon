const fetchPrediction = async (temperature, humidity) => {
    try {
        const response = await fetch("http://localhost:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ temperature, humidity }),
        });
        const data = await response.json();
        setPredictedCondition(data.predictedCondition);
    } catch (error) {
        console.error("Error fetching prediction:", error);
    }
};