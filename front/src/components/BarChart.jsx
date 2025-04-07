import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// 🔹 Register required chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ value }) => {
  if (!value || value.length === 0) {
    return <p>No Data Available</p>;
  }

  // 🔹 Extract timestamps and temperature values
  const labels = value.map((entry) => entry.timestamp);
  const temperatureValues = value.map((entry) => {
    const tempStr = entry.temperature;
    return typeof tempStr === "string" ? parseFloat(tempStr.replace("°C", "")) : tempStr;
  });
  
  const humidityValues = value.map((entry) => {
    const humStr = entry.humidity;
    return typeof humStr === "string" ? parseFloat(humStr.replace("%", "")) : humStr;
  })
  

  // 🔹 Define data for the Bar chart
  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatureValues,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Humidity (%)",
        data: humidityValues,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  // 🔹 Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: "Temperature & Humidity (Last 24 Hours)" },
    },
    scales: {
      x: { title: { display: true, text: "Time" } },
      y: { title: { display: true, text: "Values" } },
    },
  };

  return (
    <div className="w-full h-96 bg-white shadow-lg rounded-lg p-4 gap-4">
      <h2 className="text-xl text-center">Data of last few hours</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;