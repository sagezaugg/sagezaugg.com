import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sheikah-border-animated bg-zelda-dark/50 backdrop-blur-sm mx-4 sm:mx-8 my-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl sm:text-2xl font-serif text-zelda-gold whitespace-nowrap px-4">
            Sage Zaugg
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden px-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zelda-gold hover:text-zelda-light focus:outline-none p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4 px-4">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/portfolio" className="nav-link">Portfolio</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link to="/" className="block nav-link">Home</Link>
            <Link to="/about" className="block nav-link">About</Link>
            <Link to="/portfolio" className="block nav-link">Portfolio</Link>
            <Link to="/blog" className="block nav-link">Blog</Link>
            <Link to="/contact" className="block nav-link">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 