import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  console.log("Current location:", location.pathname);

  const isActive = (path: string) => {
    const isActive = location.pathname === path;
    console.log(`Checking path ${path}:`, isActive);
    return isActive;
  };

  return (
    <nav className="sheikah-border-animated bg-zelda-dark/50 backdrop-blur-sm mx-4 sm:mx-8 my-4">
      <div className="flex items-center justify-between h-16 px-8">
        <Link
          to="/"
          className="text-xl sm:text-2xl font-serif text-zelda-gold whitespace-nowrap ml-4"
        >
          Sage Zaugg
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-zelda-gold hover:text-zelda-light focus:outline-none p-2"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`nav-link ${
              isActive("/") ? "!text-zelda-gold [&::after]:w-full" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`nav-link ${
              isActive("/about") ? "!text-zelda-gold [&::after]:w-full" : ""
            }`}
          >
            About
          </Link>
          <Link
            to="/projects"
            className={`nav-link ${
              isActive("/projects") ? "!text-zelda-gold [&::after]:w-full" : ""
            }`}
          >
            Projects
          </Link>
          <Link
            to="/blog"
            className={`nav-link ${
              isActive("/blog") ? "!text-zelda-gold [&::after]:w-full" : ""
            }`}
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className={`nav-link ${
              isActive("/contact") ? "!text-zelda-gold [&::after]:w-full" : ""
            }`}
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-48 opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block nav-link ${
              isActive("/") ? "!text-zelda-gold [&::after]:w-full" : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block nav-link ${
              isActive("/about") ? "!text-zelda-gold [&::after]:w-full" : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/projects"
            className={`block nav-link ${
              isActive("/projects") ? "!text-zelda-gold [&::after]:w-full" : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            Projects
          </Link>
          <Link
            to="/blog"
            className={`block nav-link ${
              isActive("/blog") ? "!text-zelda-gold [&::after]:w-full" : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className={`block nav-link ${
              isActive("/contact") ? "!text-zelda-gold [&::after]:w-full" : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
