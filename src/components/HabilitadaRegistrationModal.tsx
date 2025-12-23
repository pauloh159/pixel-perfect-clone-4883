import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface HabilitadaRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const HabilitadaRegistrationModal: React.FC<HabilitadaRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    estado: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Criar pré-cadastro com status inativo
      const { error } = await supabase
        .from('habilitadas')
        .insert([{
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          estado: formData.estado,
          password: formData.password,
          is_active: false,
          enrollment_status: 'inactive',
          enrollment_date: new Date().toISOString().split('T')[0]
        }]);

      if (error) throw error;

      // Redirecionar para o WhatsApp após salvar no banco
      const whatsappLink = "https://wa.me/558585009515?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20meu%20pr%C3%A9-cadastro%20como%20habilitada.";
      window.open(whatsappLink, '_blank');

      onSuccess();
      onClose();
      setFormData({
        name: '',
        email: '',
        whatsapp: '',
        estado: '',
        password: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao realizar pré-cadastro');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary">Pré-cadastro de Habilitada</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Digite seu nome completo"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mail *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Digite seu e-mail"
              />
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp *
              </label>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="(11) 99999-9999"
              />
            </div>

            <div>
              <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
                Estado *
              </label>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Selecione seu estado</option>
                {estados.map(estado => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-4">
              <p className="text-sm text-yellow-800">
                <strong>Importante:</strong> Seu cadastro será analisado pela nossa equipe. 
                Você receberá um e-mail quando sua conta for ativada.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Enviando...' : 'Enviar Pré-cadastro'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};