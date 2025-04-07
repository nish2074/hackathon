import React, { useState, useContext } from "react";
import { FaBars, FaSearch, FaHome, FaBell, FaUserCircle, FaCogs, FaChartLine } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AuthContext} from "../../pages/context/authcontext";


const Navbar = () => {
    const [show, setShow] = useState(true);
    const { currentUser } = useContext(AuthContext); // ✅ Correctly calling useContext
    const handleClick = () => {
        setShow((prev) => !prev);
    };

    const { logout } = useContext(AuthContext); // Add this line

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full px-4 py-2 transition-all duration-300 ${show ? "w-22" : "w-0 overflow-hidden"}`}>
                {show && (
                    <div className="w-54 bg-gray-800 fixed h-full px-4 py-2 p-0 m-0">
                        <div className="my-4">
                            <h1 className="text-white font-bold text-2xl">AGRO-MINDS</h1>
                        </div>
                        <hr />
                        <ul className="mt-4 text-white font-bold space-y-2">
                            <li className="hover:bg-blue-500 py-2 rounded">
                                <NavLink to="/" className="flex items-center px-4 text-lg">
                                    <FaHome className="h-5 w-5 mr-2" />
                                    Home
                                </NavLink>
                            </li>
                            <li className="hover:bg-blue-500 py-2 rounded">
                                <NavLink to="/searchData" className="flex items-center px-4 text-lg">
                                    <FaCogs className="h-5 w-5 mr-2" />
                                    predict
                                </NavLink>
                            </li>
                            <li className="hover:bg-blue-500 py-2 rounded">
                                <NavLink to="/about" className="flex items-center px-4 text-lg">
                                    <FaCogs className="h-5 w-5 mr-2" />
                                    About
                                </NavLink>
                            </li>
                            <li className="hover:bg-blue-500 py-2 rounded">
                                <NavLink to="/predict" className="flex items-center px-4 text-lg">
                                    <FaChartLine className="h-5 w-5 mr-2" />
                                  Search
                                </NavLink>
                            </li>
                            <li className="hover:bg-blue-500 py-2 rounded">
                                <NavLink to="/tact" className="flex items-center px-4 text-lg">
                                    <FaCogs className="h-5 w-5 mr-2" />
                                    Tact
                                </NavLink>
                            </li>
                            <li className="hover:bg-blue-500 py-2 rounded">
                                <NavLink to="/profile" className="flex items-center px-4 text-lg">
                                    <FaCogs className="h-5 w-5 mr-2" />
                                   Profile
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Top Navbar */}
            <nav className={`bg-gray-800 px-4 py-3 flex justify-between items-center ${show ? "w-800" : "w-900 -ml-60"}`}>
                {/* Left section */}
                <div className="flex items-center">
                    <FaBars onClick={handleClick} className="text-white cursor-pointer text-2xl mr-4" />
                    <span className="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text text-3xl">AGRO-MINDS</span>
                </div>

                {/* Right section */}
                <div className="flex items-center gap-4">
                    {/* Search bar */}
                    <div className="relative">
                        <input
                            type="text"
                            className="bg-gray-700 text-white px-4 py-2 pl-10 rounded-md outline-none"
                            placeholder="Search..."
                        />
                        <FaSearch className="absolute top-3 left-3 text-white" />
                    </div>

                    {/* Notification */}
                    <FaBell className="text-white text-2xl cursor-pointer" />

                    {/* User Icon */}
                    <FaUserCircle className="text-white text-3xl cursor-pointer" /> 
                 
                    {currentUser && ( 
                        <button onClick={logout} className="text-white cursor-pointer bg-red-600 p-2 m-2 rounded-2xl">logout</button>

                    )}
                   

                    <p className="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text text-3xl">{currentUser.username?currentUser.username:"Guest"}</p>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
