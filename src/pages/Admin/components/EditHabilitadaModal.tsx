import React, { useState, useEffect } from 'react';

interface Habilitada {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  estado: string;
  cpf: string;
  bio?: string;
  profile_image_url?: string;
  enrollment_status: string;
  is_active: boolean;
}

interface EditHabilitadaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (habilitada: Habilitada) => void;
  habilitada: Habilitada | null;
}

const EditHabilitadaModal: React.FC<EditHabilitadaModalProps> = ({ isOpen, onClose, onUpdate, habilitada }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [estado, setEstado] = useState('');
  const [cpf, setCpf] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (habilitada) {
      setName(habilitada.name);
      setEmail(habilitada.email);
      setWhatsapp(habilitada.whatsapp);
      setEstado(habilitada.estado);
      setCpf(habilitada.cpf);
      setBio(habilitada.bio || '');
    }
  }, [habilitada]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habilitada) {
      onUpdate({ 
        ...habilitada, 
        name, 
        email, 
        whatsapp, 
        estado, 
        cpf,
        bio
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Editar Habilitada</h3>
        <form onSubmit={handleSubmit} className="mt-2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <input
              type="text"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="items-center px-4 py-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Atualizar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHabilitadaModal;