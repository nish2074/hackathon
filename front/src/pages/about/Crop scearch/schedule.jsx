import React, { useState, useEffect } from "react";
import axios from "axios";

import Dashboard from "../../../components/dashboard/dashboard";
const Schedule = () => {
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://blr1.blynk.cloud/external/api/get?token=eTPtyIy38_3eRM3rdj-FEXnRxkYHoYyT&v2&v1&v3&v4&v5`
      );
      const sensorData = response.data;
      const temp = sensorData.v2;
      const hum = sensorData.v1;

      const cond = determineCondition(temp, hum);
      console.log("Fetched condition:", cond);
      setCondition(cond);
    } catch (error) {
      console.error("❌ Error fetching live data:", error);
    }
  };

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

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const crops = [
    { emoji: "🍎", name: "Apple", link: "../register/register5.jsx" },
    { emoji: "🥬", name: "Cabbage", link: "../register/register4.jsx" },
    { emoji: "🥕", name: "Carrot", link: "../register/register6.jsx" },
    { emoji: "🌶️", name: "Chilli", link: "../register/register7.jsx" },
    { emoji: "🥒", name: "Cucumber", link: "../register/register3.jsx" },
    { emoji: "🍇", name: "Grapes", link: "../register/register.jsx" },
    { emoji: "🥜", name: "Groundnut", link: "/pdfs/Schedule-Veg_Soy_Groundnut.pdf" },
    { emoji: "🥭", name: "Mango", link: "../register/register8.jsx" },
    { emoji: "🌼", name: "Mustard", link: "/pdfs/Schedule_Mustard_Chick-Peas.pdf" },
    { emoji: "🧅", name: "Onion", link: "../register/register9.jsx" },
    { emoji: "🥔", name: "Potato", link: "../register/register10.jsx" },
    { emoji: "🌾", name: "Rice", link: "/pdfs/Bomlife-Rice-schedule" },
    { emoji: "🍉", name: "Watermelon", link: "/pdfs/Schedule-Watermelon.pdf" },
    { emoji: "🌿", name: "Wheat", link: "/pdfs/Schedule_Wheat.pdf" },
    { emoji: "🍐", name: "Guava", link: "/pdfs/Guava_Spray_Schedule.pdf" },
    { emoji: "🌿", name: "Wheat", link: "/pdfs/Schedule_Wheat.pdf" },
    { emoji: "🍅", name: "Tomato", link: "../register/register2.jsx" },
  ];

  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
         <div className="flex min-h-screen bg-gray-200   bg-cover bg-center bg-no-repeat pl-64 p-8"
         >
    {/* Main Container for Centering */}
    <div className="flex flex-col w-full items-center gap-8 ">
        
        {/* Dashboard (Full Width) */}
        <div className="w-full"><Dashboard/></div>
        
      <h1 className="text-6xl font-bold text-yellow-400 text-center mb-4">
        Crop Spraying Schedules <span className="block text-3xl mt-1">🌱</span>
      </h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          className="w-full max-w-[40rem] px-4 py-3 border-2 border-black rounded-xl shadow  focus:border-green-500"
          placeholder="🔍 Search crop name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {filteredCrops.map((crop, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl text-center shadow hover:shadow-lg hover:-translate-y-1 transition-all relative"
            onMouseEnter={() => {
              if (crop.name === "Grapes") {
                if (condition === "Ideal Cond.") {
                  setDescription(
                    "✅ Ideal Condition:\n1. Zinc 0.50 gm + ZNB essence 1 gm or Collical Pro (Calcium Oxide) 2.5 ml + Folio MgO 500 (Magnesium) 1 ml\n2. Acrobat 1 gm + M45 2.5 gm + CPPU 1-2 ml"
                  );
                } else if (condition === "Marginal Cond.") {
                  setDescription(
                    "⚠️ Marginal Condition:\n1. Reduce dosage by 30%.\n2. Avoid spraying during peak sunlight.\n3. Monitor for fungal growth frequently."
                  );
                } else if (condition === "Non-Ideal Cond.") {
                  setDescription(
                    "❌ Non-Ideal Condition:\nSpraying not recommended due to unsuitable weather. Please wait for better conditions."
                  );
                } else {
                  setDescription("");
                }
              }
            }}
            onMouseLeave={() => {
              if (crop.name === "Grapes") setDescription("");
            }}
          >
            <div className="text-2xl mb-2">{crop.emoji}</div>
            <a
              href={crop.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-900 font-semibold text-lg hover:text-green-700"
            >
              {crop.name}
            </a>
            {crop.name === "Grapes" && description && (
              <div className="mt-2 text-sm text-gray-600 whitespace-pre-line">{description}</div>
            )}
          </div>
        ))}
      </div>

      <footer className="text-center text-yellow-500 text-4xl mt-10">
        🌸 Happy Farming! Made with 💚 by AgroMinds
      </footer>
    </div>
    </div>
    
  );
};

export default Schedule;
