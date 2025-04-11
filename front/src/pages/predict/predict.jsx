import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "../../components/dashboard/dashboard";import {GaugeComponent} from "react-gauge-component";import BarChart from "../../components/BarChart";
const Predict = ({ onHourSelect }) => {
  const [timestamps, setTimestamps] = useState([]);
  const [data24, setData24] = useState([]); // Store fetched data
  const [selectedData, setSelectedData] = useState(null); // Store selected hour's data
const [isdata,setIsdata]=useState(false);
const [className,setClassName]=useState(null);
  // Generate the last 24 hours with exact timestamps (e.g., "10:00:00")
  useEffect(() => {
    const now = new Date();
    const last24Hours = [];

    for (let i = 0; i < 24; i++) {
      const hourAgo = new Date(now.getTime() - i * 60 * 60 * 1000);
      const formattedHour = hourAgo.toISOString().slice(11, 13) + ":00:00"; // "HH:00:00"
      last24Hours.push(formattedHour);
    }

    setTimestamps(last24Hours.reverse()); // Show oldest to latest
  }, []);

  const fetchData24 = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/get-24hr-data");

      console.log(response.data)
      const formattedData = response.data.map(entry => ({
        ...entry,
        timestamp: new Date(entry.timestamp).toLocaleString([], {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        })
      }));
      setData24(formattedData);
      console.log("✅ Fetched 24-hour data:", formattedData);
    } catch (error) {
      console.error("❌ Error fetching 24-hour data:", error);
    }
  };

  useEffect(() => {
    fetchData24();
    const interval = setInterval(fetchData24, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleHourClick = async (selectedHour) => {
    try {
      const formattedHour = selectedHour.split(":")[0].padStart(2, "0");// Extract HH part (e.g., "22")
      const response = await axios.get(`http://localhost:5500/api/get-hourly-data?hour=${formattedHour}`);
      
      setSelectedData(response.data);
      if(response.data.length>0){
      console.log("hi",response.data[0].condition)
      if(response.data[0].condition=="Non-Ideal")setClassName("mt-2 fond font-semibold text-5xl text-red-500");
      else if(response.data[0].condition=="Marginal")setClassName("mt-2 fond font-semibold text-5xl text-yellow-400");
      else setClassName("mt-2 fond font-semibold text-5xl text-blue-500");
      if(selectedData!=null)
      console.log("✅ Data fetched for hour:", formattedHour, response.data);
      }
      else console.log("data not found")
    } catch (error) {
      console.error("❌ Error fetching hourly data:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-400 pl-64 p-8">
      <div className="flex flex-col w-full items-center gap-8 ">
        <div className="w-full">
          <Dashboard />
        </div>

        {/* Hourly Buttons */}
        <div><p className="text-4xl ">Click on the hour to see conditions (past Hours)</p></div>
        <div className="flex flex-wrap gap-2 p-4">
          {timestamps.map((hour, index) => (
            <button
              key={index}
              onClick={() => handleHourClick(hour)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {hour.slice(0, 5)} {/* Display only HH:MM */}
            </button>
          ))}
        </div>

        {/* Display Selected Data */}
        {selectedData && (

          <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
            <h2 className="text-lg font-bold mb-2 ">Data for Selected Hour:</h2>{console.log("thiws is:",selectedData)}
            {selectedData.length > 0 ? (
              <ul>
                {selectedData.map((entry, index) => (
                 <li key={index} className="p-2 border-b border-gray-300">
                 <strong>DateTime:</strong> {new Date(entry.timestamp).toLocaleString()}<br />
                 <strong>Temperature:</strong> {entry.temperature}°C | <strong>Humidity:</strong> {entry.humidity}% | <strong>Condition:</strong> {entry.condition}
               </li>
                ))}
              </ul>
            ) : (<>
              <p>No data available for this hour.</p>
              </>
            )}
          </div>
        )}
      
      <div className="flex w-full gap-6">
 

  {/* Temperature Gauge */}
   
  </div>
</div>
</div>

    
  );
};

export default Predict;