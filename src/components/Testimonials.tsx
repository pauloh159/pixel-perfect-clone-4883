import React, { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" 
      fill="url(#paint0_linear)"
    />
    <defs>
      <linearGradient id="paint0_linear" x1="20" y1="1.94187" x2="0" y2="18.0581" gradientUnits="userSpaceOnUse">
        <stop offset="0.243378" stopColor="#EFEFA6"/>
        <stop offset="0.464292" stopColor="#F7C41D"/>
        <stop offset="0.803059" stopColor="#FBB967"/>
      </linearGradient>
    </defs>
  </svg>
);

export const Testimonials: React.FC = () => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const testimonials = [
    {
      name: 'Mariana Silva',
      text: 'Excelente atendimento e resultados incríveis! A equipe é super atenciosa e profissional. Recomendo muito!'
    },
    {
      name: 'Carlos Pereira', 
      text: 'Ambiente acolhedor e tratamentos de alta qualidade. Saí muito satisfeito com o serviço prestado.'
    },
    {
      name: 'Ana Costa',
      text: 'A clínica oferece uma variedade de tratamentos modernos. Fiquei impressionada com a eficácia e o cuidado da equipe.'
    },
    {
      name: 'Fernanda Oliveira',
      text: 'Ótima experiência! Os profissionais são bem qualificados e o atendimento é personalizado. Voltarei com certeza.'
    },
    {
      name: 'João Mendes',
      text: 'Serviço impecável e resultados visíveis. A clínica é bem equipada e a equipe é muito competente.'
    }
  ];

  const loopedT = [...testimonials, ...testimonials];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 2000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="w-full py-20 px-4 md:px-8 lg:px-16 bg-background">
      <div className="container mx-auto text-center">
        <h2 className="text-h2-custom font-jomolhari text-primary mb-12">
          O que Nossas Clientes Dizem
        </h2>
        
        <div className="relative">
          <Carousel setApi={setApi} opts={{ loop: true, align: 'start', containScroll: 'trimSnaps' }} className="w-full">
            <CarouselContent className="-ml-8">
              {loopedT.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-8 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div
                    className="h-80 bg-white rounded-2xl p-6 flex flex-col justify-between shadow-lg text-left"
                  >
                    <p className="text-lg font-jomolhari text-foreground leading-snug">
                      {testimonial.text}
                    </p>
                    <div className="mt-4">
                      <div className="flex justify-start mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarIcon key={i} />
                        ))}
                      </div>
                      <p className="text-md font-jomolhari text-foreground font-semibold">
                        {testimonial.name}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Custom SVG Scroll Indicator */}
          <div className="flex justify-center mt-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="122"
              height="10"
              viewBox="0 0 122 10"
              className="h-[10px]"
            >
              <g>
                {(() => {
                  const ACTIVE_WIDTH = 42;
                  const INACTIVE_WIDTH = 10;
                  const SPACING = 10;
                  const HEIGHT = 10;
                  const RADIUS = 5;

                  let x_offset = 0;
                  const indicatorPositions = testimonials.map((_, index) => {
                    const x = x_offset;
                    const width = index === (current % testimonials.length) ? ACTIVE_WIDTH : INACTIVE_WIDTH;
                    x_offset += width + SPACING;
                    return { x, width };
                  });

                  return indicatorPositions.map((pos, index) => (
                    <rect
                      key={index}
                      x={pos.x}
                      y="0"
                      width={pos.width}
                      height={HEIGHT}
                      rx={RADIUS}
                      fill="#a66642"
                      onClick={() => api?.scrollTo(index)}
                      className="cursor-pointer transition-all duration-500 ease-in-out"
                    />
                  ));
                })()}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
