import React, { useState, useEffect } from 'react';
import AddServiceModal from './components/AddServiceModal';
import EditServiceModal from './components/EditServiceModal';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  category: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface WordPressService {
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
    titulo_servico?: string;
    descricao_servico?: string;
    url_imagem_servico?: string;
    preco_servico?: number;
    duracao_servico?: number;
    categoria_servico?: string;
  };
}

const ServicesManagement: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Função para buscar serviços do WordPress
  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch('https://cms.nazaresantosestetica.com.br/wp-json/wp/v2/servicos?status=publish&per_page=100', {
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

      const wpServices: WordPressService[] = await response.json();
      
      const convertedServices: Service[] = wpServices.map(wpService => ({
        id: wpService.id.toString(),
        name: wpService.acf?.titulo_servico || wpService.title.rendered,
        description: wpService.acf?.descricao_servico || wpService.content.rendered.replace(/<[^>]*>/g, ''),
        price: wpService.acf?.preco_servico || 150.00,
        duration_minutes: wpService.acf?.duracao_servico || 60,
        category: wpService.acf?.categoria_servico || 'Geral',
        image_url: wpService.acf?.url_imagem_servico,
        is_active: wpService.status === 'publish',
        created_at: wpService.date,
        updated_at: wpService.modified
      }));

      setServices(convertedServices);
      setRetryCount(0);
    } catch (err) {
      console.error('Erro ao buscar serviços:', err);
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Timeout: A requisição demorou muito para responder');
      } else {
        setError(err instanceof Error ? err.message : 'Erro desconhecido ao carregar serviços');
      }
    } finally {
      setLoading(false);
    }
  };

  // Carregar serviços do WordPress
  useEffect(() => {
    fetchServices();
  }, []);

  // Função para tentar novamente
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchServices();
  };

  const handleAddService = async (newService: Omit<Service, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      // Payload para o webhook
      const webhookPayload = {
        type: "service", // Especifica o tipo de evento
        title: newService.name,
        content: newService.description,
        status: "publish",
        acf: {
          titulo_servico: newService.name,
          descricao_servico: newService.description,
          url_imagem_servico: newService.image_url || "" // Garante que não seja undefined
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
        throw new Error(errorData.message || 'Erro ao enviar serviço para o webhook');
      }

      // Lógica existente para adicionar o serviço localmente (pode ser removida após integração completa com WP)
      const service: Service = {
        id: (services.length + 1).toString(),
        ...newService,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setServices(prev => [service, ...prev]);
      setIsAddModalOpen(false);
      alert('Serviço adicionado e enviado para o WordPress via webhook!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao adicionar serviço ou enviar para o webhook');
    }
  };

  const handleEditClick = (service: Service) => {
    setEditingService(service);
    setIsEditModalOpen(true);
  };

  const handleUpdateService = async (updatedService: Service) => {
    try {
      const updated = {
        ...updatedService,
        updated_at: new Date().toISOString()
      };

      setServices(services.map(s => s.id === updatedService.id ? updated : s));
      setIsEditModalOpen(false);
      setEditingService(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar serviço');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este serviço?')) return;

    try {
      setServices(services.filter(s => s.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir serviço');
    }
  };

  const handleToggleActive = async (service: Service) => {
    try {
      const updatedService = {
        ...service,
        is_active: !service.is_active,
        updated_at: new Date().toISOString()
      };

      setServices(services.map(s => s.id === service.id ? updatedService : s));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao alterar status do serviço');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Serviços</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Adicionar Serviço
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
          <div className="text-gray-600">Carregando serviços do WordPress...</div>
        </div>
      ) : services.length === 0 && !error ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-600">Nenhum serviço encontrado no WordPress</div>
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
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duração
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
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {service.image_url && (
                        <img
                          className="h-10 w-10 rounded-full mr-3"
                          src={service.image_url}
                          alt={service.name}
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {service.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {service.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    R$ {service.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.duration_minutes} min
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        service.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {service.is_active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(service)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleToggleActive(service)}
                      className={`mr-3 ${
                        service.is_active
                          ? 'text-red-600 hover:text-red-900'
                          : 'text-green-600 hover:text-green-900'
                      }`}
                    >
                      {service.is_active ? 'Desativar' : 'Ativar'}
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
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
        <AddServiceModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddService}
        />
      )}

      {isEditModalOpen && editingService && (
        <EditServiceModal
          service={editingService}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingService(null);
          }}
          onUpdate={handleUpdateService}
        />
      )}
    </div>
  );
};

export default ServicesManagement;