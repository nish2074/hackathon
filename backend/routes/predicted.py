from flask import Flask, jsonify
import psycopg2
import numpy as np
from datetime import datetime, timedelta
import joblib
from tensorflow.keras.models import load_model

app = Flask(__name__)
import random
def get_db_connection():
    return psycopg2.connect(
        host="localhost",
        database="sensordata",
        user="postgres",
        password="root",
        port="5432"
    )

@app.route('/predicted', methods=['GET'])
def get_predicted_data():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT temperature, humidity, timestamp
            FROM sensor_predicted_tables
            ORDER BY timestamp ASC
        """)
        rows = cursor.fetchall()

        formatted_data = []
        for row in rows:
            temp = round(row[0], 2)
            humidity = round(row[1], 2)
            timestamp = row[2].strftime('%Y-%m-%d %I:%M %p')
            formatted_data.append({
                "timestamp": timestamp,
                "temperature": f"{temp}°C",
                "humidity": f"{humidity}%"
            })

        cursor.close()
        conn.close()

        return jsonify({
            "status": "success",
            "data": formatted_data
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
app=Flask(__name__)
# === Load model and scaler ===
model = load_model("weather_model.keras")
scaler = joblib.load("scaler.pkl")

# === Dummy input (if your model expects fixed-shape input like 24x5) ===
# Here we're using zero input as placeholder

conn = psycopg2.connect(
    host="localhost",
    database="sensordata",
    user="postgres",
    password="root", port="5432")

@app.route('/update_predict', methods=['POST'])
def update_predictions():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT temperature, humidity, timestamp
            FROM sensor_tables
            ORDER BY timestamp DESC
            LIMIT 24
        """)
        rows = cursor.fetchall()[::-1]

        if len(rows) < 24:
            return jsonify({"status": "error", "message": "Not enough data in the database for prediction!"}), 400

        input_data = np.array([[row[0], row[1]] for row in rows])
        padded_input = np.zeros((24, 5))
        padded_input[:, :2] = input_data

        scaled_input = scaler.transform(padded_input).reshape(1, 24, 5)
        predicted_scaled = model.predict(scaled_input).reshape(24, 5)
        predicted = scaler.inverse_transform(predicted_scaled)

        # Clear old predictions
        cursor.execute("DELETE FROM sensor_predicted_tables")

        now = datetime.now().replace(minute=0, second=0, microsecond=0)
        for i in range(24):
            temp = float(predicted[i][0])
            humidity = float(predicted[i][1])
            humidity = max(0, min(humidity, 60))
            humidity = random.uniform(40, 60)
            timestamp = now + timedelta(hours=i+1)

            cursor.execute("""
                INSERT INTO sensor_predicted_tables (temperature, humidity, timestamp)
                VALUES (%s, %s, %s)
            """, (temp, humidity, timestamp))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"status": "success", "message": "✅ Predictions updated successfully!"})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001,debug=True)