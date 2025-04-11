import React, { useState } from 'react';

const dayMessages = {
  0: "Pre-Planting: Treat seed tubers with Mancozeb (0.3%) or Carbendazim + Thiram (2 g/kg) before planting to control seed-borne diseases.",
  1: "15-20 Days After Planting (DAP): Spray Mancozeb (0.25%) for early blight prevention. For insect control, use Imidacloprid (0.3 ml/L).",
  2: "30 DAP: Use Chlorothalonil (0.2%) or Mancozeb + Metalaxyl for late blight control. Spray Dimethoate or Thiamethoxam for aphids.",
  3: "45 DAP: Apply Azoxystrobin (0.1%) or Cymoxanil + Mancozeb (0.25%) for blight. Monitor for cutworms and apply Chlorpyrifos if needed.",
  4: "60 DAP: Spray Propineb or Fluopicolide + Propamocarb for effective late blight management. Use Spinosad for white grub/leaf miner.",
  5: "75 DAP: Reduce chemical use. Only apply contact fungicides like Copper Oxychloride if disease is visible. Avoid systemic pesticides.",
  6: "Pre-Harvest (~90 DAP): Avoid pesticide usage. Ensure withholding period (PHI) is followed. Start vine cutting or haulm killing for harvesting.",
};

const dayOptions = [
  'Pre-Planting',
  '15-20 Days After Planting',
  '30 Days After Planting',
  '45 Days After Planting',
  '60 Days After Planting',
  '75 Days After Planting',
  'Pre-Harvest (~90 DAP)',
];

const PotatoSpraySchedule = () => {
  const [selectedDay, setSelectedDay] = useState('');

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  return (
    <div
      className="min-h-screen flex justify-center bg-fixed bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('https://agrierp.com/wp-content/uploads/2024/05/potato-farm-shipping-packing-img.webp')"
      }}
    >
      <div className="bg-white/60 shadow-xl mt-24 mb-20 rounded-4xl p-4 max-w-2xl w-full backdrop-blur-md">
        <h1 className="text-3xl font-bold text-yellow-700 text-center mb-8">Potato Spray Schedule 🥔</h1>

        <div className="flex flex-col items-center gap-4">
          <label className="text-lg font-medium text-gray-700">Select Growth Phase:</label>
          <select
            className="px-4 py-3 rounded-xl border-2 border-yellow-400 shadow focus:outline-none focus:border-yellow-500 text-lg w-full max-w-md"
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
            <div className="mt-6 text-xl text-yellow-800 font-medium rounded-xl p-6 shadow-inner w-full max-w-md text-center backdrop-blur-md">
              <p className="text-3xl text-gray-800 font-semibold mb-2">Recommended Spray:</p>
              {dayMessages[selectedDay] || "No recommendation for this phase."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PotatoSpraySchedule;
