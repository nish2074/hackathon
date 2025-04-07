import pandas as pd
import psycopg2

# ✅ PostgreSQL Connection Details
DB_HOST = "localhost"
DB_NAME = "sensordata"
DB_USER = "postgres"
DB_PASS = "root"
DB_PORT = "5432"  # Ensure this is correct

# ✅ Connect to PostgreSQL
try:
    conn = psycopg2.connect(
        host=DB_HOST,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASS,
        port=DB_PORT
    )
    print("✅ Connected to PostgreSQL")
except Exception as e:
    print("❌ Connection error:", e)
    exit()

# ✅ Fetch Required Data
query = "SELECT temperature, humidity FROM sensor_tables;"  # Fetch only needed columns
df = pd.read_sql(query, conn)

# ✅ Close Connection
conn.close()

# ✅ Save to CSV
df.to_csv("sensor_data.csv", index=False)
print("✅ Data saved as sensor_data.csv")