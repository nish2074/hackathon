from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd;
app = Flask(__name__)

# ✅ Load Model
try:
    with open("model.pkl", "rb") as f:
        model = pickle.load(f)
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if model is None:
            return jsonify({"error": "Model not loaded!"}), 500

        data = request.json.get("sensor_data", [])
        
        if not data:
            return jsonify({"error": "No sensor data received"}), 400

        # ✅ Ensure Correct Input Shape
        data = np.array(data).reshape(1, -1)  # Shape must match training format
        df = pd.DataFrame([data], columns=["temperature", "humidity"])
        print(f"Received data:\n{df}")  # Debugging step
        # ✅ Make Prediction
        prediction = model.predict(data)  # Predict next values
        prediction = prediction.tolist()  # Convert to list for JSON response

        return jsonify({"predictions": prediction})  

    except Exception as e:
        print(f"❌ Prediction failed: {str(e)}")
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)

