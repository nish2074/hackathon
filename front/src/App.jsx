import React ,{useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Routep from "../src/pages/plantdieseaseroute/route.jsx"
import About from "./pages/about/about";
import Schedule from "./pages/about/Crop scearch/schedule.jsx"
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Predict from "./pages/predict/predict.jsx";
import Tact from "./pages/tact/tact";
import Protected from "./components/protected/protected.jsx";
import Search from "./pages/search/search.jsx";
import Profile from "./components/profile/profile";

import RegisterB from "./pages/about/register/register2.jsx";
import RegisterA from "./pages/about/register/register.jsx";
import RegisterC from "./pages/about/register/register3.jsx";
import RegisterD from "./pages/about/register/register4.jsx";
import RegisterE from "./pages/about/register/register5.jsx";
import RegisterF from "./pages/about/register/register6.jsx";
import RegisterG from "./pages/about/register/register7.jsx";
import RegisterH from "./pages/about/register/register8.jsx";
import RegisterI from "./pages/about/register/register9.jsx";
import RegisterJ from "./pages/about/register/register10.jsx";

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
          <Route path="/register/register.jsx" element={<RegisterA />} />
          <Route path="/register/register2.jsx" element={<RegisterB />} />
          <Route path="/register/register3.jsx" element={<RegisterC />} />
          <Route path="/register/register4.jsx" element={<RegisterD />} />
          <Route path="/register/register5.jsx" element={<RegisterE />} />
          <Route path="/register/register6.jsx" element={<RegisterF />} />
          <Route path="/register/register7.jsx" element={<RegisterG />} />
          <Route path="/register/register8.jsx" element={<RegisterH />} />
          <Route path="/register/register9.jsx" element={<RegisterI />} />
          <Route path="/register/register10.jsx" element={<RegisterJ />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Schedule />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/predict" element={<Predict onHourSelect={handleHourSelect} />} />
            <Route path="/tact" element={<Tact />} />
            <Route path="/searchData" element={<Search/>} />
            <Route path="/profile" element={<Routep />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;