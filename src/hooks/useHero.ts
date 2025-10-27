import { useState, useEffect } from 'react';

interface HeroContent {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
}

const initialContent: HeroContent = {
  title: 'Venha Cuidar-Se Com O Protocolo <br />Único De Nazaré Santos',
  subtitle: 'Descubra o procedimento ideal para você com os segredos que só encontra aqui com a especialista que está revolucionando o mercado da estética.',
  buttonText: 'Realize o seu agendamento',
  imageUrl: '/foto do banner principal 1.png',
};

export const useHero = () => {
  const [content, setContent] = useState<HeroContent>(initialContent);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Simulating an async data fetch
      setTimeout(() => {
        setContent(initialContent);
        setLoading(false);
      }, 300);
    } catch (err) {
      setError('Failed to load hero content.');
      setLoading(false);
    }
  }, []);

  return { ...content, loading, error };
};