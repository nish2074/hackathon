import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { GaugeComponent } from "react-gauge-component";
import Dashboard from "../../components/dashboard/dashboard";
import BarChart from "../../components/BarChart";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
} from "chart.js";

// 🔹 Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Legend);

const Home = () => {
  const [className, setClassName] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [data24, setData24] = useState([]);
  const [condition, setCondition] = useState("");

  // 🔹 Determine environment condition
  const determineCondition = (temp, hum) => {
    if (
      (temp >= 10 && temp <= 30 && hum >= 30 && hum <= 60) ||
      (temp >= 15 && temp <= 40 && hum >= 60 && hum <= 80)
    ) {
      return "Ideal Cond.";
    } else if (
      (temp >= 5 && temp <= 40 && hum >= 20 && hum <= 30) ||
      (temp >= 25 && temp <= 45 && hum >= 30 && hum <= 50) ||
      (temp >= 30 && temp <= 45 && hum >= 50 && hum <= 70)
    ) {
      return "Marginal Cond.";
    } else {
      return "Non-Ideal Cond.";
    }
  };

  // 🔹 Fetch live sensor data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://blr1.blynk.cloud/external/api/get?token=eTPtyIy38_3eRM3rdj-FEXnRxkYHoYyT&v2&v1&v3&v4&v5`
      );
      const sensorData = response.data;
      const temp = sensorData.v2;
      const hum = sensorData.v1;
    

      setTemperature(temp);
      setHumidity(hum);

      const cond = determineCondition(temp, hum);
      console.log("condition:",cond)
      setCondition(cond);
      console.log("cond:",condition)

      if (cond === "Ideal Cond.") setClassName("text-blue-400 text-2xl");
      else if (cond === "Marginal Cond.") setClassName("text-yellow-400 text-2xl");
      else setClassName("text-red-400 text-2xl");
    } catch (error) {
      console.error("❌ Error fetching live data:", error);
    }
  };

  // 🔹 Fetch 24-hour data
  const fetchData24 = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/get-24hr-data");
      const formattedData = response.data.map((entry) => ({
        ...entry,
        timestamp: new Date(entry.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
      setData24(formattedData);
    } catch (error) {
      console.error("❌ Error fetching 24-hour data:", error);
    }
  };

  // 🔹 Fetch live + 24hr data periodically
  useEffect(() => {
    fetchData();
    console.log("condition----",condition)
    fetchData24();
    const interval = setInterval(() => {
      fetchData();
      fetchData24();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex min-h-screen bg-gray-400 pl-64 p-8">
        <div className="flex flex-col w-full items-center gap-8">
          {/* Dashboard Section */}
          <div className="w-full">
            <Dashboard />
          </div>

          {/* Gauges and Bar Chart Section */}
          <div className="flex w-full gap-6">
            {/* Temperature Gauge */}
            <div className="flex flex-col items-center justify-center bg-white p-6 shadow-lg rounded-lg w-1/4">
              <h2 className="text-xl font-bold mb-4">Temperature</h2>
              <GaugeComponent value={temperature} maxValue={100} type="radial" />
              <h1 className={className}>Condition: {condition}</h1>
            </div>

            {/* Humidity Gauge */}
            <div className="flex flex-col items-center justify-center bg-white p-6 shadow-lg rounded-lg w-1/4">
              <h2 className="text-xl font-bold mb-4">Humidity</h2>
              <GaugeComponent value={humidity} maxValue={100} type="radial" />
              <h1 className={className}>Condition: {condition}</h1>
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-6 shadow-lg rounded-lg w-2/5">
              <h2 className="text-xl font-bold text-center mb-4">
                Temperature & Humidity (Last 24 Hours)
              </h2>
              <BarChart value={data24} />
            </div>
          </div>

          {/* Line Graphs Section */}
          <div className="w-full flex flex-row gap-8">
            {/* Temperature Line Chart */}
            <div className="w-full h-96 p-4 bg-white shadow-lg rounded-lg">
              <h2 className="text-xl font-bold mb-4">Temperature (Last 24 Hours)</h2>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data24}>
                  <XAxis dataKey="timestamp" />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip />
                  <CartesianGrid stroke="#ccc" />
                  <Line type="monotone" dataKey="temperature" stroke="red" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Humidity Line Chart */}
            <div className="w-full h-96 p-4 bg-white shadow-lg rounded-lg">
              <h2 className="text-xl font-bold mb-4">Humidity (Last 24 Hours)</h2>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data24}>
                  <XAxis dataKey="timestamp" />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip />
                  <CartesianGrid stroke="#ccc" />
                  <Line type="monotone" dataKey="humidity" stroke="blue" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
