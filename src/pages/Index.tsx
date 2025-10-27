import React from 'react';
import { Hero } from '@/components/Hero';
import { Stats } from '@/components/Stats';
import { Features } from '@/components/Features';

import { Treatments } from '@/components/Treatments';
import { Testimonials } from '@/components/Testimonials';
import { Gallery } from '@/components/Gallery';
import { Contact } from '@/components/Contact';

const Index = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <Treatments />
      <Testimonials />
      <Gallery />
      <Contact />
    </>
  );
};

export default Index;
