import React, { useState, useEffect } from 'react';
import AddPostModal from './components/AddPostModal';
import EditPostModal from './components/EditPostModal';
import { useAuth } from '../../hooks/useAuth.tsx';

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  featuredImageUrl?: string;
}

interface WordPressPost {
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
  author: number;
  acf?: {
    titulo_post?: string;
    url_imagem_destacada?: string;
  };
}

const BlogManagement: React.FC = () => {
  const { user } = useAuth();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Função para buscar posts do WordPress
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch('https://cms.nazaresantosestetica.com.br/wp-json/wp/v2/posts?per_page=100', {
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

      const wpPosts: WordPressPost[] = await response.json();
      
      const convertedPosts: Post[] = wpPosts.map(wpPost => ({
        id: wpPost.id.toString(),
        title: wpPost.acf?.titulo_post || wpPost.title.rendered,
        content: wpPost.content.rendered,
        featuredImageUrl: wpPost.acf?.url_imagem_destacada,
        authorId: wpPost.author.toString(),
        isPublished: wpPost.status === 'publish',
        createdAt: wpPost.date,
        updatedAt: wpPost.modified
      }));

      setPosts(convertedPosts);
      setRetryCount(0);
    } catch (err) {
      console.error('Erro ao buscar posts:', err);
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Timeout: A requisição demorou muito para responder');
      } else {
        setError(err instanceof Error ? err.message : 'Erro desconhecido ao carregar posts');
      }
    } finally {
      setLoading(false);
    }
  };

  // Carregar posts do WordPress
  useEffect(() => {
    fetchPosts();
  }, []);

  // Função para tentar novamente
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchPosts();
  };

  const handleAddPost = async (newPost: { title: string; content: string; author_id: string; featuredImageUrl?: string }) => {
    const webhookPayload = {
      type: 'blog',
      title: newPost.title,
      content: newPost.content,
      status: 'publish',
      author: newPost.author_id,
      featured_image_url: newPost.featuredImageUrl,
    };

    try {
      const response = await fetch(import.meta.env.VITE_N8N_WEBHOOK_URL_BLOG, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
      });

      if (!response.ok) {
        throw new Error('Falha ao adicionar post');
      }

      fetchPosts();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Erro ao adicionar post:', error);
      setError('Não foi possível adicionar o post.');
    }
  };

  const handleUpdatePost = async (updatedPost: { id: string; title: string; content: string; author_id: string; featuredImageUrl?: string }) => {
    const webhookPayload = {
      type: 'blog',
      id: updatedPost.id,
      title: updatedPost.title,
      content: updatedPost.content,
      author: updatedPost.author_id,
      featured_image_url: updatedPost.featuredImageUrl,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_N8N_WEBHOOK_URL_BLOG}?id=${updatedPost.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar post');
      }

      fetchPosts();
      setIsEditModalOpen(false);
      setEditingPost(null);
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      setError('Não foi possível atualizar o post.');
    }
  };

  const handleEditClick = (post: Post) => {
    setEditingPost(post);
    setIsEditModalOpen(true);
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este post?')) return;

    try {
      setPosts(posts.filter(p => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir post');
    }
  };

  const handleTogglePublish = async (post: Post) => {
    try {
      const updatedPost = {
        ...post,
        isPublished: !post.isPublished,
        updatedAt: new Date().toISOString()
      };

      setPosts(posts.map(p => p.id === post.id ? updatedPost : p));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao alterar status do post');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Blog</h1>
      
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
      
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => setIsAddModalOpen(true)} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Adicionar Novo Post
        </button>
      </div>
      
      <div className="bg-white p-4 rounded shadow">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Carregando posts do WordPress...</p>
          </div>
        ) : posts.length === 0 && !error ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Nenhum post encontrado no WordPress</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Criação</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    Nenhum post encontrado
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {post.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        post.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.isPublished ? 'Publicado' : 'Rascunho'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleTogglePublish(post)} 
                        className={`mr-2 px-3 py-1 text-xs rounded ${
                          post.isPublished 
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        {post.isPublished ? 'Despublicar' : 'Publicar'}
                      </button>
                      <button 
                        onClick={() => handleEditClick(post)} 
                        className="bg-yellow-500 text-white px-3 py-1 text-xs rounded hover:bg-yellow-600 mr-2"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDeletePost(post.id)} 
                        className="bg-red-500 text-white px-3 py-1 text-xs rounded hover:bg-red-600"
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

      {isAddModalOpen && (
        <AddPostModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          onAdd={handleAddPost} 
          userId={user?.id || ''} 
        />
      )}

      {isEditModalOpen && (
        <EditPostModal 
          isOpen={isEditModalOpen} 
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingPost(null);
          }} 
          onUpdate={handleUpdatePost} 
          post={editingPost} 
          userId={user?.id || ''} 
        />
      )}
    </div>
  );
};

export default BlogManagement;