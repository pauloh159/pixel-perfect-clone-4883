import React, { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import { HabilitadaRegistrationModal } from './HabilitadaRegistrationModal';

interface Event {
  id: string;
  title?: {
    rendered: string;
  };
  content?: {
    rendered: string;
  };
  acf?: {
    nome_evento?: string;
    descricao_evento?: string;
    descricao_do_evento?: string; // Adicionado para compatibilidade
    data_evento?: string;
    local_evento?: string;
    localizacao_evento?: string;
    max_participantes?: number;
    url_imagem_evento?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
  date: string;
  status: string;
}

export const MethodologyTrainings = () => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const decodeHtml = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const fetchEvents = async (attempt = 0) => {
    try {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      // Adicionado _embed para trazer imagens destacadas
      const response = await fetch('https://cms.nazaresantosestetica.com.br/wp-json/wp/v2/eventos?status=publish&per_page=100&_embed', {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data: Event[] = await response.json();
      console.log('Eventos carregados da API:', data); // Log para debug dos campos ACF
      const activeEvents = data.filter(event => event.status === 'publish');
      setEvents(activeEvents);
      setRetryCount(0);
    } catch (err) {
      console.error('Erro ao buscar eventos:', err);
      
      if (attempt < 3) {
        const delay = Math.pow(2, attempt) * 1000;
        setTimeout(() => {
          setRetryCount(attempt + 1);
          fetchEvents(attempt + 1);
        }, delay);
      } else {
        setError('Não foi possível carregar os eventos. Verifique sua conexão.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const loopedEvents = events.length > 0 ? [...events, ...events] : [];

  const startAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      api?.scrollNext();
    }, 2000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });

    if (events.length > 0) {
      startAutoScroll();
    }

    return () => {
      stopAutoScroll();
    };
  }, [api, events]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    // Tratamento para formato ACF (YYYYMMDD)
    if (dateString.length === 8 && /^\d{8}$/.test(dateString)) {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      return `${day}/${month}/${year}`;
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getEventName = (event: Event) => {
    const title = event.acf?.nome_evento || event.title?.rendered || 'Evento sem título';
    return decodeHtml(title);
  };

  const getEventDescription = (event: Event) => {
    // Tenta descricao_do_evento (API) ou descricao_evento (Interface antiga)
    const description = event.acf?.descricao_do_evento || event.acf?.descricao_evento || event.content?.rendered || 'Descrição não disponível';
    // Remove HTML tags se houver e decodifica entidades
    return decodeHtml(description.replace(/<[^>]*>/g, ''));
  };

  const getEventImage = (event: Event) => {
    // Tenta pegar do ACF primeiro, depois da imagem destacada do WordPress
    if (event.acf?.url_imagem_evento) return event.acf.url_imagem_evento;
    
    if (event._embedded && event._embedded['wp:featuredmedia'] && event._embedded['wp:featuredmedia'][0]) {
      return event._embedded['wp:featuredmedia'][0].source_url;
    }
    
    return '/placeholder-event.svg';
  };

  const getEventDate = (event: Event) => {
    // Prioriza data do ACF, se não existir, usa a data de publicação
    // Mas a data do ACF é a correta para "quando o evento acontece"
    return event.acf?.data_evento || event.date;
  };

  const getEventLocation = (event: Event) => {
    // Tenta variações comuns de nome de campo
    return event.acf?.local_evento || event.acf?.localizacao_evento || '';
  };

  const getEventMaxParticipants = (event: Event) => {
    return event.acf?.max_participantes || 0;
  };

  const handleRegistrationSuccess = () => {
    alert('Pré-cadastro realizado com sucesso! Você receberá um e-mail quando sua conta for ativada.');
  };

  if (loading) {
    return (
      <section className="py-20 md:py-32 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6">
              Fique Por Dentro da <span className="text-accent">Agenda de Treinamentos</span>
            </h2>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-600">Nenhum evento programado no momento.</div>
          </div>
        </div>
      </section>
    );
  }

  const ACTIVE_WIDTH = 40;
  const INACTIVE_WIDTH = 8;

  return (
    <section className="py-20 md:py-32 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6">
            Fique Por Dentro da <span className="text-accent">Agenda de Treinamentos</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Participe dos nossos treinamentos exclusivos e aprenda as técnicas mais avançadas em estética.
          </p>
        </div>

        <div className="relative">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
            onMouseEnter={stopAutoScroll}
            onMouseLeave={startAutoScroll}
          >
            <CarouselContent className="-ml-8">
              {loopedEvents.map((event, index) => (
                <CarouselItem key={`${event.id}-${index}`} className="pl-8 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={getEventImage(event)}
                        alt={getEventName(event)}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                      <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Gratuito
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2">
                        {getEventName(event)}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {getEventDescription(event)}
                      </p>
                      <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(getEventDate(event))}
                        </div>
                        {getEventLocation(event) && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {getEventLocation(event)}
                          </div>
                        )}
                        {getEventMaxParticipants(event) > 0 && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            0/{getEventMaxParticipants(event)} participantes
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => setIsRegistrationModalOpen(true)}
                        className="w-full mt-4 bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent/90 transition-colors duration-300 font-semibold block text-center"
                      >
                        Inscrever-se
                      </button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Custom indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {(() => {
              const indicatorPositions = events.map((_, index) => {
                const distance = Math.abs(index - (current % events.length));
                const width = index === (current % events.length) ? ACTIVE_WIDTH : INACTIVE_WIDTH;
                return { width, distance };
              });

              return indicatorPositions.map((pos, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === (current % events.length) ? 'bg-accent' : 'bg-gray-300'
                  }`}
                  style={{ width: `${pos.width}px` }}
                  onClick={() => api?.scrollTo(index)}
                />
              ));
            })()}
          </div>
        </div>
      </div>

      <HabilitadaRegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onSuccess={handleRegistrationSuccess}
      />
    </section>
  );
};