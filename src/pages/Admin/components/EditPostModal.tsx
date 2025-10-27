import React, { useState, useEffect } from 'react';

interface Post {
  id: string;
  title: string;
  content: string;
  featuredImageUrl?: string;
  authorId: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedPost: { id: string; title: string; content: string; author_id: string; featuredImageUrl?: string; }) => void;
  post: Post | null;
  userId: string;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ isOpen, onClose, onUpdate, post, userId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setFeaturedImageUrl(post.featuredImageUrl || '');
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (post) {
      onUpdate({
        id: post.id,
        title,
        content,
        author_id: userId,
        featuredImageUrl: featuredImageUrl,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Editar Post</h3>
        <form onSubmit={handleSubmit} className="mt-2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Conteúdo</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">URL da Imagem Destacada</label>
            <input
              type="text"
              value={featuredImageUrl}
              onChange={(e) => setFeaturedImageUrl(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://example.com/image.jpg"
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

export default EditPostModal;