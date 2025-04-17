import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../utils/socialConstants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="py-12">
      <h2 className="text-4xl font-serif text-zelda-gold text-center mb-12">
        Send a Signal
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <form onSubmit={handleSubmit} className="sheikah-border p-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-zelda-light-blue mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-zelda-dark/50 border border-zelda-light-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-zelda-gold text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-zelda-light-blue mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-zelda-dark/50 border border-zelda-light-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-zelda-gold text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-zelda-light-blue mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-2 bg-zelda-dark/50 border border-zelda-light-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-zelda-gold text-white"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-zelda-teal text-white rounded-lg hover:bg-zelda-light-blue transition-colors duration-300"
          >
            Send Message
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-zelda-light-blue mb-4">
            Or reach out through these channels:
          </p>
          <div className="flex justify-center space-x-4">
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
      </motion.div>
    </div>
  );
};

export default Contact; 