import { useState, useEffect } from 'react';

interface Service {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  acf?: {
    titulo_servico?: string;
    descricao_servico?: string;
    url_imagem_servico?: string;
  };
}

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://cms.nazaresantosestetica.com.br/wp-json/wp/v2/servicos?_embed&per_page=100');
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        const data: Service[] = await response.json();
        setServices(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(`Erro ao carregar serviços: ${err.message}`);
        } else {
          setError('Erro desconhecido ao carregar serviços.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
};