import React from 'react';
import { Button } from '@/components/ui/button';
import { useHero } from '@/hooks/useHero';

export const Hero: React.FC = () => {
  const { title, subtitle, buttonText, imageUrl, loading, error } = useHero();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="relative w-full h-[600px]">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/Group 22.jpg')" }}
      />

      <div className="relative z-10">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center pt-[79px] pb-12">
          
          <div className="flex-1 flex justify-start text-center lg:text-left">
            <div className="space-y-6">
              <h1 
                className="text-3xl sm:text-4xl md:text-h1-custom font-jomolhari text-primary mb-2"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <p className="text-lg text-[#402510] leading-relaxed">
                {subtitle}
              </p>
              <Button 
                className="bg-[#A67B5B] hover:bg-[#8C6A4E] text-white font-bold py-3 px-6 rounded-md"
                onClick={() => window.open('https://wa.me/558598260078?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20hor%C3%A1rio.', '_blank')}
              >
                {buttonText}
              </Button>
            </div>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end items-center mt-8 lg:mt-0">
            <img
              src={imageUrl}
              alt="Clínica Nazaré Santos - Hero Image"
              className="max-h-[400px] lg:max-h-[600px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
