import React, { useState } from "react";
import Dashboard from "../../components/dashboard/dashboard";
const Predict = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("plant_image", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
        <div className="flex min-h-screen bg-gray-400 pl-64 p-8">
      <div className="flex flex-col w-full gap-8">
        <Dashboard />
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-green-300 via-teal-400 to-blue-500 rounded-xl shadow-xl"style={{
      backgroundImage: "url('https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?cs=srgb&dl=pexels-sohi-807598.jpg&fm=jpg')"
    }}>
      <h2 className="text-4xl font-bold text-center text-white mb-8">
        Upload Plant Image for Disease Prediction
      </h2>
      
      <div className="flex flex-col items-center space-y-6">
        <input
          type="file"
          className="border-2 border-gray-300 rounded-xl p-4 w-80 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          onChange={handleFileChange}
        />
        
        <button
          className="bg-green-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
          onClick={handleUpload}
        >
          Predict
        </button>
      </div>

      {result && (
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 space-y-6">
          <div className="flex justify-center">
            <img
              src={`http://127.0.0.1:5000/${result.image_url}`}
              alt="Uploaded plant"
              className="w-72 h-auto rounded-xl shadow-md transform transition duration-500 hover:scale-105"
            />
          </div>
          
          <h3 className="text-3xl font-semibold text-gray-800">Disease: {result.disease}</h3>
          <p className="text-lg text-gray-600">
            <strong>Confidence:</strong> {result.confidence}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Description:</strong> {result.description}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Treatment:</strong> {result.treatment}
          </p>
        </div>
      )}
    </div></div></div>
  );
};

export default Predict;
