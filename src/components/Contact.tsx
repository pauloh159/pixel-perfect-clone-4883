import React from 'react';

export const Contact: React.FC = () => {
  return (
    <section className="relative">
      <div className="w-[750px] h-[183px] text-black text-4xl font-normal capitalize absolute left-[104px] top-[4036px]">
        Venha conhecer nosso espaço e receber o tratamento que seu corpo merece.
      </div>
      
      <div className="w-[687px] h-[132px] text-black text-[26px] font-normal capitalize absolute left-[104px] top-[4219px]">
        Clique no mapa ao lado e veja a melhor rota para você.
      </div>
      
      <div className="w-[939px] h-[440px] absolute rounded-[20px] left-[881px] top-[3974px] cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/bf0b56af17ed45ec07c71dfd0b82f82d0f967745?width=1878"
          alt="Mapa da localização da clínica"
          className="w-full h-full object-cover rounded-[20px]"
        />
      </div>
    </section>
  );
};
