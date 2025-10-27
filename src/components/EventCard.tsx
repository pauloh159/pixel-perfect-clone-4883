import React from 'react';

interface EventCardProps {
  title: string;
  image: string;
  description: string;
  date: string;
  location: string;
}

export const EventCard: React.FC<EventCardProps> = ({ title, image, description, date, location }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 sm:h-56 object-cover" />
      <div className="p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm sm:text-base mb-4">{description}</p>
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <span>{date}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
};