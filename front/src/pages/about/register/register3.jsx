import React, { useState } from 'react';

const cucumberMessages = {
  0: "Fungicide: Copper Hydroxide – 2 lb/acre. Insecticide: Thiamethoxam – 1.5 oz/acre.",
  1: "Fungicide: Chlorothalonil – 1.5 pints/acre. Insecticide: Spinosad – 4 fl oz/acre.",
  2: "Fungicide: Mancozeb – 2 lb/acre. Insecticide: Lambda-cyhalothrin – 2.5 oz/acre.",
  3: "Fungicide: Copper Oxychloride – 3 lb/acre. Insecticide: Cypermethrin – 2.0 fl oz/acre.",
  4: "Fungicide: Azoxystrobin – 6 fl oz/acre. Insecticide: Imidacloprid – 1.6 fl oz/acre.",
  5: "Fungicide: Chlorothalonil – 2 pints/acre. Insecticide: Abamectin – 3.5 fl oz/acre.",
  6: "Fungicide: Mancozeb – 3 lb/acre. Insecticide: Bifenthrin – 1.28 fl oz/acre.",
  7: "Fungicide: Copper Hydroxide – 2 lb/acre. Insecticide: Neem Oil – 1% solution.",
  8: "Fungicide: Propiconazole – 4 fl oz/acre. Insecticide: Acephate – 0.5 lb/acre.",
  9: "Fungicide: Chlorothalonil – 1.5 pints/acre. Insecticide: Carbaryl – 1 lb/acre.",
  10: "Fungicide: Mancozeb + Copper. Insecticide: Lambda-cyhalothrin.",
  11: "Fungicide: Azoxystrobin. Insecticide: Imidacloprid.",
  12: "Fungicide: Copper Oxychloride. Insecticide: Neem extract.",
  13: "Fungicide: Chlorothalonil + Mancozeb. Insecticide: Pyrethrin.",
  14: "Fungicide: Copper Hydroxide. Insecticide: Bifenthrin.",
  15: "Fungicide: Azoxystrobin. Insecticide: Spinosad.",
  16: "Fungicide: Propiconazole. Insecticide: Abamectin."
};

const CucumberSchedule = () => {
  const [selectedDay, setSelectedDay] = useState('');

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const dayOptions = [
    '0 to 6', '7 to 13', '14 to 20', '21 to 27', '28 to 34', '35 to 41',
    '42 to 48', '49 to 55', '56 to 62', '63 to 69', '70 to 76', '77 to 83',
    '84 to 90', '91 to 97', '98 to 104', '105 to 111', '112 to 118'
  ];

  return (
    <div
      className="min-h-screen flex justify-center bg-fixed bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('https://gardenandhappy.com/wp-content/uploads/2019/05/cucumber_plants.jpg')"
      }}
    >
      <div className="bg-white/60 shadow-xl mt-24 mb-20 rounded-4xl p-4 max-w-2xl w-full backdrop-blur-md">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-8">Cucumber Spray Schedule 🥒</h1>

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
              <p className="text-4xl text-gray-800 font-semibold mb-2">Pesticides to be applied:</p>
              {cucumberMessages[selectedDay] || "No message available for this day."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CucumberSchedule;
