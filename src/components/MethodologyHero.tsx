import React from 'react';

export const MethodologyHero: React.FC = () => {
  return (
    <>
      <section 
        className="relative bg-cover bg-center pt-24 pb-20 md:pt-40 md:pb-40" 
        style={{ backgroundImage: "url('/imagem banner metodo.png')" }}
      >
        <div 
          className="absolute inset-0" 
          style={{ backgroundImage: "linear-gradient(to right, rgba(211, 190, 167, 1) 0%, rgba(211, 190, 167, 1) 40%, rgba(211, 190, 167, 0) 60%)" }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center md:flex-row md:text-left">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-3xl sm:text-4xl md:text-h1-custom font-jomolhari leading-tight mb-4 text-[#402510]">
               Conheça a metodologia que implantada por Nazaré Santos que está conquistando os mundo.
              </h1>
              <p className="text-base sm:text-lg font-light mb-8 text-[#402510]">
                Descubra a técnica estética única que já transformou milhares de vidas em todo o mundo, desenvolvida pela especialista que revolucionou o mercado da beleza.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};