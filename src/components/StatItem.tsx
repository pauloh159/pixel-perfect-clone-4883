import React from 'react';

interface StatItemProps {
  text: string;
}

export const StatItem: React.FC<StatItemProps> = ({ text }) => {
  return (
    <div className="text-[hsl(var(--primary))] font-jomolhari text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-center">
      {text}
    </div>
  );
};