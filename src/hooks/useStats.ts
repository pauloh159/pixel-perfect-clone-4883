import { useState, useEffect } from 'react';

interface Stat {
  text: string;
}

const initialStats: Stat[] = [
  { text: '+6 Anos de Serviços' },
  { text: '+800 Clientes' },
  { text: '+ 860 Casos de Sucesso' },
];

export const useStats = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Simulating an async data fetch
      setTimeout(() => {
        setStats(initialStats);
        setLoading(false);
      }, 300);
    } catch (err) {
      setError('Failed to load stats.');
      setLoading(false);
    }
  }, []);

  return { stats, loading, error };
};