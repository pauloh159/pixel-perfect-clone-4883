import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import { useTestimonials } from '@/hooks/useTestimonials';
import { StarIcon } from './ui/StarIcon';

export const Testimonials: React.FC = () => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const { testimonials, loading, error } = useTestimonials();

  useEffect(() => {
    if (!api) {
      return;
    }

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

  const loopedT = [...testimonials, ...testimonials];

  return (
    <section className="w-full py-20 px-4 md:px-8 lg:px-16 bg-background">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-jomolhari text-primary mb-12 tracking-tighter">
          O que Nossas Clientes Dizem
        </h1>
        
        <div className="relative">
          {loading && <p>Carregando...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <Carousel setApi={setApi} opts={{ loop: true, align: 'start', containScroll: 'trimSnaps' }} className="w-full">
              <CarouselContent className="-ml-8">
                {loopedT.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-8 basis-full sm:basis-1/2 lg:basis-1/3">
                    <div className="h-auto min-h-80 bg-white rounded-2xl p-6 flex flex-col justify-between shadow-lg text-left">
                      <p className="text-base sm:text-lg font-jomolhari text-foreground leading-snug">
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
          )}

          {/* Custom SVG Scroll Indicator */}
          <div className="flex justify-center mt-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="10"
              viewBox="0 0 122 10"
              className="h-[10px] max-w-[122px]"
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
