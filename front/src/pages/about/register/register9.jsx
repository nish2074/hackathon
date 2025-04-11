import React, { useState } from 'react';

const dayMessages = {
  0: "Pre-planting: Apply Trichoderma viride or Pseudomonas fluorescens to the nursery bed to prevent damping-off and root rot.",
  1: "2 weeks after transplanting: Spray Mancozeb (0.25%) + Imidacloprid (0.3 ml/L) for fungal blight and thrips control.",
  2: "4 weeks after transplanting: Apply Chlorothalonil (2.5 g/L) + Spinosad (0.3 ml/L) for downy mildew and leaf miner control.",
  3: "6 weeks after transplanting: Use Carbendazim (1 g/L) or Hexaconazole for fungal leaf spots + Dimethoate for sucking pests.",
  4: "Bulb formation stage: Spray Azoxystrobin (0.1%) for downy mildew. Control thrips with Fipronil or Lambda-cyhalothrin.",
  5: "Maturity stage: Avoid systemic insecticides. Use only contact fungicides if disease pressure is high. Maintain PHI.",
  6: "Post-harvest: Cure bulbs properly. If needed, apply Bavistin dip before storage to avoid fungal decay."
};

const dayOptions = [
  'Pre-planting',
  '2 weeks after transplanting',
  '4 weeks after transplanting',
  '6 weeks after transplanting',
  'Bulb formation stage',
  'Maturity stage',
  'Post-harvest'
];

const OnionSpraySchedule = () => {
  const [selectedDay, setSelectedDay] = useState('');

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  return (
    <div
      className="min-h-screen flex justify-center bg-fixed bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('https://i.ytimg.com/vi/zRzDTrovOY0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDZRjCmfvcgXyvh64m2w163QBwKfw')"
      }}
    >
      <div className="bg-white/60 shadow-xl mt-24 mb-20 rounded-4xl p-4 max-w-2xl w-full backdrop-blur-md">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">Onion Spray Schedule 🧅</h1>

        <div className="flex flex-col items-center gap-4">
          <label className="text-lg font-medium text-gray-700">Select Growth Phase:</label>
          <select
            className="px-4 py-3 rounded-xl border-2 border-purple-300 shadow focus:outline-none focus:border-purple-500 text-lg w-full max-w-md"
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
            <div className="mt-6 text-xl text-purple-800 font-medium rounded-xl p-6 shadow-inner w-full max-w-md text-center backdrop-blur-md">
              <p className="text-3xl text-gray-800 font-semibold mb-2">Recommended Spray:</p>
              {dayMessages[selectedDay] || "No recommendation for this phase."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnionSpraySchedule;
