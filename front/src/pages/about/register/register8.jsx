import React, { useState } from 'react';

const dayMessages = {
  0: "Pre-Flowering Stage: Spray Copper Oxychloride (0.3%) + Sticker to manage bacterial spots. Apply Imidacloprid for hopper management.",
  1: "Flower Bud Initiation: Spray Carbendazim (0.1%) or Hexaconazole for powdery mildew. Monitor for thrips and hoppers.",
  2: "Flowering Stage: Use Lambda-cyhalothrin or Thiamethoxam for insect control. Add Sulphur-based fungicide for powdery mildew.",
  3: "Fruit Set Stage: Spray Carbendazim or Mancozeb alternately every 10–15 days. Manage hoppers, thrips with Imidacloprid or Spinosad.",
  4: "Fruit Development Stage: Control fruit flies with Methyl Eugenol traps. Use Emamectin benzoate for caterpillars. Spray fungicide if anthracnose appears.",
  5: "Maturation Stage: Avoid systemic insecticides. Use contact fungicides like Copper Oxychloride. Maintain PHI before harvest.",
  6: "Post-Harvest: Apply Bordeaux paste on trunk and pruning cuts. Spray Copper fungicide to prevent gummosis or fungal growth.",
};

const dayOptions = [
  'Pre-Flowering',
  'Flower Bud Initiation',
  'Flowering',
  'Fruit Set',
  'Fruit Development',
  'Maturation',
  'Post-Harvest'
];

const MangoSpraySchedule = () => {
  const [selectedDay, setSelectedDay] = useState('');

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  return (
    <div
      className="min-h-screen flex justify-center bg-fixed bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('https://baskinnature.in/wp-content/uploads/2024/08/close-up-mango-fruit-mango-tree-scaled-1.webp')"
      }}
    >
      <div className="bg-white/60 shadow-xl mt-24 mb-20 rounded-4xl p-4 max-w-2xl w-full backdrop-blur-md">
        <h1 className="text-3xl font-bold text-yellow-700 text-center mb-8">Mango Spray Schedule 🥭</h1>

        <div className="flex flex-col items-center gap-4">
          <label className="text-lg font-medium text-gray-700">Select Growth Phase:</label>
          <select
            className="px-4 py-3 rounded-xl border-2 border-yellow-300 shadow focus:outline-none focus:border-yellow-500 text-lg w-full max-w-md"
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

export default MangoSpraySchedule;
