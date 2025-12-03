import React from 'react';
import { useFeatures } from '@/hooks/useFeatures';

export const Features: React.FC = () => {
  const { title, features, method, loading, error } = useFeatures();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-16 bg-[hsl(var(--background))]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h1 className="font-jomolhari text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-tighter">
            <span className="text-[hsl(var(--primary))]">{title.part1}</span>
            <span className="text-[hsl(var(--secondary))]">{title.part2}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.slice(0, 3).map((feature, index) => (
            <div key={index} className="w-full">
              <div className={`w-full min-h-[60px] md:min-h-[70px] lg:min-h-[75px] flex justify-center items-center rounded-lg px-4 py-3 transition-all duration-300 ${feature.isPrimary ? 'bg-[hsl(var(--primary))]' : 'bg-[hsl(var(--muted))]'}`}>
                <span className={`text-center font-jomolhari text-base md:text-lg lg:text-xl xl:text-2xl font-normal ${feature.isPrimary ? 'text-white' : 'text-[hsl(var(--primary))]'}`}>
                  {feature.text}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6 max-w-4xl mx-auto">
          {features.slice(3).map((feature, index) => (
            <div key={index} className="w-full">
              <div className={`w-full min-h-[60px] md:min-h-[70px] lg:min-h-[75px] flex justify-center items-center rounded-lg px-4 py-3 transition-all duration-300 ${feature.isPrimary ? 'bg-[hsl(var(--primary))]' : 'bg-[hsl(var(--muted))]'}`}>
                <span className={`text-center font-jomolhari text-base md:text-lg lg:text-xl xl:text-2xl font-normal ${feature.isPrimary ? 'text-white' : 'text-[hsl(var(--primary))]'}`}>
                  {feature.text}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 lg:mt-16">
          <div className="rounded-lg border border-[hsl(var(--primary))]/50 bg-[hsl(var(--secondary))]/10 p-4 sm:p-6 md:p-8">
            <h3 className="font-jomolhari text-xl md:text-2xl lg:text-3xl font-normal text-[hsl(var(--primary))] mb-4 text-center">
              {method.title}
            </h3>
            <p className="font-jomolhari text-sm sm:text-base md:text-lg lg:text-xl text-[hsl(var(--foreground))] text-center leading-relaxed">
              {method.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
