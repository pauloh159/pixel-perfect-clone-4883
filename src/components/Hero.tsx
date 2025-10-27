import React from 'react';
import { Button } from '@/components/ui/button';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/Group 22.jpg')" }}
      />

      {/* Main Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 lg:px-8 flex items-center pt-[78px] pb-16">
          
          {/* Left side - Text content */}
          <div className="flex-1 flex justify-start">
            <div className="space-y-6">
              <h1 className="text-h1-custom font-jomolhari text-primary mb-4">
                Venha Cuidar-Se Com O Protocolo <br />Único De Nazaré Santos
              </h1>
              <p className="text-lg text-[#402510] leading-relaxed">
                Descubra o procedimento ideal para você com os segredos que só encontra aqui com a
                especialista que está revolucionando o mercado da estética.
              </p>
              <Button className="bg-[#A67B5B] hover:bg-[#8C6A4E] text-white font-bold py-3 px-6 rounded-md">
                Realize o seu agendamento
              </Button>
            </div>
          </div>

          {/* Right side - Specialist image */}
          <div className="flex-1 flex justify-end items-center">
            <img
              src="/foto do banner principal 1.png"
              alt="Clínica Nazaré Santos - Hero Image"
              className="max-h-[600px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
