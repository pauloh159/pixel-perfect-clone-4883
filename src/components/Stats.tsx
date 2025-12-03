import React from 'react';
import { StatItem } from './StatItem';
import { useStats } from '@/hooks/useStats';

export const Stats: React.FC = () => {
  const { stats, loading, error } = useStats();

  return (
    <section className="relative z-20 px-4 md:px-8 lg:px-16 lg:-mt-12">
      <div className="container mx-auto max-w-6xl">
        <div className="w-full rounded-t-[20px] bg-[rgba(237,237,237,0.50)] shadow-[8px_4px_30px_0_rgba(0,0,0,0.25)] backdrop-blur-[3.5px] p-6 md:p-8 lg:p-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-16">
            {loading && <p>Carregando estatísticas...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && stats.map((stat, index) => (
              <StatItem key={index} text={stat.text} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
