import React from 'react';

export const MethodologyGallery: React.FC = () => {
  const galleryImages = [
    { src: "/Recepção da clínica.jpg", alt: "Recepção da clínica com balcão e sofás", className: "col-span-2 row-span-1" },
    { src: "/sala de tratamenteo com prateleiras.png", alt: "Sala de tratamento com maca e prateleiras de madeira", className: "col-span-1 row-span-1" },
    { src: "/cadeira de estética.png", alt: "Cadeira de estética reclinável em sala com prateleiras de produtos", className: "col-start-4 row-start-1 row-span-2" },
    { src: "/sala de estar da clinica.png", alt: "Sala de espera com sofás e poltronas", className: "col-span-1 row-span-1" },
    { src: "/maca de massagem em sala de tratamento.png", alt: "Maca de massagem em uma sala ampla com decoração minimalista", className: "col-span-2 row-span-1" },
  ];

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-[hsl(var(--background))] flex flex-col justify-center items-center">
      <div className="container mx-auto px-4"> 
        <div className="text-center mb-8">
        </div>
        <div className="relative w-full h-[743px]">
          <div className="grid grid-cols-4 grid-rows-2 gap-[15px] w-full h-full">
            {galleryImages.map((image, index) => (
              <div key={index} className={`relative overflow-hidden rounded-2xl ${image.className}`}>
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