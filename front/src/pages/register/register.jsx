import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import React from "react";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    phonenumber:""
  });
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErr(null);
  };

  const handleClick = async (e) => {
    e.preventDefault(); // ✅ Always call this first

    const { username, email, password,phonenumber } = inputs;

    // 🧠 Frontend validation
    if (!username || !email || !password || !phonenumber) {
      setErr("All fields are required");
      return;
    }

    if (!/^\d{10}$/.test(phonenumber)) {
      setErr("Phone number must be exactly 10 digits");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5500/api/user/register", inputs);

      setSuccess(true);
      setInputs({ username: "", password: "", email: "",phonenumber: ""});
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Something went wrong. Try again.";
      setErr(errorMsg);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          {/* You can add an illustration or branding image here */}
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleClick}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={inputs.username}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
            <input
  type="text"
  placeholder="Phone Number"
  name="phonenumber"
  value={inputs.phonenumber}
  onChange={handleChange}
/>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
            {err && <p style={{ color: "red" }}>{err}</p>}
            <button type="submit">Register</button>
            {success && <p style={{ color: "green" }}>Successfully registered</p>}
            <span>Do you have an account?</span>
            <Link to="/login">
              <button type="button">Login</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
