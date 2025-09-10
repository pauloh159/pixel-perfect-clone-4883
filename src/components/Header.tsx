import React, { useState } from 'react';

export const Header: React.FC = () => {
  const [activeNav, setActiveNav] = useState('Home');

  const navItems = ['Home', 'Serviços', 'Métodologia', 'Blog'];

  return (
    <header className="w-full h-[153px] relative top-[-34px]">
      <div className="w-full h-[78px] absolute bg-[#EFCFA6] left-0 top-9" />
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/4cfbcde8fdd3b34dc6b7dd1396350d1cf04b1e12?width=472"
        alt="Clínica Nazaré Santos Logo"
        className="w-[236px] h-[153px] absolute left-[87px] top-0"
      />
      <nav className="inline-flex items-center gap-[25px] absolute w-[321px] h-[19px] left-[1191px] top-8">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveNav(item)}
            className={`flex justify-center items-center relative cursor-pointer transition-[color] duration-[0.3s] ease-[ease] text-[#A66642] text-base font-bold hover:text-[#402510] ${
              activeNav === item ? 'text-[#402510]' : ''
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
      <button className="w-[191px] h-[31px] absolute left-[1631px] top-[26px] bg-[#402510] rounded-[3px] hover:bg-[#A66642] transition-colors duration-300">
        <span className="text-white text-center text-base font-bold">
          Área das Habilitadas
        </span>
      </button>
    </header>
  );
};
