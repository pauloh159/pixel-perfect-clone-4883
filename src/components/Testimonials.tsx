import React from 'react';
import { StarRating } from './StarRating';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      text: 'Excelente atendimento e resultados incríveis! A equipe é super atenciosa e profissional. Recomendo muito!',
      author: 'Mariana Silva',
      rating: 5
    },
    {
      text: 'Ambiente acolhedor e tratamentos de alta qualidade. Saí muito satisfeito com o serviço prestado.',
      author: 'Carlos Pereira',
      rating: 5
    },
    {
      text: 'A clínica oferece uma variedade de tratamentos modernos. Fiquei impressionada com a eficácia e o cuidado da equipe.',
      author: 'Ana Costa',
      rating: 5
    },
    {
      text: 'Ótima experiência! Os profissionais são bem qualificados e o atendimento é personalizado. Voltarei com certeza.',
      author: 'Fernanda Oliveira',
      rating: 5
    },
    {
      text: 'Serviço impecável e resultados visíveis. A clínica é bem equipada e a equipe é muito competente.',
      author: 'João Mendes',
      rating: 5
    }
  ];

  return (
    <section className="relative">
      <div className="w-[674px] h-[151px] text-[#402510] text-center text-[46px] font-normal absolute left-[623px] top-[2358px]">
        O que Nossas Clientes Dizem
      </div>
      
      {testimonials.map((testimonial, index) => (
        <article
          key={index}
          className={`flex w-[340px] flex-col items-start gap-2.5 absolute h-[340px] bg-white pt-[31px] pb-[45px] px-[23px] rounded-[20px] shadow-lg hover:shadow-xl transition-shadow duration-300 ${
            index === 0 ? 'left-64' :
            index === 1 ? 'left-[616px]' :
            index === 2 ? 'left-[976px]' :
            index === 3 ? 'left-[1336px]' :
            'left-[1696px]'
          } top-[2509px] max-md:relative max-md:w-[90%] max-md:max-w-[350px] max-md:mx-auto max-md:my-5 max-md:left-auto max-md:top-auto`}
        >
          <div className="flex flex-col items-start self-stretch relative">
            <div className="h-[199px] self-stretch text-black text-xl font-normal relative">
              {testimonial.text}
            </div>
            <StarRating rating={testimonial.rating} />
          </div>
          <div className="h-[35px] self-stretch text-black text-base font-normal relative">
            {testimonial.author}
          </div>
        </article>
      ))}
    </section>
  );
};
