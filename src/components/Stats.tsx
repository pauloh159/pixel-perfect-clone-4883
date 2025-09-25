import React from 'react';

export const Stats: React.FC = () => {
  const stats = [
    { label: '+6 Anos de Serviços', value: '6+' },
    { label: '+800 Clientes', value: '800+' },
    { label: '+ 860 Casos de Sucesso', value: '860+' }
  ];

  return (
    <section className="relative">
      <div className="w-[1581px] h-[145px] shadow-[8px_4px_30px_0_rgba(0,0,0,0.25)] backdrop-blur-[3.5px] absolute bg-[rgba(237,237,237,0.50)] rounded-[20px_20px_0_0] left-[170px] top-[698px]" />
      <div className="inline-flex items-center gap-[134px] absolute w-[1060px] h-12 left-[430px] top-[744px]">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-[#402510] text-3xl font-normal relative hover:text-[#A66642] transition-colors duration-300"
          >
            {stat.label}
          </div>
        ))}
      </div>
    </section>
  );
};
