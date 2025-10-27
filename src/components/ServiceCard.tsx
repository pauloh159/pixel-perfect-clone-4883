import React from 'react';

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ image, title, description }) => {
  return (
    <div className="relative w-auto h-[550px] rounded-lg overflow-hidden shadow-lg group">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div 
        className="absolute bottom-0 left-0 right-0 h-1/3 bg-[#D9D9D940] rounded-b-lg flex items-center justify-center transition-all duration-500 ease-in-out group-hover:h-full group-hover:rounded-lg"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <div className="text-center text-[#402510] transition-opacity duration-300 ease-in-out group-hover:opacity-0">
          <h3 className="font-poppins text-2xl font-semibold leading-tight">
            {title}
          </h3>
        </div>
        <div className="absolute top-0 left-0 right-0 p-8 text-center text-[#402510] opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
          <h3 className="font-poppins text-3xl font-bold mb-4">{title}</h3>
          <p className="font-poppins text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
};