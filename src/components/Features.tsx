import React from 'react';

export const Features: React.FC = () => {
  const features = [
    { title: 'Método Exclusivo', bgColor: 'bg-[#402510]', textColor: 'text-[#EFCFA6]' },
    { title: 'Equipe Especializada', bgColor: 'bg-[#EFCFA6]', textColor: 'text-[#402510]' },
    { title: 'Resultados Comprovados', bgColor: 'bg-[#EFCFA6]', textColor: 'text-[#402510]' },
    { title: 'Ambiente Acolhedor', bgColor: 'bg-[#EFCFA6]', textColor: 'text-[#402510]' },
    { title: 'Suporte Eficaz', bgColor: 'bg-[#EFCFA6]', textColor: 'text-[#402510]' }
  ];

  return (
    <section className="relative">
      <div className="flex w-[674px] h-[151px] flex-col justify-center text-center text-[46px] font-normal absolute left-[623px] top-[909px]">
        <div className="text-[#402510]">Por Que Escolher a</div>
        <div className="text-[#A66642]">Clinica Nazaré Santos?</div>
      </div>
      
      <div className="flex w-[522px] h-[75px] justify-center items-center gap-2.5 absolute px-28 py-2 rounded-[10px] left-[154px] top-[1118px] bg-[#402510] hover:bg-[#A66642] transition-colors duration-300 cursor-pointer">
        <div className="text-[#EFCFA6] text-center text-4xl font-normal relative">
          Método Exclusivo
        </div>
      </div>
      
      <div className="flex w-[522px] h-[75px] justify-center items-center gap-2.5 absolute px-[88px] py-2 rounded-[10px] left-[699px] top-[1118px] bg-[#EFCFA6] hover:bg-[#A66642] hover:text-white transition-all duration-300 cursor-pointer">
        <div className="text-[#402510] text-center text-4xl font-normal relative">
          Equipe Especializada
        </div>
      </div>
      
      <div className="flex w-[522px] h-[75px] justify-center items-center gap-2.5 absolute px-[55px] py-2 rounded-[10px] left-[1244px] top-[1118px] bg-[#EFCFA6] hover:bg-[#A66642] hover:text-white transition-all duration-300 cursor-pointer">
        <div className="text-[#402510] text-center text-4xl font-normal relative">
          Resultados Comprovados
        </div>
      </div>
      
      <div className="flex w-[522px] h-[75px] justify-center items-center gap-2.5 absolute px-[85px] py-2 rounded-[10px] left-[415px] top-[1224px] bg-[#EFCFA6] hover:bg-[#A66642] hover:text-white transition-all duration-300 cursor-pointer">
        <div className="text-[#402510] text-center text-4xl font-normal relative">
          Ambiente Acolhedor
        </div>
      </div>
      
      <div className="flex w-[522px] h-[75px] justify-center items-center gap-2.5 absolute px-[141px] py-2 rounded-[10px] left-[960px] top-[1224px] bg-[#EFCFA6] hover:bg-[#A66642] hover:text-white transition-all duration-300 cursor-pointer">
        <div className="text-[#402510] text-center text-4xl font-normal relative">
          Suporte Eficaz
        </div>
      </div>
    </section>
  );
};
