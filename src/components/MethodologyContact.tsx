import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const Card = ({ title, text }: { title: string; text: string }) => (
  <div className="embla__slide p-4">
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <h3 className="text-xl font-bold mb-2 text-[#402510]">{title}</h3>
      <p className="text-gray-700">{text}</p>
    </div>
  </div>
);

export const MethodologyContact: React.FC = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  const cards = [
    { title: "Card 1", text: "Conteúdo do card 1." },
    { title: "Card 2", text: "Conteúdo do card 2." },
    { title: "Card 3", text: "Conteúdo do card 3." },
    { title: "Card 4", text: "Conteúdo do card 4." },
    { title: "Card 5", text: "Conteúdo do card 5." },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-jomolhari text-h2-custom font-semi-medium leading-tight text-[hsl(var(--primary))] mb-4">
            Título da Seção de Contato
          </h2>
        </div>
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {cards.map((card, index) => (
              <Card key={index} title={card.title} text={card.text} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};