import React, { useState, useEffect } from 'react';
import { EventCard } from '../components/EventCard';
import { EventHero } from '../components/EventHero';

interface Event {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  acf?: {
    titulo_evento?: string;
    descricao_evento?: string;
    data_evento?: string;
    local_evento?: string;
    max_participantes_evento?: number;
    url_imagem_evento?: string;
  };
}

const Events: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://cms.nazaresantosestetica.com.br/wp-json/wp/v2/eventos?_embed');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Event[] = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar eventos');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => 
    event.title.rendered.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.content.rendered.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (loading) {
    return <div className="text-center py-20">Carregando eventos...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-600">Erro: {error}</div>;
  }

  return (
    <div className="bg-background">
      <EventHero onSearch={handleSearch} />
      <section className="py-20 md:py-32 px-4">
        <div className="container mx-auto">
          {filteredEvents.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-gray-600">
                {searchQuery ? 'Nenhum evento encontrado para sua busca.' : 'Nenhum evento encontrado.'}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.acf?.titulo_evento || event.title.rendered}
                  image={event.acf?.url_imagem_evento || '/placeholder-event.svg'}
                  description={event.acf?.descricao_evento || event.content.rendered.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                  date={event.acf?.data_evento || new Date().toLocaleDateString('pt-BR')}
                  location={event.acf?.local_evento || 'Local a definir'}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;