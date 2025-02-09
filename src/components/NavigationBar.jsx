import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between h-16 pl-16 z-50 bg-white shadow font-madefor">
      {/* Logo */}
      <div className="text text-xl font-medium font-madefor">
        <Link to="/">MyWellness</Link>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-8 text-black text-sm uppercase tracking-wider">
        <li className="hover:text-gray-300 transition-all duration-300 cursor-pointer">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-gray-300 transition-all duration-300 cursor-pointer">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="hover:text-gray-300 transition-all duration-300 cursor-pointer">
          <Link to="/chatbot">Chatbot</Link>
        </li>
      </ul>

      {/* Right-side Buttons */}
      <div className="hidden md:flex justify-center items-center h-full">
        <Link
          to="/login"
          className="border border-white px-10 h-full flex items-center text-sm hover:bg-gray-300 transition-all duration-300"
        >
          Login
        </Link>
        <Link to={'/signup'} className="text-white w-full flex items-center bg-black px-4 py-1 text-sm hover:bg-gray-300 hover:text-black transition-all duration-300 h-full">
          Create a new Account
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden text-white text-2xl cursor-pointer">☰</div>
    </nav>
  );
};

export default NavigationBar;
