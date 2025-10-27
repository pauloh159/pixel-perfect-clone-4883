import React from 'react';

export const Features: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-16 bg-[hsl(var(--background))]">
      <div className="container mx-auto max-w-6xl">
        {/* Title */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="font-jomolhari text-h2-custom font-normal leading-tight">
            <span className="text-[hsl(var(--primary))]">Por Que Escolher a </span>
            <span className="text-[hsl(var(--secondary))]">Clinica Nazaré Santos?</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="w-full">
            <div className="w-full min-h-[60px] md:min-h-[70px] lg:min-h-[75px] flex justify-center items-center rounded-lg px-4 py-3 transition-all duration-300 bg-[hsl(var(--primary))]">
              <span className="text-center font-jomolhari text-base md:text-lg lg:text-xl xl:text-2xl font-normal text-white">
                Método Exclusivo
              </span>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full min-h-[60px] md:min-h-[70px] lg:min-h-[75px] flex justify-center items-center rounded-lg px-4 py-3 transition-all duration-300 bg-[hsl(var(--muted))]">
              <span className="text-center font-jomolhari text-base md:text-lg lg:text-xl xl:text-2xl font-normal text-[hsl(var(--primary))]">
                Equipe Especializada
              </span>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full min-h-[60px] md:min-h-[70px] lg:min-h-[75px] flex justify-center items-center rounded-lg px-4 py-3 transition-all duration-300 bg-[hsl(var(--muted))]">
              <span className="text-center font-jomolhari text-base md:text-lg lg:text-xl xl:text-2xl font-normal text-[hsl(var(--primary))]">
                Resultados Comprovados
              </span>
            </div>
          </div>
        </div>

        {/* Second row - Last two features centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6 max-w-4xl mx-auto">
          <div className="w-full">
            <div className="w-full min-h-[60px] md:min-h-[70px] lg:min-h-[75px] flex justify-center items-center rounded-lg px-4 py-3 transition-all duration-300 bg-[hsl(var(--muted))]">
              <span className="text-center font-jomolhari text-base md:text-lg lg:text-xl xl:text-2xl font-normal text-[hsl(var(--primary))]">
                Ambiente Acolhedor
              </span>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full min-h-[60px] md:min-h-[70px] lg:min-h-[75px] flex justify-center items-center rounded-lg px-4 py-3 transition-all duration-300 bg-[hsl(var(--muted))]">
              <span className="text-center font-jomolhari text-base md:text-lg lg:text-xl xl:text-2xl font-normal text-[hsl(var(--primary))]">
                Suporte Eficaz
              </span>
            </div>
          </div>
        </div>

        {/* Method Description */}
        <div className="mt-8 md:mt-12 lg:mt-16">
          <div className="rounded-lg border border-[hsl(var(--primary))]/50 bg-[hsl(var(--secondary))]/10 p-6 md:p-8">
            <h3 className="font-jomolhari text-xl md:text-2xl lg:text-3xl font-normal text-[hsl(var(--primary))] mb-4 text-center">
              O Método Nazaré Santos
            </h3>
            <p className="font-jomolhari text-sm md:text-base lg:text-lg text-[hsl(var(--foreground))] text-center leading-relaxed">
              revoluciona o universo da estética com técnicas exclusivas e resultados comprovados. Desenvolvido pela especialista Nazaré Santos, este protocolo inovador tem formado profissionais em todo o mundo, tornando a Nazaré Santos Estética referência em tratamentos personalizados que transformam não apenas a aparência, mas a autoestima de quem busca o melhor em cuidados estéticos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
