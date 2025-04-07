import Dashboard from "../../components/dashboard/dashboard";
import React from "react";

const tact=()=>{
    return(
    <div className="flex min-h-screen bg-gray-200 pl-64 p-8">
    {/* Main Container for Centering */}
    <div className="flex flex-col w-full items-center gap-8 ">
        
        {/* Dashboard (Full Width) */}
        <div className="w-full">
            <Dashboard />
        </div>
        </div>
        </div>
    )
}
export default tact;