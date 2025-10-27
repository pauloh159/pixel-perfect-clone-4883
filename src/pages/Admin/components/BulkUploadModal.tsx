import React from 'react';

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BulkUploadModal: React.FC<BulkUploadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Cadastro em Massa</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">Selecione o arquivo CSV</label>
            <input type="file" id="file" accept=".csv" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancelar</button>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BulkUploadModal;