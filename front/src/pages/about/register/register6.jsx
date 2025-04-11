import React, { useState } from 'react';

const dayMessages = {
  0: "Pre-Sowing: Treat seeds with a fungicide like Captan or Thiram to prevent seed-borne diseases.",
  1: "Emergence (Day 1-14): Apply herbicide (if needed) and monitor for damping-off. Spray with Metalaxyl if symptoms appear.",
  2: "Early Vegetative (Day 15-30): Spray Mancozeb or Chlorothalonil to prevent Alternaria leaf blight. Begin aphid monitoring.",
  3: "Vegetative Growth (Day 31-45): Continue protective fungicide sprays every 10 days. Use Imidacloprid for aphid control if needed.",
  4: "Mid Growth (Day 46-60): Spray Azoxystrobin or Carbendazim for fungal issues. Consider Neem oil or Lambda-cyhalothrin for insect pests.",
  5: "Late Growth (Day 61-75): Monitor for leaf blights and root maggots. Spray with Chlorpyrifos or Spinosad as needed.",
  6: "Pre-Harvest (Day 76+): Cease insecticide use per PHI (Pre-Harvest Interval). Final fungicide spray if heavy rainfall occurs.",
};

const dayOptions = [
  'Pre-Sowing',
  'Day 1–14',
  'Day 15–30',
  'Day 31–45',
  'Day 46–60',
  'Day 61–75',
  'Day 76+',
];

const CarrotSpraySchedule = () => {
  const [selectedDay, setSelectedDay] = useState('');

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  return (
    <div
      className="min-h-screen flex justify-center bg-fixed bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('https://i1.wp.com/blog.backtotheroots.com/wp-content/uploads/2021/02/image1-3.png?fit=1999%2C1274&ssl=1')"
      }}
    >
      <div className="bg-white/60 shadow-xl mt-24 mb-20 rounded-4xl p-4 max-w-2xl w-full backdrop-blur-md">
        <h1 className="text-3xl font-bold text-orange-700 text-center mb-8">Carrot Spray Schedule 🥕</h1>

        <div className="flex flex-col items-center gap-4">
          <label className="text-lg font-medium text-gray-700">Select a Growth Phase:</label>
          <select
            className="px-4 py-3 rounded-xl border-2 border-orange-300 shadow focus:outline-none focus:border-orange-500 text-lg w-full max-w-md"
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
            <div className="mt-6 text-xl text-orange-800 font-medium rounded-xl p-6 shadow-inner w-full max-w-md text-center backdrop-blur-md">
              <p className="text-3xl text-gray-800 font-semibold mb-2">Recommended Spray:</p>
              {dayMessages[selectedDay] || "No data available for this phase."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarrotSpraySchedule;
