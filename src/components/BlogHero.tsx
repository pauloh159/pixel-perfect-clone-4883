import React from 'react';

interface BlogHeroProps {
  onSearch: (query: string) => void;
}

export const BlogHero: React.FC<BlogHeroProps> = ({ onSearch }) => {
  return (
    <>
      <section 
        className="relative bg-cover bg-center pt-40 pb-40" 
        style={{ backgroundImage: "url('/imagem-isolada-banner.png')" }}
      >
        <div 
          className="absolute inset-0" 
          style={{ backgroundImage: "linear-gradient(to right, rgba(211, 190, 167, 1) 0%, rgba(211, 190, 167, 1) 40%, rgba(211, 190, 167, 0) 60%)" }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-left text-white mb-16 md:mb-4">
              <h1 className="text-h1-custom font-jomolhari leading-tight mb-4 text-[#402510]">
               Conheça os segredinhos da Nazaré Santos Clínica de Estética
              </h1>
              <p className="text-lg font-light mb-8 text-[#402510]">
                Tendências de Bem-estar e cuidados pessoais
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 px-4 -mt-12">
        <div className="container mx-auto max-w-4xl">
          <div className="w-full rounded-[20px] bg-[rgba(237,237,237,0.50)] shadow-[8px_4px_30px_0_rgba(0,0,0,0.25)] backdrop-blur-[3.5px] p-6">
            <div className="relative">
              <input 
                type="text"
                placeholder="O que você está buscando?"
                onChange={(e) => onSearch(e.target.value)}
                className="w-full bg-white rounded-full py-4 px-6 pl-12 text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#BF7E46]"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};