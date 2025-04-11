import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [isAuth, setIsAuth] = useState(false);

  const login = async (inputs) => {
    try {
      const res = await axios.post("http://localhost:5500/api/user/login", inputs, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
      Cookies.set("user", JSON.stringify(res.data), { expires: 1 / 4 });
      localStorage.setItem("user", JSON.stringify(res.data));
      setIsAuth(true);
      return true;
    } catch (err) {
      console.log("Login failed:", err);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuth(false);
    Cookies.remove("user");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, isAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
