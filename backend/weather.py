import pandas as pd
import numpy as np
from datetime import timedelta
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

# Load dataset
df = pd.read_csv("pune.csv")
df['timestamp'] = pd.to_datetime(df['date_time'])

# Select and clean data
features = ["tempC", "humidity", "pressure", "windspeedKmph", "cloudcover"]
df = df[['timestamp'] + features].dropna()

# Scale the data
scaler = MinMaxScaler()
scaled_data = scaler.fit_transform(df[features])

# Prepare sequences (24 input hours → 24 output hours)
X, y, timestamps = [], [], []
for i in range(len(scaled_data) - 48):
    X.append(scaled_data[i:i+24])
    y.append(scaled_data[i+24:i+48])
    timestamps.append(df['timestamp'].iloc[i+24:i+48].values)

X, y, timestamps = np.array(X), np.array(y), np.array(timestamps)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Build LSTM model
model = Sequential([
    LSTM(64, return_sequences=True, input_shape=(24, len(features))),
    LSTM(32),
    Dense(24 * len(features))
])
model.compile(optimizer='adam', loss='mse')

# Train model
model.fit(X_train, y_train.reshape(-1, 24 * len(features)), epochs=20, batch_size=32)

# === PREDICT ===
# Take the last 24 hours from the dataset
last_24_hours = scaled_data[-24:]
last_timestamps = df['timestamp'].iloc[-24:]

# Predict next 24 hours
input_seq = np.expand_dims(last_24_hours, axis=0)
predicted_scaled = model.predict(input_seq)
predicted_scaled = predicted_scaled.reshape(24, len(features))

# Inverse transform
predicted = scaler.inverse_transform(predicted_scaled)
predicted[:, 1] = np.clip(predicted[:, 1], 0, 60)

# Generate next 24 timestamps based on last timestamp
last_time = last_timestamps.iloc[-1]
future_times = [last_time + timedelta(hours=i+1) for i in range(24)]

# Show predicted resultsA
print("Next 24 hours forecast:")
for t, val in zip(future_times, predicted):
    print(f"{t.strftime('%Y-%m-%d %I:%M %p')}: Temp = {val[0]:.2f}°C, Humidity = {val[1]:.2f}%")
from tensorflow.keras.models import save_model
import joblib

# Save model and scaler
save_model(model, "weather_model.keras")
joblib.dump(scaler, "scaler.pkl")