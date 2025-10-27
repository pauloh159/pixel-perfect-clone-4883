import React from 'react';

export const Contact: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* First Column: Text Content */}
          <div className="text-left">
            <h2 className="font-jomolhari text-h2-custom font-semi-medium leading-tight text-[hsl(var(--primary))] mb-4">
              Venha Conhecer Nosso Espaço E Receber O Tratamento Que Seu Corpo Merece.
            </h2>
            <p className="font-jomolhari text-[16pt] font-regular leading-relaxed text-[hsl(var(--primary))] mt-4">
              Clique No Mapa Ao Lado E Veja A Melhor <br/>
              Rota Para Você.
            </p>
          </div>

          {/* Second Column: Map Container */}
          <div className="w-full px-4 flex justify-center"> {/* Esta div é a coluna do grid, com padding e centralização */}
            <div className="relative max-w-[823px] h-[440px] aspect-[16/10] md:aspect-[16/9] lg:aspect-[2/1] rounded-lg overflow-hidden shadow-lg"> {/* O mapa terá no máximo 823px de largura, mas será responsivo */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d995.332302659616!2d-38.498049489295916!3d-3.738257187479806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c7492afe5f9cd1%3A0xf7cb7532e177870a!2sNazar%C3%A9%20Santos%20Est%C3%A9tica!5e0!3m2!1spt-BR!2sbr!4v1758318280681!5m2!1spt-BR!2sbr"
                width="100%" // Alterado para 100% para responsividade
                height="100%" // Alterado para 100% para responsividade
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Nazaré Santos Estética" // Título atualizado para acessibilidade
              ></iframe>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};
