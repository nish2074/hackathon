import React ,{useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import About from "./pages/about/about";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Predict from "./pages/predict/predict.jsx";
import Tact from "./pages/tact/tact";
import Protected from "./components/protected/protected.jsx";
import Search from "./pages/search/search.jsx";
import Profile from "./components/profile/profile";
const App = () => {
  const [sensorData, setSensorData] = useState([]);

  const handleHourSelect = async (timestamp) => {
    console.log(`Fetching data for: ${timestamp}`);

    try {
      const response = await fetch(`http://localhost:5500/sensor-data?timestamp=${timestamp}`);
      const data = await response.json();
      setSensorData(data);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
    }
  };
  return (
    <Router>
      <div className="app">
       
        <div className="content">
          <Routes>
            <Route path="/" element={<Protected><Home /></Protected>} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/predict" element={<Predict onHourSelect={handleHourSelect} />} />
            <Route path="/tact" element={<Tact />} />
            <Route path="/searchData" element={<Search/>} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;