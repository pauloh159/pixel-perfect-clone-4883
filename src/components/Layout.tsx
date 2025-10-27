import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen relative cursor-pointer transition-colors duration-300 ease bg-[hsl(var(--background))] overflow-x-hidden">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};