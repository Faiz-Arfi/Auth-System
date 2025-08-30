import Logo from "../assets/brand-logo.svg";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
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
                <li className="bg-gray-800 hover:bg-gray-600 px-4 py-2 rounded-md"><Link to="/login" className="text-amber-50">Login/Register</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
