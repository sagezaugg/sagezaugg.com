import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="sheikah-border bg-zelda-dark/50 backdrop-blur-sm mx-8 my-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-serif text-zelda-gold">
            Portfolio
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/portfolio" className="nav-link">Portfolio</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 