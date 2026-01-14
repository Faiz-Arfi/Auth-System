import { useEffect, useState } from "react";
import Logo from "../assets/brand-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

const Navbar = ( {isLoggedIn} ) => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <nav className="flex justify-around items-center p-2 sm:p-3 md:p-4 bg-white shadow-md">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-1 sm:gap-2">
                <img src={Logo} alt="Brand Logo" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                <span className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">Auth-S</span>
            </Link>

            {/* Navigation Links */}
            <ul className="flex gap-2 sm:gap-4 md:gap-6 items-center text-xs sm:text-sm md:text-base">
                <li>
                    <NavLink to="/" className={({ isActive }) =>
                        isActive ? "text-green-600 font-semibold" : "hover:text-green-600"}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={({ isActive }) =>
                        isActive ? "text-green-600 font-semibold" : "hover:text-green-600"}>
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className={({ isActive }) =>
                        isActive ? "text-green-600 font-semibold" : "hover:text-green-600"}>
                        Contact
                    </NavLink>
                </li>
                
            </ul>
            {/* login and signup */}
            <ul className="flex gap-2 sm:gap-3 md:gap-4 items-center">
                {isLoggedIn ?
                <>
                    <li className="bg-red-600 hover:bg-red-400 rounded-md"><button
                        onClick={handleLogout} 
                        className="text-amber-50 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 w-full h-full text-xs sm:text-sm md:text-base"
                        >
                            Logout
                        </button>
                    </li>
                </>
                :
                <li className="bg-gray-800 hover:bg-gray-600 rounded-md"><Link to="/login" className="text-amber-50 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 block text-xs sm:text-sm md:text-base">Let's Go</Link></li>
                }
            </ul>
        </nav>
    );
};

export default Navbar;
