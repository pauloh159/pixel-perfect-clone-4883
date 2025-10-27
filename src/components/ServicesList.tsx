import React from 'react';
import { servicesData } from '../data/services';

function ServicesList() {
  return (
    <div className="py-20 md:py-32 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12 text-center">
          Nossos Serviços
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 line-clamp-3">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServicesList;