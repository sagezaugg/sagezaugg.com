import React from 'react';
import { AboutContent } from '../components/About/AboutContent';
import { Timeline } from '../components/Timeline/Timeline';
import { ABOUT_DESCRIPTION, ABOUT_TIMELINE_ITEMS } from '../utils/aboutConstants';

const About: React.FC = () => {
  return (
    <div className="py-12">
      <h2 className="text-4xl font-serif text-zelda-gold text-center mb-12">
        About Me
      </h2>
      
      <div className="max-w-3xl mx-auto">
        <AboutContent description={ABOUT_DESCRIPTION} />
        <Timeline items={ABOUT_TIMELINE_ITEMS} />
      </div>
    </div>
  );
};

export default About; 