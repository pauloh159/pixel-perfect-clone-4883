import React from 'react';
import { Link } from 'react-router-dom';

export const UserProfileHeader: React.FC = () => {
  return (
    <header className="w-full bg-header-background fixed top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-[78px]">
        {/* Logo */}
        <div className="flex-shrink-0 drop-shadow-[0_6px_12px_rgba(64,37,16,0.18)]">
          <Link to="/">
            <img
              src="/logo clinica.svg"
              alt="Clínica Nazaré Santos Logo"
              className="w-[180px] h-[116px] lg:w-[236px] lg:h-[153px] object-contain"
            />
          </Link>
        </div>

        {/* Botão Voltar ao Site */}
        <Link to="/">
          <button className="px-4 py-2 bg-[hsl(var(--foreground))] rounded-[3px] hover:bg-[hsl(var(--secondary))] transition-colors duration-300">
            <span className="text-white text-center text-sm xl:text-base font-bold">
              Voltar ao Site
            </span>
          </button>
        </Link>
      </div>
    </header>
  );
};