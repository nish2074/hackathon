import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import BarChart from "../../components/BarChart";
import Dashboard from "../../components/dashboard/dashboard";
 // Or use your own button

import Button from "../../components/ui/button";
import { Bar } from "react-chartjs-2";
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
const Predict = () => {
  const [predictedData, setPredictedData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPredictedData = async () => {
    try {
      const res = await axios.get("http://localhost:5001/predicted");
      console.log("📊 Predicted Data:", res.data.data);
      setPredictedData(res.data.data);
    } catch (err) {
      console.error("❌ Error fetching predicted data:", err);
    }
  };
  const formattedData = predictedData.map((item) => ({
    time: item.timestamp,
    temperature: parseFloat(item.temperature.replace("°C", "")),
    humidity: parseFloat(item.humidity.replace("%", "")),
  }));

  const triggerPrediction = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5001/update_predict");
      console.log("✅ Prediction triggered:", res.data.message);
      fetchPredictedData(); // fetch new data after update
    } catch (err) {
      console.error("❌ Error triggering prediction:", err);
    } finally {
      setLoading(false);
    }
  };
  const conditionSummary = {
    ideal: { count: 0, times: [] },
    marginal: { count: 0, times: [] },
    nonIdeal: { count: 0, times: [] },
  };
  
  formattedData.forEach(({ temperature, humidity, time }) => {
    const condition = determineCondition(temperature, humidity);
    if (condition === "Ideal Cond.") {
      conditionSummary.ideal.count++;
      conditionSummary.ideal.times.push(time);
    } else if (condition === "Marginal Cond.") {
      conditionSummary.marginal.count++;
      conditionSummary.marginal.times.push(time);
    } else {
      conditionSummary.nonIdeal.count++;
      conditionSummary.nonIdeal.times.push(time);
    }
  });
  
  
  useEffect(() => {
    fetchPredictedData();
  }, []);
  useEffect(() => {
    console.log("Predicted Data:", predictedData);
    console.log("formatted Data:",formattedData);
  }, [predictedData]);
  const sixHourData = formattedData.slice(0, 6);
  return (
    <div className="flex min-h-screen bg-gray-400 pl-64 p-8">
      <div className="flex flex-col w-full gap-8">
        <Dashboard />

        {/* Trigger button */}
       

 <div className="bg-white p-6 shadow-lg rounded-lg w-full">
  <h2 className="text-xl font-bold text-center mb-4">Predicted Data (Next 24 Hours)</h2>
  <div className="w-500px h-96">


<Bar
  data={{
    labels: sixHourData.map((item) => item.time),
    datasets: [
      {
        label: "Temperature (°C)",
        data: sixHourData.map((item) => item.temperature),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        yAxisID: "y-temp",
      },
      {
        label: "Humidity (%)",
        data: sixHourData.map((item) => item.humidity),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        yAxisID: "y-humid",
      },
    ],
  }}
  options={{
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: "Temperature & Humidity (Next 6 Hours)",
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Time" },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          autoSkip: true,
        },
      },
      "y-temp": {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      "y-humid": {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Humidity (%)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }}
/>

  </div>
</div>
        {/* Line charts */}
        <div className="w-full flex flex-row gap-8">
          {/* Temperature Graph */}
          <div className="w-full h-96 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Predicted Temperature</h2>
            <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData}>
  <XAxis dataKey="time" />
  <YAxis domain={["auto", "auto"]} />
  <Tooltip />
  <CartesianGrid stroke="#ccc" />
  <Line type="monotone" dataKey="temperature" stroke="red" dot={false} />
</LineChart>
            </ResponsiveContainer>
          </div>

          {/* Humidity Graph */}
          <div className="w-full h-96 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Predicted Humidity</h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formattedData}>
                 <XAxis dataKey="time" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip />
                <CartesianGrid stroke="#ccc" />
                <Line type="monotone" dataKey="humidity" stroke="blue" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-full flex justify-center ">
          <Button
            onClick={triggerPrediction}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded items-center align-middle"
          > 
            {loading ? "Predicting..." : "Update Prediction"}
          </Button>
        </div>
        <div className="flex justify-center gap-8 mt-4">
  {/* Ideal */}
  <div className="bg-white p-4 rounded-lg shadow-md text-center w-1/3">
    <h3 className="text-lg font-semibold text-green-700">Ideal Conditions</h3>
    <p className="text-3xl font-bold">{conditionSummary.ideal.count}</p>
    <div className="text-sm mt-2 text-gray-500 h-32 overflow-y-auto">
  {conditionSummary.ideal.times.map((time, index) => (
    <p className="text-2xl" key={index}>{time}</p>
  ))}
</div>
  </div>

  {/* Marginal */}
  <div className="bg-white p-4 rounded-lg shadow-md text-center w-1/3">
    <h3 className="text-lg font-semibold text-yellow-600">Marginal Conditions</h3>
    <p className="text-3xl font-bold">{conditionSummary.marginal.count}</p>
    <div className="text-sm mt-2 text-gray-500 h-32 overflow-y-auto">
  {conditionSummary.marginal.times.map((time, index) => (
    <p className="text-2xl" key={index}>{time}</p>
  ))}
</div>
  </div>

  {/* Non-Ideal */}
  <div className="bg-white p-4 rounded-lg shadow-md text-center w-1/3">
    <h3 className="text-lg font-semibold text-red-600">Non-Ideal Conditions</h3>
    <p className="text-3xl font-bold">{conditionSummary.nonIdeal.count}</p>
    <div className="text-sm mt-2 text-gray-500 h-32 overflow-y-auto">
  {conditionSummary.nonIdeal.times.map((time, index) => (
    <p className="text-2xl " key={index}>{time}</p>
  ))}
</div>
  </div>
</div>
    </div>
    </div>
  );
};

export default Predict;
