import React, { useState } from 'react';

const dayMessages = {
  0: "Pre-Sowing: Treat seeds with Trichoderma or Thiram + Carbendazim for fungal protection.",
  1: "Germination (Day 1–15): Apply fungicide like Captan if damping-off is observed. Avoid overwatering.",
  2: "Seedling Stage (Day 16–30): Spray Mancozeb (0.25%) or Carbendazim to protect against leaf spots. Start aphid/scouting.",
  3: "Vegetative Stage (Day 31–45): Spray Imidacloprid or Neem oil to manage sucking pests. Use Copper Oxychloride for fungal diseases.",
  4: "Pre-Flowering (Day 46–60): Use Hexaconazole or Tebuconazole to manage powdery mildew. Continue insect pest control (Spinosad).",
  5: "Flowering (Day 61–75): Spray Dimethoate or Acephate for thrips and mites. Use Mancozeb alternated with Chlorothalonil.",
  6: "Fruit Set (Day 76–90): Apply Emamectin benzoate or Lambda-cyhalothrin. Continue fungicide protection at 7–10 day intervals.",
  7: "Fruit Maturity (Day 91+): Avoid systemic sprays. Use only contact fungicides like Copper Oxychloride if necessary. Respect PHI before harvest.",
};

const dayOptions = [
  'Pre-Sowing',
  'Day 1–15',
  'Day 16–30',
  'Day 31–45',
  'Day 46–60',
  'Day 61–75',
  'Day 76–90',
  'Day 91+',
];

const ChilliSpraySchedule = () => {
  const [selectedDay, setSelectedDay] = useState('');

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  return (
    <div
      className="min-h-screen flex justify-center bg-fixed bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('https://www.thegardener.co.za/wp-content/uploads/2022/11/5B2A0763-scaled.jpg')"
      }}
    >
      <div className="bg-white/60 shadow-xl mt-24 mb-20 rounded-4xl p-4 max-w-2xl w-full backdrop-blur-md">
        <h1 className="text-3xl font-bold text-red-700 text-center mb-8">Chilli Spray Schedule 🌶️</h1>

        <div className="flex flex-col items-center gap-4">
          <label className="text-lg font-medium text-gray-700">Select Growth Phase:</label>
          <select
            className="px-4 py-3 rounded-xl border-2 border-red-300 shadow focus:outline-none focus:border-red-500 text-lg w-full max-w-md"
            value={selectedDay}
            onChange={handleDayChange}
          >
            <option value="">-- Choose Phase --</option>
            {dayOptions.map((label, index) => (
              <option key={index} value={index}>
                {label}
              </option>
            ))}
          </select>

          {selectedDay !== '' && (
            <div className="mt-6 text-xl text-red-800 font-medium rounded-xl p-6 shadow-inner w-full max-w-md text-center backdrop-blur-md">
              <p className="text-3xl text-gray-800 font-semibold mb-2">Recommended Spray:</p>
              {dayMessages[selectedDay] || "No recommendation for this phase."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChilliSpraySchedule;
