import React, { useState } from 'react';

const dayMessages = {
  0: "Fungicide: Mancozeb + Liquid Copper – 3 lb per acre. Insecticide: Admire (Alias) – see label for rate, or Verimark – 6.75 to 13.5 fl oz per acre.",
  1: "Fungicide: Mancozeb + Tanos – 8 oz per acre + Liquid Copper – 3 lb per acre. Insecticide: Dimethoate 4EC – 1 pint per acre.",
  2: "Fungicide: Mancozeb + Chlorothalonil – 2 to 3 pints per acre + Liquid Copper – 3 lb per acre. Insecticide: Lannate LV – 1.5 pints per acre.",
  3: "Fungicide: Mancozeb + Tanos – 8 oz per acre + Liquid Copper – 3 lb per acre. Insecticide: Dimethoate 4EC – 1 pint per acre.",
  4: "Fungicide: Mancozeb + Chlorothalonil – 2 to 3 pints per acre + Liquid Copper – 3 lb per acre. Insecticide: Lannate LV – 1.5 pints per acre.",
  5: "Fungicide: Fontelis – 24 fl oz per acre + Liquid Copper. Insecticide: Dimethoate 4EC – 1 pint per acre + Platinum – 5 fl oz per acre (or 3.67 oz Platinum 75 SG).",
  6: "Fungicide: Mancozeb + Chlorothalonil – 2 to 3 pints per acre + Liquid Copper – 3 lb per acre. Insecticide: Lannate LV – 1.5 pints per acre.",
  7: "Fungicide: Fontelis – 24 fl oz per acre + Liquid Copper. Insecticide: Dimethoate 4EC – 1 pint per acre + Leap SC – 2 quarts per acre (do not mix with Bravo).",
  8: "Fungicide: Mancozeb + Chlorothalonil – 2 to 3 pints per acre + Liquid Copper – 3 lb per acre. Insecticide: Lannate LV – 1.5 pints per acre + Agi-Mek SC – 3.5 fl oz per acre.",
  9: "Fungicide: Fontelis – 24 fl oz per acre + Liquid Copper. Insecticide: Leap SC – 2 quarts per acre.",
  10: "Fungicide: Chlorothalonil – 2 to 3 pints per acre + Liquid Copper. Insecticide: Lannate LV – 1.5 pints per acre.",
  11: "Fungicide: Cabrio – 12 oz per acre + Liquid Copper. Insecticide: Tundra – 2.1 to 5.2 fl oz per acre or Capture LFR – 2.8 to 6.8 fl oz per acre.",
  12: "Fungicide: Chlorothalonil – 2 to 3 pints per acre + Liquid Copper. Insecticide: Baythroid XL – 2.8 fl oz per acre + XenTari – 0.5 to 2 lb per acre.",
  13: "Fungicide: Inspire Super – 20 fl oz per acre or Cabrio – 12 oz per acre + Liquid Copper. Insecticide: Tundra – 2.1 to 5.2 fl oz per acre or Capture LFR – 2.8 to 6.8 fl oz per acre.",
  14: "Fungicide: Chlorothalonil – 2 to 3 pints per acre + Liquid Copper. Insecticide: Baythroid XL – 2.8 fl oz per acre + XenTari – 0.5 to 2 lb per acre.",
  15: "Fungicide: Chlorothalonil – 2 to 3 pints per acre + Liquid Copper. Insecticide: Lannate LV – 1.5 pints per acre.",
  16: "Fungicide: Chlorothalonil – 2 to 3 pints per acre + Liquid Copper. Insecticide: Baythroid XL – 2.8 fl oz per acre."
};

const Register = () => {
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
    className="min-h-screen mt-2 flex justify-center bg-cover bg-center px-4"
    style={{
      backgroundImage: "url('https://i.ytimg.com/vi/qXdw-hBiu1A/maxresdefault.jpg')"
    }}
  >
    <div className="bg-white/60 shadow-xl mt-24 mb-20 rounded-2xl p-4 max-w-2xl w-full backdrop-blur-md">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-8">Tomato Spray Schedule 🌱</h1>
  
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
  
        {selectedDay !== '' && (<>
          <div className="mt-6 text-4xl text-green-800 font-medium rounded-xl p-6 shadow-inner w-full max-w-md text-center backdrop-blur-md">
            <p className="text-4xl text-gray-800 font-semibold mb-2">Pestisides to be add on this day:</p>
            {dayMessages[selectedDay] || "No message available for this day."}
          </div>
          <p className="text-4xl m-2 p-2">🧪 Please add these Pesticides on your crop!!!!</p>
          </>
        )}
      </div>
    </div>
  </div>
  

  );
};

export default Register;
