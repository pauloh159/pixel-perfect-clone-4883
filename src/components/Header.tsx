import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LoginModal } from './LoginModal';
import { useAuth } from '../hooks/useAuth.tsx';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Serviços', path: '/services' },
    { name: 'Métodologia', path: '/methodology' },
    { name: 'Habilitadas', path: '/habilitadas' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <header className="w-full bg-header-background fixed top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-[78px]">
        {/* Logo */}
        <div className="flex-shrink-0 drop-shadow-[0_6px_12px_rgba(64,37,16,0.18)]">
          <Link to="/">
            <img
              src="/logo clinica.svg"
              alt="Clínica Nazaré Santos Logo"
              className="w-[140px] h-[90px] sm:w-[180px] sm:h-[116px] lg:w-[236px] lg:h-[153px] object-contain"
            />
          </Link>
        </div>

        {/* Navigation & CTA Wrapper */}
        <div className="flex items-center">
          {/* Desktop Navigation & CTA */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-[25px]">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`cursor-pointer transition-all duration-300 font-judson text-base font-bold text-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))] ${
                  location.pathname === item.path ? 'text-[hsl(var(--foreground))]' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated() ? (
              <div className="flex items-center gap-4">
                <span className="text-[hsl(var(--foreground))] font-bold">
                  Olá, {user?.name || user?.email}
                </span>
                <button 
                  onClick={logout} 
                  className="px-4 py-2 bg-red-600 rounded-[3px] hover:bg-red-700 transition-colors duration-300"
                >
                  <span className="text-white text-center text-sm xl:text-base font-bold">
                    Sair
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button onClick={() => setIsLoginModalOpen(true)} className="cursor-pointer transition-all duration-300 font-judson text-base font-bold text-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]">
                  Login
                </button>
                <Link 
                  to="/cadastro"
                  className="px-4 py-2 bg-[hsl(var(--foreground))] rounded-[3px] hover:bg-[hsl(var(--secondary))] transition-colors duration-300"
                >
                  <span className="text-white text-center text-sm xl:text-base font-bold">
                    Cadastro
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col gap-1 p-2"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-[hsl(var(--foreground))] transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`w-6 h-0.5 bg-[hsl(var(--foreground))] transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-[hsl(var(--foreground))] transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-[78px] left-0 w-full bg-header-background lg:hidden flex flex-col items-center gap-4 py-4 shadow-md">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`cursor-pointer transition-all duration-300 font-judson text-base font-bold text-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))] ${
                  location.pathname === item.path ? 'text-[hsl(var(--foreground))]' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated() ? (
              <div className="flex flex-col items-center gap-2">
                <span className="text-[hsl(var(--foreground))] font-bold">
                  Olá, {user?.name || user?.email}
                </span>
                <button 
                  onClick={() => { setIsMenuOpen(false); logout(); }} 
                  className="px-4 py-2 bg-red-600 rounded-[3px] hover:bg-red-700 transition-colors duration-300"
                >
                  <span className="text-white text-center text-sm xl:text-base font-bold">
                    Sair
                  </span>
                </button>
              </div>
            ) : (
              <button onClick={() => { setIsMenuOpen(false); setIsLoginModalOpen(true); }} className="px-4 py-2 bg-[hsl(var(--foreground))] rounded-[3px] hover:bg-[hsl(var(--secondary))] transition-colors duration-300">
                <span className="text-white text-center text-sm xl:text-base font-bold">
                  Área das Habilitadas
                </span>
              </button>
            )}
          </div>
        )}
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  );
};
