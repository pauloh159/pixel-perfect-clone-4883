import React from 'react';

export const About: React.FC = () => {
  return (
    <section className="relative">
      <div className="w-[1615px] h-[306px] border absolute bg-[rgba(239,207,166,0.10)] rounded-[15px] border-solid border-[#A66642] left-[151px] top-[1356px]" />
      <div className="flex w-[1552px] h-[242px] flex-col justify-center text-black text-center text-[32px] font-normal absolute left-[182px] top-[1387px]">
        <div className="font-bold text-[45px] text-[#402510] max-sm:text-2xl">
          O Método Nazaré Santos
        </div>
        <div className="font-normal text-[32px] text-black">
          revoluciona o universo da estética com técnicas exclusivas e
          resultados comprovados. Desenvolvido pela especialista Nazaré Santos,
          este protocolo inovador tem formado profissionais em todo o mundo,
          tornando a Nazaré Santos Estética referência em tratamentos
          personalizados que transformam não apenas a aparência, mas a
          autoestima de quem busca o melhor em cuidados estéticos.
        </div>
      </div>
      
      <div className="w-[782px] h-[183px] text-black text-[41px] font-bold absolute left-[155px] top-[1782px]">
        Descubra os tratamentos personalizados que fazem da Metodologia Nazaré
        Santos referência mundial em estética.
      </div>
      
      <div className="w-[687px] h-[132px] text-black text-2xl font-normal absolute left-[155px] top-[1965px]">
        Nosso espaço exclusivo une conforto e tecnologia avançada para sua
        transformação completa.
      </div>
      
      <button className="flex w-[271px] h-[50px] justify-center items-center gap-2.5 absolute bg-[#A66642] px-[21px] py-1.5 rounded-[5px] left-[155px] top-[2097px] hover:bg-[#402510] transition-colors duration-300">
        <span className="text-[#EFCFA6] text-center text-2xl font-normal relative">
          Marque sua Consulta
        </span>
      </button>
    </section>
  );
};
