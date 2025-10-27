import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <div className="mb-6">
          <div className="text-6xl text-red-500 mb-4">🚫</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Acesso Negado</h1>
          <p className="text-gray-600">
            Você não tem permissão para acessar esta área.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button 
            onClick={() => navigate('/')} 
            className="w-full"
          >
            Voltar ao Início
          </Button>
          
          <Button 
            onClick={() => navigate(-1)} 
            variant="outline"
            className="w-full"
          >
            Página Anterior
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;