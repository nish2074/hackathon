import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { GaugeComponent } from "react-gauge-component";
import Dashboard from "../../components/dashboard/dashboard";
import React from "react";import BarChart from "../../components/BarChart"


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
} from "chart.js";


// 🔹 REGISTER MISSING SCALE
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title,Legend);
const Home = () => {const [className,setClassName]=useState(null);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [data24, setData24] = useState([]);
  const [condition, setCondition] = useState("");

  // 🔹 Function to determine condition based on temperature & humidity
  const determineCondition = (temp, hum) => {
    if ((temperature >= 10 && temperature <= 30 && humidity >= 30 && humidity <= 60) ||
    (temperature >= 15 && temperature <= 40 && humidity >= 60 && humidity <= 80)) {
  return "Ideal Cond.";
} else if ((temperature >= 5 && temperature <= 40 && humidity >= 20 && humidity <= 30) ||
           (temperature >= 25 && temperature <= 45 && humidity >= 30 && humidity <= 50) ||
           (temperature >= 30 && temperature <= 45 && humidity >= 50 && humidity <= 70)) {
  return "Marginal Cond."; 
} else {
  return "Non-Ideal Cond.";
}
  };

  // 🔹 Fetch live sensor data (updates every 5s)
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://blr1.blynk.cloud/external/api/get?token=eTPtyIy38_3eRM3rdj-FEXnRxkYHoYyT&v2&v1`
      );
      
     
      const sensorData = response.data;
      console.log("hii",sensorData)
      setTemperature(sensorData.v1);
      setHumidity(sensorData.v2);
      setCondition(determineCondition(sensorData.v1, sensorData.v2));
      if(determineCondition(sensorData.v1,sensorData.v2)=="Ideal Cond.")setClassName("text-blue-400")
        else setClassName("text-red-400")
    } catch (error) {
      console.error("❌ Error fetching live data:", error);
    }
  };

  // 🔹 Fetch last 24 hours of data (updates every 5s)
  const fetchData24 = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/get-24hr-data");
      const formattedData = response.data.map(entry => ({
        ...entry,
        timestamp: new Date(entry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }));
      setData24(formattedData);console.log("home:",formattedData);
    } catch (error) {
      console.error("❌ Error fetching 24-hour data:", error);
    }
  };
 


  useEffect(() => {fetchData();
    fetchData24();
    const interval = setInterval(fetchData24, 5000);
    return () => clearInterval(interval);console.log(data24);
  }, []);

  useEffect(()=>{console.log(data24)},[data24])

  return (
    <>
<div className="flex min-h-screen bg-gray-400 pl-64 p-8">
      {/* Main Container */}
      <div className="flex flex-col w-full items-center gap-8">
        {/* Dashboard */}
        <div className="w-full">
          <Dashboard />
        </div>

        {/* Gauges Section */}
       {/* Gauges + BarChart Section */}
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
    <div className="relative">
  <div className="relative">
  <GaugeComponent value={humidity} maxValue={100} type="radial" />
  <div className="absolute inset-0 text-transparent">.</div>
</div>
</div>
  </div>

  {/* Bar Chart */}
  <div className="bg-white p-6 shadow-lg rounded-lg w-2/5">
    <h2 className="text-xl font-bold text-center mb-4">Temperature & Humidity (Last 24 Hours)</h2>
    <BarChart value={data24} />
  </div>
</div>

        {/* Graphs Section */}
        <div className="w-full flex flex-row gap-8">
          {/* Temperature Graph */}
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

          {/* Humidity Graph (Fixed title) */}
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
