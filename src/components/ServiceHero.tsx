import React from 'react';

interface ServiceHeroProps {
  onSearch: (query: string) => void;
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({ onSearch }) => {
  return (
    <>
      <section 
        className="relative bg-cover bg-center pt-24 pb-20 md:pt-32 md:pb-40" 
        style={{ backgroundImage: "url('/imagem-isolada-banner.png')" }}
      >
        <div 
          className="absolute inset-0" 
          style={{ backgroundImage: "linear-gradient(to right, rgba(211, 190, 167, 1) 0%, rgba(211, 190, 167, 1) 40%, rgba(211, 190, 167, 0) 60%)" }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center md:flex-row md:text-left">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-3xl sm:text-4xl md:text-h1-custom font-jomolhari leading-tight mb-4 text-[#402510]">
                Conheça Os Nossos Diversos Serviços De <br/> Uma Estética De Resultados.
              </h1>
              <p className="text-base sm:text-lg font-light mb-8 text-[#402510]">
                Transformamos milhares de vidas proporcionando beleza, saúde e bem-estar que acreditamos em ser a nossa tríade só sucesso.
              </p>
              <a 
                href="https://wa.me/558598260078?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20hor%C3%A1rio."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#BF7E46] text-white font-semibold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Realize o seu agendamento
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 px-4 -mt-16 md:-mt-12">
        <div className="container mx-auto max-w-4xl">
          <div className="w-full rounded-[20px] bg-[rgba(237,237,237,0.50)] shadow-[8px_4px_30px_0_rgba(0,0,0,0.25)] backdrop-blur-[3.5px] p-4 sm:p-6">
            <div className="relative">
              <input 
                type="text"
                placeholder="Pesquise Seu Serviço"
                onChange={(e) => onSearch(e.target.value)}
                className="w-full bg-white rounded-full py-3 px-4 pl-10 sm:py-4 sm:px-6 sm:pl-12 text-base sm:text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#BF7E46]"
              />
              <svg className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};