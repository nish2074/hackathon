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
  });
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErr(null);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5500/api/user/register", inputs);
      setSuccess(true);
      setInputs({ username: "", password: "", email: "" });
      setTimeout(() => setSuccess(false), 3000); // Clear success message after 3 seconds
    } catch (error) {
      setErr(error.response ? error.response.data : "An error occurred");
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          
         
          
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleClick}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
            {err && <p style={{ color: "red" }}>{typeof err === "string" ? err : err.error || JSON.stringify(err)}</p>}
            <button type="submit">Register</button>
            {success && <p>Successfully registered</p>}
            <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
