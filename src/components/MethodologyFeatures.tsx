import React from 'react';

export const MethodologyFeatures: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-16 bg-[hsl(var(--background))]">
      <div className="container mx-auto max-w-6xl">
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
                Formação em Estética
              </span>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full min-h-[60px] md:min-h-[70px] lg:min-h-[75px] flex justify-center items-center rounded-lg px-4 py-3 transition-all duration-300 bg-[hsl(var(--muted))]">
              <span className="text-center font-jomolhari text-base md:text-lg lg:text-xl xl:text-2xl font-normal text-[hsl(var(--primary))]">
                Curso de Estética
              </span>
            </div>
          </div>
          {/* Novo wrapper para os dois blocos de baixo, centralizando-os */}
          <div className="col-span-full flex justify-center gap-4 md:gap-6">
            <div className="w-full sm:w-1/2 lg:w-1/3">
              <div className="w-full min-h-[60px] md:min-h-[70px] lg:min-h-[75px] flex justify-center items-center rounded-lg px-4 py-3 transition-all duration-300 bg-[hsl(var(--muted))]">
                <span className="text-center font-jomolhari text-base md:text-lg lg:text-xl xl:text-2xl font-normal text-[hsl(var(--primary))]">
                  Treinamento em Estética
                </span>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3">
              <div className="w-full min-h-[60px] md:min-h-[70px] lg:min-h-[75px] flex justify-center items-center rounded-lg px-4 py-3 transition-all duration-300 bg-[hsl(var(--muted))]">
                <span className="text-center font-jomolhari text-base md:text-lg lg:text-xl xl:text-2xl font-normal text-[hsl(var(--primary))]">
                  Capacitação em Beleza
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Method Description */}
        <div className="mt-8 md:mt-12 lg:mt-16">
          <p className="font-jomolhari text-base sm:text-lg md:text-xl text-[hsl(var(--foreground))] text-center leading-relaxed mb-4">
            O <strong>Método Nazaré Santos</strong> transforma a estética com técnicas inovadoras que proporcionam lifting imediato, redução de linhas de expressão e combate ao envelhecimento. <strong>Treinamentos presenciais em Fortaleza</strong> e online atendem profissionais do Brasil e exterior.
          </p>
          <p className="font-jomolhari text-base sm:text-lg md:text-xl text-[hsl(var(--foreground))] text-center leading-relaxed mb-4">
            Com formação internacional na Tailândia e Bruxelas, Nazaré capacitou centenas de profissionais até 2025. <strong>O curso "Mãos que Drenam com Resultado"</strong> aconteceu em janeiro/2025,com 28 horas de formação.
          </p>
          <p className="font-jomolhari text-base sm:text-lg md:text-xl text-[hsl(var(--foreground))] text-center leading-relaxed">
            Depoimentos destacam o método como "divisor de águas" para esteticistas. Alunos valorizam o toque humanizado e resultados visíveis que transformam carreiras e elevam a autoestima dos clientes.
          </p>
        </div>
      </div>
    </section>
  );
};