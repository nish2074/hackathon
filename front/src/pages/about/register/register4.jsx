import React, { useState } from 'react';

const dayMessages = {
  0: "Apply Carbendazim 50 WP (15-20 gm in 10 liters of water) or Copper Oxychloride (1 gm per liter) as a soil drench to prevent damping-off disease.",
  1: "Spray Neem oil at 3% concentration to control aphids. Repeat every 10 days as needed.",
  2: "Apply Bacillus thuringiensis @ 2 g/liter at the primordial stage to manage diamondback moth larvae.",
  3: "Spray 10% nettle leaf extract on the 45th day after planting to deter aphids.",
  4: "Apply Metalaxyl 8% + Mancozeb 64% WP @ 2 gm per liter to control downy mildew. Repeat every 10 days as needed.",
  5: "Spray 10% garlic-chilli extract on the 60th day after planting to manage pests.",
  6: "Apply Copper Oxychloride 50 WP (400 gm in 200 liters of water per acre) to control black leg disease.",
  7: "Spray 10% nettle leaf extract on the 75th day after planting to deter aphids.",
  8: "Apply Bacillus thuringiensis @ 2 g/liter at the primordial stage to manage diamondback moth larvae.",
  9: "Spray Neem oil at 3% concentration to control aphids. Repeat every 10 days as needed.",
  10: "Apply Metalaxyl 8% + Mancozeb 64% WP @ 2 gm per liter to control downy mildew. Repeat every 10 days as needed.",
  11: "Spray 10% garlic-chilli extract on the 105th day after planting to manage pests.",
  12: "Apply Copper Oxychloride 50 WP (400 gm in 200 liters of water per acre) to control black leg disease.",
  13: "Spray 10% nettle leaf extract on the 120th day after planting to deter aphids.",
  14: "Apply Bacillus thuringiensis @ 2 g/liter at the primordial stage to manage diamondback moth larvae.",
  15: "Spray Neem oil at 3% concentration to control aphids. Repeat every 10 days as needed.",
  16: "Apply Metalaxyl 8% + Mancozeb 64% WP @ 2 gm per liter to control downy mildew. Repeat every 10 days as needed."
};

const dayOptions = [
  '0 to 6', '7 to 13', '14 to 20', '21 to 27', '28 to 34', '35 to 41',
  '42 to 48', '49 to 55', '56 to 62', '63 to 69', '70 to 76', '77 to 83',
  '84 to 90', '91 to 97', '98 to 104', '105 to 111', '112 to 118'
];

const CabbageSpraySchedule = () => {
  const [selectedDay, setSelectedDay] = useState('');

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  return (
    <div
      className="min-h-screen flex justify-center bg-fixed bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('https://example.com/cabbage-field.jpg')"
      }}
    >
      <div className="bg-white/60 shadow-xl mt-24 mb-20 rounded-4xl p-4 max-w-2xl w-full backdrop-blur-md">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-8">Cabbage Spray Schedule 🥬</h1>

        <div className="flex flex-col items-center gap-4">
          <label className="text-lg font-medium text-gray-700">Select a Day Range:</label>
          <select
            className="px-4 py-3 rounded-xl border-2 border-green-300 shadow focus:outline-none focus:border-green-500 text-lg w-full max-w-md"
            value={selectedDay}
            onChange={handleDayChange}
          >
            <option value="">-- Choose Day --</option>
            {dayOptions.map((range, index) => (
              <option key={index} value={index}>
                Day = {range}
              </option>
            ))}
          </select>

          {selectedDay !== '' && (
            <div className="mt-6 text-2xl text-green-800 font-medium rounded-xl p-6 shadow-inner w-full max-w-md text-center backdrop-blur-md">
              <p className="text-4xl text-gray-800 font-semibold mb-2">Pesticides to be applied on this day:</p>
              {dayMessages[selectedDay] || "No message available for this day."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CabbageSpraySchedule;
