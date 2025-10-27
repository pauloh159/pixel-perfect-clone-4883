import React from 'react';

export const MethodologyStats: React.FC = () => {
  const stats = [
    '+120 Habilitadas',
    '+800 Clientes',
    '+10 Paises com o Método'
  ];

  return (
    <section className="relative z-20 px-4 md:px-8 lg:px-16 -mt-24">
      <div className="container mx-auto max-w-6xl">
        {/* Glass morphism background */}
        <div className="w-full rounded-t-[20px] bg-[rgba(237,237,237,0.50)] shadow-[8px_4px_30px_0_rgba(0,0,0,0.25)] backdrop-blur-[3.5px] p-6 md:p-8 lg:p-12">
          {/* Stats content */}
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-around gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-[hsl(var(--primary))] font-jomolhari text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-center"
              >
                {stat}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};