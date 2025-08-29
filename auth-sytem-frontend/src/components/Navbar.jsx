import React from "react";
import Logo from "../assets/brand-logo.svg";

const Navbar = () => {
    return (
        <nav className="flex justify-around items-center p-4 bg-white shadow-md">
            {/* Brand */}
            <div className="flex items-center gap-2">
                <img src={Logo} alt="Brand Logo" className="w-8 h-8" />
                <span className="font-bold text-xl">Auth-S</span>
            </div>

            {/* Navigation Links */}
            <ul className="flex gap-6 items-center">
                <li><a href="/" className="hover:text-blue-600">Home</a></li>
                <li><a href="/about" className="hover:text-blue-600">About</a></li>
                <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
                
            </ul>
            {/* login and signup */}
            <ul className="flex gap-4 items-center">
                <li className="bg-gray-800 hover:bg-gray-600 px-4 py-2 rounded-md"><a href="/login" className="text-amber-50">Login/Register</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
