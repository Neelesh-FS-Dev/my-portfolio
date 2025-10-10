// src/components/Navbar.js
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
// import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  //   const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/projects", label: "Projects" },
    { path: "/experience", label: "Experience" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 transition-colors duration-300 bg-white shadow-lg dark:bg-gray-900">
      <div className="container-custom">
        <div className="flex items-center justify-between py-4 mx-4 md:mx-0">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-gray-800 dark:text-white"
          >
            Neelesh Yadav
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden space-x-8 md:flex ">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors duration-300 ${
                  location.pathname === item.path
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* <button
              onClick={() => {}}
              className="p-2 text-gray-600 transition-colors duration-300 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              { ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button> */}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 bg-gray-100 rounded-lg md:hidden dark:bg-gray-800 dark:text-gray-300"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="py-4 border-t border-gray-200 md:hidden dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium py-1 transition-colors duration-300 mx-4  ${
                    location.pathname === item.path
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
