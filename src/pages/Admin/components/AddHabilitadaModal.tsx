import React, { useState } from 'react';

interface AddHabilitadaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newHabilitada: { 
    name: string; 
    email: string; 
    password: string;
    whatsapp: string; 
    estado: string;
  }) => void;
}

const AddHabilitadaModal: React.FC<AddHabilitadaModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [estado, setEstado] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, email, password, whatsapp, estado });
    setName('');
    setEmail('');
    setPassword('');
    setWhatsapp('');
    setEstado('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Adicionar Nova Habilitada</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            />
          </div>
          {/* Campo CPF removido */}
          <div className="mb-4">
            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">WhatsApp</label>
            <input 
              type="text" 
              id="whatsapp" 
              value={whatsapp} 
              onChange={(e) => setWhatsapp(e.target.value)} 
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
            <input 
              type="text" 
              id="estado" 
              value={estado} 
              onChange={(e) => setEstado(e.target.value)} 
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancelar</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHabilitadaModal;