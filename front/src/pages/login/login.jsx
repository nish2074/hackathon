'use client';import { useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import "./login.scss";
import { useState } from "react";
import React from "react"
const Login = () => {

  const [error,setError]=useState("");
  const [input,setInput]=useState({username:"",password:""})
  const { login } = useContext(AuthContext);
  
  const handleChange=(e)=>{

    setInput({ ...input, [e.target.name]: e.target.value });
  };
const [success,setSuccess]=useState(true);const navigate=useNavigate();
const handleLogin = async (e) => {
  e.preventDefault();
  try {
      const success = await login(input);
      if (success) {
          navigate("/");
      } else {
          setSuccess(false);
          setError("Invalid username or password");
      }
  } catch (err) {
      setError("Something went wrong");
      console.log(err);
  }
};
    
 // Delay for better UX




  return (
    <div className="login">
      <div className="card">
        <div className="left">
         
        </div>
        <div className="right">
          <h1 className="">Login</h1>
          <form>
            <input type="text" name="username"  placeholder="Username"onChange={handleChange} />
            <input type="password" name="password" placeholder="Password"onChange={handleChange} />
            <button onClick={handleLogin}>Login</button>
            </form>
            {!success&&<p className="">Please fill correct info</p>}
           
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button className="cursor-pointer">Register</button>
          </Link>
        </div>
      </div> 
    </div>


  );
  
};

export default Login;