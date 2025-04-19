import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-7xl font-serif text-zelda-gold mb-4">
          Sage Zaugg
        </h1>
        <p className="text-xl md:text-2xl text-zelda-light-blue mb-8">
          Engineer. Creator. Explorer of systems.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <div className="sheikah-border">
            <Link
              to="/projects"
              className="px-8 py-3 text-lg text-zelda-light-blue hover:text-zelda-gold transition-colors duration-300 block"
            >
              View My Work
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
