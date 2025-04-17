import React from 'react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../utils/socialConstants';

const Contact: React.FC = () => {
  return (
    <div className="py-12">
      <h2 className="text-4xl font-serif text-zelda-gold text-center mb-12">
        Get in Touch
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="sheikah-border p-8 space-y-8">
          <div>
            <p className="text-zelda-light-blue mb-2">Email me at:</p>
            <a 
              href="mailto:sagezaugg@gmail.com" 
              className="text-zelda-gold hover:text-zelda-light-blue transition-colors duration-300 text-xl"
            >
              sagezaugg@gmail.com
            </a>
          </div>

          <div>
            <p className="text-zelda-light-blue mb-4">
              Or connect with me on:
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zelda-gold hover:text-zelda-light-blue transition-colors duration-300"
              >
                LinkedIn
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zelda-gold hover:text-zelda-light-blue transition-colors duration-300"
              >
                GitHub
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zelda-gold hover:text-zelda-light-blue transition-colors duration-300"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact; 