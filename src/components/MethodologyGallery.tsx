import React from 'react';

export const MethodologyGallery: React.FC = () => {
  const galleryImages = [
    { src: "/Recepção da clínica.jpg", alt: "Recepção da clínica com balcão e sofás", className: "lg:col-span-2 lg:row-span-1" },
    { src: "/sala de tratamenteo com prateleiras.png", alt: "Sala de tratamento com maca e prateleiras de madeira", className: "lg:col-span-1 lg:row-span-1" },
    { src: "/cadeira de estética.png", alt: "Cadeira de estética reclinável em sala com prateleiras de produtos", className: "lg:col-start-4 lg:row-start-1 lg:row-span-2" },
    { src: "/sala de estar da clinica.png", alt: "Sala de espera com sofás e poltronas", className: "lg:col-span-1 lg:row-span-1" },
    { src: "/maca de massagem em sala de tratamento.png", alt: "Maca de massagem em uma sala ampla com decoração minimalista", className: "lg:col-span-2 lg:row-span-1" },
  ];

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-[hsl(var(--background))] flex flex-col justify-center items-center">
      <div className="container mx-auto px-4"> 
        <div className="text-center mb-8">
        </div>
        <div className="relative w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 w-full">
            {galleryImages.map((image, index) => (
              <div key={index} className={`relative overflow-hidden rounded-2xl h-64 sm:h-80 ${image.className}`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};