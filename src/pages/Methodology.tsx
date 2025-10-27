import React from 'react';
import { MethodologyHero } from '@/components/MethodologyHero';
import { MethodologyStats } from '@/components/MethodologyStats';
import { MethodologyFeatures } from '@/components/MethodologyFeatures';
import { MethodologyGallery } from '@/components/MethodologyGallery';
import { MethodologyBanner } from '@/components/MethodologyBanner';
import { MethodologyTrainings } from '@/components/MethodologyTrainings';

const Methodology: React.FC = () => {
  return (
    <>
      <MethodologyHero />
      <MethodologyStats />
      <MethodologyFeatures />
      <MethodologyGallery />
      <MethodologyBanner />
      <MethodologyTrainings />
    </>
  );
};

export default Methodology;
