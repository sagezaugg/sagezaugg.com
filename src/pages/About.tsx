import React from 'react';
import { motion } from 'framer-motion';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const timelineItems: TimelineItem[] = [
  {
    year: "2023",
    title: "Current Position",
    description: "Brief description of your current role and achievements."
  },
  {
    year: "2022",
    title: "Previous Experience",
    description: "Description of your previous work experience."
  },
  {
    year: "2021",
    title: "Education",
    description: "Your educational background and achievements."
  },
];

const About: React.FC = () => {
  return (
    <div className="py-12">
      <h2 className="text-4xl font-serif text-zelda-gold text-center mb-12">
        About Me
      </h2>
      
      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-zelda-light-blue mb-8 text-center">
          A passionate developer with a love for creating elegant solutions to complex problems.
          My journey in technology has been marked by continuous learning and exploration.
        </p>

        <div className="space-y-8">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="sheikah-border p-6"
            >
              <div className="flex items-start">
                <div className="w-24 flex-shrink-0">
                  <span className="text-zelda-gold font-serif text-xl">{item.year}</span>
                </div>
                <div>
                  <h3 className="text-xl font-serif text-zelda-gold mb-2">{item.title}</h3>
                  <p className="text-zelda-light-blue">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About; 