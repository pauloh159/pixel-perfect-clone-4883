import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import AddHabilitadaModal from './components/AddHabilitadaModal';
import BulkUploadModal from './components/BulkUploadModal';
import EditHabilitadaModal from './components/EditHabilitadaModal';

interface Habilitada {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  cpf: string;
  estado: string;
  bio: string;
  profile_image_url?: string;
  enrollment_date: string;
  enrollment_status: string;
  course_progress: unknown;
  is_active: boolean;
  failed_login_attempts: number;
  last_login: string | null;
}

const Habilitadas: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingHabilitada, setEditingHabilitada] = useState<Habilitada | null>(null);
  const [habilitadas, setHabilitadas] = useState<Habilitada[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch habilitadas from Supabase
  const fetchHabilitadas = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('habilitadas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHabilitadas(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar habilitadas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabilitadas();
  }, []);

  const handleAddHabilitada = async (newHabilitada: {
    name: string;
    email: string;
    password: string;
    whatsapp: string;
    estado: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('habilitadas')
        .insert([{
          name: newHabilitada.name,
          email: newHabilitada.email,
          password: newHabilitada.password,
          whatsapp: newHabilitada.whatsapp,
          estado: newHabilitada.estado,
          is_active: false,
          enrollment_status: 'inactive',
          enrollment_date: new Date().toISOString().split('T')[0],
        }])
        .select()
        .single();

      if (error) throw error;
      
      setHabilitadas(prev => [data, ...prev]);
      setIsAddModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao adicionar habilitada');
    }
  };

  const handleEditClick = (habilitada: Habilitada) => {
    setEditingHabilitada(habilitada);
    setIsEditModalOpen(true);
  };

  const handleUpdateHabilitada = async (updatedHabilitada: {
    id: string;
    name: string;
    email: string;
    whatsapp: string;
    estado: string;
  }) => {
    try {
      const { data, error } = await supabase.rpc('update_habilitada_profile', {
        habilitada_id: updatedHabilitada.id,
        new_name: updatedHabilitada.name,
        new_email: updatedHabilitada.email,
        new_whatsapp: updatedHabilitada.whatsapp,
        new_estado: updatedHabilitada.estado,
      });

      if (error) throw error;

      // Atualizar a lista local com os dados retornados
      setHabilitadas(habilitadas.map(h => 
        h.id === updatedHabilitada.id 
          ? { ...h, ...updatedHabilitada } 
          : h
      ));
      setIsEditModalOpen(false);
      setEditingHabilitada(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar habilitada');
    }
  };

  const handleDeleteHabilitada = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta habilitada?')) return;

    try {
      const { error } = await supabase
        .from('habilitadas')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setHabilitadas(habilitadas.filter(h => h.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir habilitada');
    }
  };

  const handleActivateHabilitada = async (id: string) => {
    if (window.confirm('Tem certeza que deseja ativar esta habilitada?')) {
      const { error } = await supabase
        .from('habilitadas')
        .update({ is_active: true, enrollment_status: 'active' })
        .eq('id', id);

      if (error) {
        alert(`Erro ao ativar habilitada: ${error.message}`);
      } else {
        setHabilitadas(habilitadas.map(h => 
          h.id === id ? { ...h, is_active: true, enrollment_status: 'active' } : h
        ));
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Habilitadas</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => setIsAddModalOpen(true)} 
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
        >
          Adicionar Habilitada
        </button>
        <button 
          onClick={() => setIsBulkModalOpen(true)} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Cadastro em Massa
        </button>
      </div>
      
      <div className="bg-white p-4 rounded shadow">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Carregando habilitadas...</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WhatsApp</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {habilitadas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    Nenhuma habilitada encontrada
                  </td>
                </tr>
              ) : (
                habilitadas.map((habilitada) => (
                  <tr key={habilitada.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{habilitada.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{habilitada.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{habilitada.whatsapp}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{habilitada.estado}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        habilitada.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {habilitada.is_active ? 'Ativa' : 'Inativa'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {!habilitada.is_active && (
                        <button 
                          onClick={() => handleActivateHabilitada(habilitada.id)} 
                          className="text-green-600 hover:text-green-900 mr-4"
                        >
                          Ativar
                        </button>
                      )}
                      <button 
                        onClick={() => handleEditClick(habilitada)} 
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDeleteHabilitada(habilitada.id)} 
                        className="text-red-600 hover:text-red-900"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      
      <AddHabilitadaModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddHabilitada} 
      />
      <BulkUploadModal 
        isOpen={isBulkModalOpen} 
        onClose={() => setIsBulkModalOpen(false)} 
      />
      <EditHabilitadaModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        onUpdate={handleUpdateHabilitada} 
        habilitada={editingHabilitada} 
      />
    </div>
  );
};

export default Habilitadas;