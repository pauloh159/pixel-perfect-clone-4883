import React from 'react';

export const Contact: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* First Column: Text Content */}
          <div className="text-center md:text-left">
            <h2 className="font-jomolhari text-2xl sm:text-3xl md:text-h2-custom font-semi-medium leading-tight text-[hsl(var(--primary))] mb-4">
              Venha Conhecer Nossos Espaços E Receber O Tratamento Que Seu Corpo Merece.
            </h2>
            <p className="font-jomolhari text-base md:text-lg lg:text-[16pt] font-regular leading-relaxed text-[hsl(var(--primary))] mt-4">
              Escolha a unidade mais próxima de você e clique nos mapas ao lado para ver a melhor rota.
            </p>
          </div>

          {/* Second Column: Maps Container */}
          <div className="w-full flex flex-col gap-8 justify-center"> 
            
            {/* Mapa Fortaleza */}
            <div className="w-full">
              <h3 className="font-jomolhari text-xl font-bold text-[hsl(var(--primary))] mb-3">Unidade Fortaleza</h3>
              <p className="text-[hsl(var(--primary))] mb-4 text-sm">R. Barbosa de Freitas, 1415 - loja C - Aldeota</p>
              <div className="relative w-full h-[250px] sm:h-[300px] md:h-[340px] rounded-lg overflow-hidden shadow-lg"> 
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d995.332302659616!2d-38.498049489295916!3d-3.738257187479806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c7492afe5f9cd1%3A0xf7cb7532e177870a!2sNazar%C3%A9%20Santos%20Est%C3%A9tica!5e0!3m2!1spt-BR!2sbr!4v1758318280681!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da Nazaré Santos Estética - Fortaleza"
                ></iframe>
              </div>
            </div>

            {/* Mapa São Paulo */}
            <div className="w-full">
              <h3 className="font-jomolhari text-xl font-bold text-[hsl(var(--primary))] mb-3">Unidade São Paulo</h3>
              <p className="text-[hsl(var(--primary))] mb-4 text-sm">Shopping Flamingo - Alameda Araguaia, 762 – Sala 15S</p>
              <div className="relative w-full h-[250px] sm:h-[300px] md:h-[340px] rounded-lg overflow-hidden shadow-lg"> 
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.745167664364!2d-46.85244582386121!3d-23.491307559522197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf023e3e031eb9%3A0x63b86dbbba9d7373!2sShopping%20Flamingo!5e0!3m2!1spt-BR!2sbr!4v1709214436573!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da Nazaré Santos Estética - São Paulo"
                ></iframe>
              </div>
            </div>

          </div>
        </div>


      </div>
    </section>
  );
};
