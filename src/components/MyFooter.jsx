import React from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom"; // Assuming you are using react-router for navigation

export default function MyFooter() {
  return (
    <footer className="w-full bg-black text-white py-12 bottom-0"> {/* Increased padding for larger height */}
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6">
        {/* Navigation Links */}
        <div className="flex space-x-12"> {/* Increased space between links */}
          <Link to="/" className="text-lg hover:text-gray-400"> {/* Increased text size */}
            Home
          </Link>
          <Link to="/dashboard" className="text-lg hover:text-gray-400">
            Dashboard
          </Link>
          <Link to="/chatbot" className="text-lg hover:text-gray-400">
            Chatbot
          </Link>
        </div>

        {/* GitHub Icon */}
        <div>
          <a
            href="https://github.com/yourusername" // Replace with your GitHub link
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FaGithub size={36} /> {/* Increased icon size */}
          </a>
        </div>
      </div>

      <div className="text-center text-gray-400 mt-6"> {/* Increased margin-top */}
        <p className="text-lg">&copy; 2025 Your Company. All rights reserved.</p> {/* Increased text size */}
      </div>
    </footer>
  );
}
