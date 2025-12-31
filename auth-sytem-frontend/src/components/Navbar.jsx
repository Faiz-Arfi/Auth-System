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
        <nav className="flex justify-around items-center p-4 bg-white shadow-md">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-2">
                <img src={Logo} alt="Brand Logo" className="w-8 h-8" />
                <span className="font-bold text-xl">Auth-S</span>
            </Link>

            {/* Navigation Links */}
            <ul className="flex gap-6 items-center">
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
            <ul className="flex gap-4 items-center">
                {isLoggedIn ?
                <>
                    <li className="bg-red-600 hover:bg-red-400 px-4 py-2 rounded-md"><button
                        onClick={handleLogout} 
                        className="text-amber-50"
                        >
                            Logout
                        </button>
                    </li>
                </>
                :
                <li className="bg-gray-800 hover:bg-gray-600 px-4 py-2 rounded-md"><Link to="/login" className="text-amber-50">Let's Go</Link></li>
                }
            </ul>
        </nav>
    );
};

export default Navbar;
