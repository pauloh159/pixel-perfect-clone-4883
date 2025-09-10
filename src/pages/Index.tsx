import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Stats } from '@/components/Stats';
import { Features } from '@/components/Features';
import { About } from '@/components/About';
import { Treatments } from '@/components/Treatments';
import { Testimonials } from '@/components/Testimonials';
import { Gallery } from '@/components/Gallery';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <main className="w-full min-h-screen relative cursor-pointer transition-[color] duration-[0.3s] ease-[ease] bg-[#F2E4D9]">
      <Header />
      <Hero />
      <Stats />
      <Features />
      <About />
      <Treatments />
      <Testimonials />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
