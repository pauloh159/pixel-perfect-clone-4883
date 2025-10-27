import React, { useState, useEffect } from 'react';
import { UserProfileHeader } from '@/components/UserProfileHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth.tsx';
import { updateProfile } from '@/services/authService';

const UserProfile: React.FC = () => {
  const { user, setUser } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    state: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  // Efeito para inicializar o formulário quando o usuário for carregado
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        whatsapp: user.whatsapp || '',
        state: user.estado || '',
      });
    }
  }, [user]);

  const getStatusDisplay = (user: any) => {
    if (user.role === 'admin' || user.role === 'superadmin') {
      return 'Administrador';
    }
    
    if (user.role === 'habilitada') {
      // Se is_active é explicitamente false, mostrar aguardando ativação
      if (user.is_active === false) {
        return 'Conta Inativa - Aguardando Ativação';
      }
      
      // Se is_active é true ou não definido, usar enrollment_status
      switch (user.enrollment_status) {
        case 'active':
          return 'Habilitada Ativa';
        case 'inactive':
          return 'Habilitada Inativa';
        case 'suspended':
          return 'Conta Suspensa';
        case 'graduated':
          return 'Habilitada Formada';
        default:
          // Se is_active é true mas não tem enrollment_status, assumir ativa
          return user.is_active === true ? 'Habilitada Ativa' : 'Habilitada';
      }
    }
    
    return 'Usuário';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      alert('Erro: usuário não identificado');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await updateProfile({
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        estado: formData.state
      });

      if (result.success) {
        // Atualizar os dados do usuário no contexto
        setUser({
          ...user,
          name: result.user.name,
          email: result.user.email,
          whatsapp: result.user.whatsapp,
          estado: result.user.estado
        });

        alert('Dados atualizados com sucesso!');
      } else {
        alert(result.message || 'Erro ao atualizar dados');
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar dados. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Se não há usuário logado, mostrar loading ou redirect
  if (!user) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Carregando dados do usuário...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <UserProfileHeader />
      <div className="bg-gray-100 min-h-screen p-8 pt-32">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-primary">Informações do Usuário</h1>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            {/* Alerta para contas inativas */}
            {user?.role === 'habilitada' && user?.is_active === false && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Conta Aguardando Ativação
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        Sua conta está sendo analisada pela nossa equipe. Você receberá um e-mail quando ela for ativada.
                        Enquanto isso, você pode visualizar e editar suas informações pessoais.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start mb-8">
              <div className="relative mb-4 md:mb-0">
                <img src={'/placeholder.svg'} alt={user.name} className="w-24 h-24 rounded-full object-cover" />
                <button className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <div className="md:ml-6">
                <h2 className="text-xl font-bold text-primary">{user.name}</h2>
                <p className="text-sm text-gray-600">Status: {getStatusDisplay(user)}</p>
                <p className="text-sm text-gray-500">ID: {user.id}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div>
                <h3 className="text-lg font-bold text-primary border-b pb-2 mb-6">Informações Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="text-sm font-bold text-gray-700">Nome Completo</label>
                    <Input id="name" type="text" value={formData.name} onChange={handleChange} className="mt-1" />
                  </div>
                  <div>
                    <label htmlFor="whatsapp" className="text-sm font-bold text-gray-700">WhatsApp</label>
                    <Input id="whatsapp" type="text" value={formData.whatsapp} onChange={handleChange} className="mt-1" />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-bold text-gray-700">E-mail</label>
                    <Input id="email" type="email" value={formData.email} onChange={handleChange} className="mt-1" />
                  </div>
                  <div>
                    <label htmlFor="state" className="text-sm font-bold text-gray-700">Estado</label>
                    <Input id="state" type="text" value={formData.state} onChange={handleChange} className="mt-1" />
                  </div>
                </div>
              </div>
              <Button type="submit" className="mt-8" disabled={isLoading}>
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;