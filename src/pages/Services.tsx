import React, { useState, useEffect } from 'react';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceHero } from '../components/ServiceHero';

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

const Services: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchServices = async (attempt = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout
      
      const response = await fetch('https://cms.nazaresantosestetica.com.br/wp-json/wp/v2/servicos?_embed', {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const data: Service[] = await response.json();
      setServices(data);
      setRetryCount(0);
    } catch (err) {
      console.error('Erro ao carregar serviços:', err);
      
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Tempo limite excedido. Verifique sua conexão com a internet.');
        } else if (err.message.includes('Failed to fetch')) {
          setError('Não foi possível conectar ao servidor. Verifique sua conexão com a internet.');
        } else {
          setError(`Erro ao carregar serviços: ${err.message}`);
        }
      } else {
        setError('Erro desconhecido ao carregar serviços.');
      }
      
      // Retry logic - máximo 3 tentativas
      if (attempt < 3) {
        setTimeout(() => {
          setRetryCount(attempt);
          fetchServices(attempt + 1);
        }, 2000 * attempt); // Delay progressivo: 2s, 4s, 6s
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const filteredServices = services.filter(service => 
    service.title.rendered.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.content.rendered.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRetry = () => {
    fetchServices();
  };

  if (loading) {
    return (
      <div className="bg-background">
        <ServiceHero onSearch={handleSearch} />
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">
            Carregando serviços...
            {retryCount > 0 && ` (Tentativa ${retryCount + 1}/3)`}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background">
        <ServiceHero onSearch={handleSearch} />
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="text-red-600 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ops! Algo deu errado</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <ServiceHero onSearch={handleSearch} />
      <section className="py-20 md:py-32 px-4">
        <div className="container mx-auto">
          {filteredServices.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-gray-600">
                  {searchQuery ? 'Nenhum serviço encontrado para sua busca.' : 'Nenhum serviço encontrado.'}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-4 text-primary hover:text-primary/80 underline"
                  >
                    Limpar busca
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.acf?.titulo_servico || service.title.rendered}
                  image={service.acf?.url_imagem_servico || '/placeholder-service.svg'}
                  description={service.acf?.descricao_servico || service.content.rendered.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;