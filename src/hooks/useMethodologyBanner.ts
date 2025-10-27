import { useState, useEffect } from 'react';

interface BannerContent {
  title: string;
  paragraphs: string[];
}

const initialContent: BannerContent = {
  title: 'Nazaré Santos',
  paragraphs: [
    'Esteticista renomada e CEO da Clínica Nazaré Santos, criou um método exclusivo facial e corporal que já <strong>formou mais de 100 profissionais no Brasil</strong>.',
    'Com formação internacional em Thai Massage e Drenagem Linfática de Bruxelas, revoluciona a estética brasileira em 2025.',
    '<strong>Especialista em terapias manuais</strong>, seu método inclui técnicas inovadoras como Drenagem Linfática da Naza e Powerlifting Facial, que garantem resultados imediatos.',
    'Também compartilha sua expertise no <strong>curso "Estética Business"</strong>, ensinando os segredos para uma clínica de sucesso.',
  ],
};

export const useMethodologyBanner = () => {
  const [content, setContent] = useState<BannerContent>(initialContent);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Simulating an async data fetch
      setTimeout(() => {
        setContent(initialContent);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to load banner content.');
      setLoading(false);
    }
  }, []);

  return { ...content, loading, error };
};