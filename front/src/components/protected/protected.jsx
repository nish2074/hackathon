import React, { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../pages/context/authcontext";
const Protected = ({ children }) => {
    const navigate = useNavigate();
    
    // for token
const { isAuth } = useContext(AuthContext);
    useEffect(() => {
        if (!isAuth) navigate("/login");
    }, [isAuth, navigate]);

    return isAuth ? children : null;
};

export default Protected;