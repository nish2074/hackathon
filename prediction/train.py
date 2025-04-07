import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib
import psycopg2
from psycopg2 import sql


# Step 1: Create a synthetic dataset
np.random.seed(42)
date_range = pd.date_range(start='2023-01-01', periods=100, freq='h')
temperature = np.random.uniform(low=15, high=30, size=(100,))  # Simulated temperature
humidity = np.random.uniform(low=30, high=90, size=(100,))  # Simulated humidity

data = pd.DataFrame({
    'datetime': date_range,
    'temperature': temperature,
    'humidity': humidity
})

# Step 2: Prepare the dataset for training
data['hour'] = data['datetime'].dt.hour
data['day'] = data['datetime'].dt.dayofweek
X = data[['hour', 'day']]
y_temp = data['temperature']
y_hum = data['humidity']

# Step 3: Split the dataset into training and testing sets
X_train, X_test, y_temp_train, y_temp_test, y_hum_train, y_hum_test = train_test_split(X, y_temp, y_hum, test_size=0.2, random_state=42)

# Step 4: Train the model for temperature prediction
temp_model = RandomForestRegressor(n_estimators=100, random_state=42)
temp_model.fit(X_train, y_temp_train)

# Train the model for humidity prediction
hum_model = RandomForestRegressor(n_estimators=100, random_state=42)
hum_model.fit(X_train, y_hum_train)

# Step 5: Save the models
joblib.dump(temp_model, 'temperature_model.pkl')
joblib.dump(hum_model, 'humidity_model.pkl')

# Step 6: Save predictions to PostgreSQL database
def save_predictions_to_db(predictions):
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(
        user="postgres",
        password="root",
        host="localhost",
        port=5432,
        database="sensordata"
    )
    cursor = conn.cursor()

    # Create table if it doesn't exist
    create_table_query = '''
    CREATE TABLE IF NOT EXISTS predictions (
        id SERIAL PRIMARY KEY,
        datetime TIMESTAMP,
        temperature FLOAT,
        humidity FLOAT
    );
    '''
    cursor.execute(create_table_query)

    # Insert predictions into the database
    insert_query = sql.SQL('INSERT INTO predictions (datetime, temperature, humidity) VALUES (%s, %s, %s)')
    for i in range(24):
        cursor.execute(insert_query, (predictions[i]['datetime'], predictions[i]['temperature'], predictions[i]['humidity']))

    # Commit changes and close the connection
    conn.commit()
    cursor.close()
    conn.close()

# Example usage of saving predictions
predictions = [{'datetime': pd.Timestamp.now() + pd.Timedelta(hours=i), 'temperature': np.random.uniform(15, 30), 'humidity': np.random.uniform(30, 90)} for i in range(24)]
save_predictions_to_db(predictions)

print("Models trained and saved successfully. Predictions saved to database.")
