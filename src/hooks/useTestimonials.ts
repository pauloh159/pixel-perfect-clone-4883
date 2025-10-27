import { useState, useEffect } from 'react';

interface Testimonial {
  name: string;
  text: string;
}

const testimonialsData: Testimonial[] = [
  {
    name: 'Mariana Silva',
    text: 'Excelente atendimento e resultados incríveis! A equipe é super atenciosa e profissional. Recomendo muito!'
  },
  {
    name: 'Carlos Pereira', 
    text: 'Ambiente acolhedor e tratamentos de alta qualidade. Saí muito satisfeito com o serviço prestado.'
  },
  {
    name: 'Ana Costa',
    text: 'A clínica oferece uma variedade de tratamentos modernos. Fiquei impressionada com a eficácia e o cuidado da equipe.'
  },
  {
    name: 'Fernanda Oliveira',
    text: 'Ótima experiência! Os profissionais são bem qualificados e o atendimento é personalizado. Voltarei com certeza.'
  },
  {
    name: 'João Mendes',
    text: 'Serviço impecável e resultados visíveis. A clínica é bem equipada e a equipe é muito competente.'
  }
];

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      // Simulating an API call
      setTimeout(() => {
        setTestimonials(testimonialsData);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Erro ao carregar depoimentos.');
      setLoading(false);
    }
  }, []);

  return { testimonials, loading, error };
};