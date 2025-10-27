import React, { useState, useEffect } from 'react';
import AddEventModal from './components/AddEventModal';
import EditEventModal from './components/EditEventModal';

interface Event {
  id: string;
  name: string;
  date: string;
  description: string;
  image_url?: string;
  location?: string;
  max_participants?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface WordPressEvent {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  status: string;
  date: string;
  modified: string;
  acf?: {
    titulo_evento?: string;
    descricao_evento?: string;
    data_evento?: string;
    local_evento?: string;
    max_participantes_evento?: number;
    url_imagem_evento?: string;
  };
}

const EventsManagement: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // Função para buscar eventos do WordPress
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch('https://cms.nazaresantosestetica.com.br/wp-json/wp/v2/eventos?status=publish&per_page=100', {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const wpEvents: WordPressEvent[] = await response.json();
      
      const convertedEvents: Event[] = wpEvents.map(wpEvent => ({
        id: wpEvent.id.toString(),
        name: wpEvent.acf?.titulo_evento || wpEvent.title.rendered,
        description: wpEvent.acf?.descricao_evento || wpEvent.content.rendered.replace(/<[^>]*>/g, ''),
        date: wpEvent.acf?.data_evento || wpEvent.date,
        location: wpEvent.acf?.local_evento,
        max_participants: wpEvent.acf?.max_participantes_evento,
        image_url: wpEvent.acf?.url_imagem_evento,
        is_active: wpEvent.status === 'publish',
        created_at: wpEvent.date,
        updated_at: wpEvent.modified
      }));

      setEvents(convertedEvents);
      setRetryCount(0);
    } catch (err) {
      console.error('Erro ao buscar eventos:', err);
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Timeout: A requisição demorou muito para responder');
      } else {
        setError(err instanceof Error ? err.message : 'Erro desconhecido ao carregar eventos');
      }
    } finally {
      setLoading(false);
    }
  };

  // Carregar eventos do WordPress
  useEffect(() => {
    fetchEvents();
  }, []);

  // Função para tentar novamente
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchEvents();
  };

  const handleAddEvent = async (newEvent: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      // Payload para o webhook
      const webhookPayload = {
        type: "event", // Especifica o tipo de evento
        title: newEvent.name,
        content: newEvent.description,
        status: "publish",
        acf: {
          titulo_evento: newEvent.name,
          descricao_evento: newEvent.description,
          data_evento: newEvent.date,
          local_evento: newEvent.location || "",
          max_participantes_evento: newEvent.max_participants || 0,
          url_imagem_evento: newEvent.image_url || ""
        }
      };

      // Enviar dados para o webhook
      const response = await fetch('https://webhook.oneclickag.com.br/webhook-test/site-naza', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao enviar evento para o webhook');
      }

      // Lógica existente para adicionar o evento localmente (pode ser removida após integração completa com WP)
      const now = new Date().toISOString();
      const eventToAdd: Event = {
        ...newEvent,
        id: Date.now().toString(),
        created_at: now,
        updated_at: now
      };
      
      setEvents(prev => [...prev, eventToAdd]);
      setAddModalOpen(false);
      alert('Evento adicionado e enviado para o WordPress via webhook!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao adicionar evento ou enviar para o webhook');
    }
  };

  const handleUpdateEvent = async (updatedEvent: Event) => {
    try {
      const eventToUpdate = {
        ...updatedEvent,
        updated_at: new Date().toISOString()
      };

      setEvents(events.map(event => event.id === updatedEvent.id ? eventToUpdate : event));
      setEditModalOpen(false);
      setSelectedEvent(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar evento');
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Tem certeza que deseja excluir este evento?')) return;

    try {
      setEvents(events.filter(event => event.id !== eventId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir evento');
    }
  };

  const handleToggleActive = async (event: Event) => {
    try {
      const updatedEvent = {
        ...event,
        is_active: !event.is_active,
        updated_at: new Date().toISOString()
      };

      setEvents(events.map(e => e.id === event.id ? updatedEvent : e));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao alterar status do evento');
    }
  };

  const openEditModal = (event: Event) => {
    setSelectedEvent(event);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Eventos</h1>
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Adicionar Evento
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button 
              onClick={handleRetry}
              className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
          <div className="text-gray-600">Carregando eventos do WordPress...</div>
        </div>
      ) : events.length === 0 && !error ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-600">Nenhum evento encontrado no WordPress</div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Local
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participantes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {event.image_url && (
                        <img
                          className="h-10 w-10 rounded-full mr-3"
                          src={event.image_url}
                          alt={event.name}
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {event.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {event.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(event.date).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {event.location || 'Não informado'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {event.max_participants ? `Máx. ${event.max_participants}` : 'Ilimitado'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        event.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {event.is_active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openEditModal(event)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleToggleActive(event)}
                      className={`mr-3 ${
                        event.is_active
                          ? 'text-red-600 hover:text-red-900'
                          : 'text-green-600 hover:text-green-900'
                      }`}
                    >
                      {event.is_active ? 'Desativar' : 'Ativar'}
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isAddModalOpen && (
        <AddEventModal
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          onAdd={handleAddEvent}
        />
      )}

      {selectedEvent && (
        <EditEventModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onUpdate={handleUpdateEvent}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default EventsManagement;