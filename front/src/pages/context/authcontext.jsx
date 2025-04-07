import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie for cookie management
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
import React from "react";
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
const [isAuth, setIsAuth] = useState(false);

  const login = async (inputs) => {try{
    const res = await axios.post("http://localhost:5500/api/user/login", inputs, {
      withCredentials: true,


      
    
    });
    console.log("🟢 Full Response:", res);
    console.log("🟢 Response Data:", res.data);
    setCurrentUser(res.data);
    Cookies.set("user", JSON.stringify(res.data), { expires: 1/4 }); // Set cookie to expire in 6 hours
    localStorage.setItem("user", JSON.stringify(res.data)); // Update localStorage only on successful login
    setIsAuth(true); // Set isAuth to true only after successful login

    console.log(res.data); // Update this line
  
    return true;}catch(err){console.log("loginfailed",err);}
  };



  useEffect(() => {
    if (currentUser) {
      console.log("Updated user:", currentUser.username);
    }
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const logout = () => {
    setCurrentUser(null);
    setIsAuth(false);
    Cookies.remove("user"); // Remove user cookie on logout
    localStorage.removeItem("user"); // Clear localStorage on logout
  };

  return ( 

    <AuthContext.Provider value={{ currentUser, login ,isAuth,logout}}>
      {children}
    </AuthContext.Provider>
  );
};
