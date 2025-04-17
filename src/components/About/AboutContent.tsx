import React from 'react';

interface AboutContentProps {
  description: string;
}

export const AboutContent: React.FC<AboutContentProps> = ({ description }) => (
  <p className="text-lg text-zelda-light-blue mb-8 text-center">
    {description}
  </p>
); 