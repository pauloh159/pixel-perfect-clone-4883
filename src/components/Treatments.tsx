import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import { useServices } from '@/hooks/useServices';

export const Treatments: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const { services, loading, error } = useServices();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    const scrollSnapList = api.scrollSnapList();
    if (scrollSnapList.length > 0) {
      api.on('select', () => {
        setCurrent(api.selectedScrollSnap());
      });
    }
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 2000);

    return () => clearInterval(interval);
  }, [api]);

  const carouselItems = services.slice(0, 4);
  const loopedCarouselItems = [...carouselItems, ...carouselItems];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[hsl(var(--background))] overflow-hidden">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-x-[48px] items-center mx-auto max-w-full px-4 sm:px-6 lg:px-0">
        {/* Text Content */}
        <div className="text-center lg:text-left flex flex-col justify-center px-4 sm:px-6 lg:px-[120px] mb-8 lg:mb-0">
          <h2 className="font-jomolhari text-3xl sm:text-4xl lg:text-h2-custom font-normal leading-tight text-[hsl(var(--primary))] mb-4">
            Descubra os tratamentos personalizados que fazem da Metodologia Nazaré Santos <br />referência mundial em estética.
          </h2>
          <p className="font-jomolhari text-base md:text-lg text-[hsl(var(--primary))]/80 mb-6">
            Nosso espaço exclusivo une conforto e tecnologia avançada para sua transformação completa.
          </p>
          <button className="px-6 py-3 bg-[#a66642] text-white font-jomolhari rounded-md hover:bg-opacity-90 transition-colors self-center lg:self-start">
            Marque sua Consulta
          </button>
        </div>

        {/* Carousel */}
        <div
          className={`relative w-full h-[450px] sm:h-[550px] transition-all duration-1000 ease-out ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        >
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <>
              <div className="relative overflow-hidden">
                <Carousel setApi={setApi} opts={{ loop: true, align: 'start', containScroll: 'trimSnaps' }} className="w-full">
                  <CarouselContent className="-ml-[15px]">
                    {loopedCarouselItems.map((item, index) => (
                      <CarouselItem key={index} className="pl-[15px] basis-full sm:basis-1/2 lg:basis-[420px]">
                        <div className="relative w-full h-[450px] sm:h-[550px] rounded-lg overflow-hidden shadow-lg">
                          <img
                            src={item.acf?.url_imagem_servico || '/placeholder-service.svg'}
                            alt={item.acf?.titulo_servico || item.title.rendered}
                            className="w-full h-full object-cover"
                            loading={index === 0 ? "eager" : "lazy"}
                          />
                          <div
                            className="absolute bottom-0 left-0 right-0 bg-[#D9D9D940] rounded-b-lg flex items-center justify-center px-4"
                            style={{ height: '33.33%', backdropFilter: 'blur(10px)' }}
                          >
                            <h3 className="font-poppins text-2xl font-semibold text-[#402510] leading-tight text-center">
                              {item.acf?.titulo_servico || item.title.rendered}
                            </h3>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>

              {/* Custom SVG Scroll Indicator */}
              <div className="flex justify-center mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="102"
                  height="10"
                  viewBox="0 0 102 10"
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
                      const indicatorPositions = carouselItems.map((_, index) => {
                        const x = x_offset;
                        const width = index === current % carouselItems.length ? ACTIVE_WIDTH : INACTIVE_WIDTH;
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
            </>
          )}
        </div>
      </div>
    </section>
  );
};
