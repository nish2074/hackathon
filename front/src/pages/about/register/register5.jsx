import React, { useState } from 'react';

const stageMessages = {
  0: "Dormant Stage: Apply horticultural oil to control overwintering pests like mites and scale insects.",
  1: "Green Tip Stage: Spray with a fungicide like copper or sulfur to prevent apple scab.",
  2: "Pink Bud Stage: Apply insecticide for pests like aphids and continue fungicide applications.",
  3: "Full Bloom: Avoid insecticides to protect pollinators; continue fungicide if necessary.",
  4: "Petal Fall: Apply insecticide for codling moth and fungicide for scab.",
  5: "Fruit Set: Continue insecticide and fungicide applications every 10-14 days as needed.",
  6: "Mid-Summer: Monitor for pests and diseases; apply treatments as necessary.",
  7: "Pre-Harvest: Cease pesticide applications according to the pre-harvest interval guidelines.",
};

const AppleSpraySchedule = () => {
  const [selectedStage, setSelectedStage] = useState('');

  const handleStageChange = (e) => {
    setSelectedStage(e.target.value);
  };

  const stageOptions = [
    'Dormant',
    'Green Tip',
    'Pink Bud',
    'Full Bloom',
    'Petal Fall',
    'Fruit Set',
    'Mid-Summer',
    'Pre-Harvest',
  ];

  return (
    <div
      className="min-h-screen flex justify-center bg-fixed bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('https://www.tourmyindia.com/blog//wp-content/uploads/2018/12/Apple-Orchards-in-India.jpg')",
      }}
    >
      <div className="bg-white/60 shadow-xl mt-24 mb-20 rounded-4xl p-4 max-w-2xl w-full backdrop-blur-md">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-8">Apple Tree Spray Schedule 🍎</h1>

        <div className="flex flex-col items-center gap-4">
          <label className="text-lg font-medium text-gray-700">Select a Growth Stage:</label>
          <select
            className="px-4 py-3 rounded-xl border-2 border-green-300 shadow focus:outline-none focus:border-green-500 text-lg w-full max-w-md"
            value={selectedStage}
            onChange={handleStageChange}
          >
            <option value="">-- Choose Stage --</option>
            {stageOptions.map((stage, index) => (
              <option key={index} value={index}>
                {stage}
              </option>
            ))}
          </select>

          {selectedStage !== '' && (
            <div className="mt-6 text-2xl text-green-800 font-medium rounded-xl p-6 shadow-inner w-full max-w-md text-center backdrop-blur-md">
              <p className="text-4xl text-gray-800 font-semibold mb-2">Recommended Application:</p>
              {stageMessages[selectedStage] || "No recommendation available for this stage."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppleSpraySchedule;
