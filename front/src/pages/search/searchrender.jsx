import { useState,useEffect }  from "react";import React from "react";

import Search from "./search";
import axios from "axios"

const SearchRender=()=>{const [data24,setData24]=useState([]);
const fetchData24 = async () => {
    console.log("Fetching data from backend..."); // Log the fetch action

            try {
              const response = await axios.get("http://localhost:5500/api/get-24hr-data");
              const formattedData = response.data.map(entry => ({
                ...entry,
                timestamp: new Date(entry.timestamp).toLocaleTimeString(),
              }));
              setData24(formattedData);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
        
          useEffect(() => {
            fetchData24();
            const interval = setInterval(fetchData24, 5000); // Refresh every 5 seconds
            return () => clearInterval(interval);
          }, []);
        
       return(<><Search data24={data24}/></>)
}
export default SearchRender;
