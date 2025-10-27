import { useState, useEffect } from 'react';

interface Feature {
  text: string;
  isPrimary: boolean;
}

interface FeaturesContent {
  title: {
    part1: string;
    part2: string;
  };
  features: Feature[];
  method: {
    title: string;
    description: string;
  };
}

const initialContent: FeaturesContent = {
  title: {
    part1: 'Por Que Escolher a ',
    part2: 'Clinica Nazaré Santos?',
  },
  features: [
    { text: 'Método Exclusivo', isPrimary: true },
    { text: 'Equipe Especializada', isPrimary: false },
    { text: 'Resultados Comprovados', isPrimary: false },
    { text: 'Ambiente Acolhedor', isPrimary: false },
    { text: 'Suporte Eficaz', isPrimary: false },
  ],
  method: {
    title: 'O Método Nazaré Santos',
    description: 'revoluciona o universo da estética com técnicas exclusivas e resultados comprovados. Desenvolvido pela especialista Nazaré Santos, este protocolo inovador tem formado profissionais em todo o mundo, tornando a Nazaré Santos Estética referência em tratamentos personalizados que transformam não apenas a aparência, mas a autoestima de quem busca o melhor em cuidados estéticos.',
  },
};

export const useFeatures = () => {
  const [content, setContent] = useState<FeaturesContent>(initialContent);
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
      setError('Failed to load features content.');
      setLoading(false);
    }
  }, []);

  return { ...content, loading, error };
};