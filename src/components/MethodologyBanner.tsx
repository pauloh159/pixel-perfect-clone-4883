import React from 'react';
import { useMethodologyBanner } from '@/hooks/useMethodologyBanner';

export const MethodologyBanner: React.FC = () => {
  const { title, paragraphs, loading, error } = useMethodologyBanner();

  return (
    <section 
      className="relative bg-cover bg-center pt-24 pb-20 md:pt-40 md:pb-40" 
      style={{ backgroundImage: "url('/imagem nazaré.png')" }}
    >
      <div 
        className="absolute inset-0" 
        style={{ backgroundImage: "linear-gradient(to right, rgba(211, 190, 167, 1) 0%, rgba(211, 190, 167, 1) 40%, rgba(211, 190, 167, 0) 60%)" }}
      ></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center md:flex-row md:text-left">
          <div className="md:w-1/2 mb-12 md:mb-0">
            {loading && <p>Carregando...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
              <>
                <h1 className="text-3xl sm:text-4xl md:text-h1-custom font-jomolhari leading-tight mb-4 text-[#402510]">
                  {title}
                </h1>
                {paragraphs.map((p, index) => (
                  <p 
                    key={index} 
                    className="text-base sm:text-lg md:text-xl font-light mb-6 text-[#402510]"
                    dangerouslySetInnerHTML={{ __html: p }}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};