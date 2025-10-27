import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Post {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  author: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    author?: Array<{
      name: string;
    }>;
  };
}

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(`https://cms.nazaresantosestetica.com.br/wp-json/wp/v2/posts/${id}?_embed`, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Post não encontrado');
        }
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const data: Post = await response.json();
      setPost(data);
    } catch (err) {
      console.error('Erro ao carregar post:', err);
      
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Tempo limite excedido. Verifique sua conexão com a internet.');
        } else if (err.message.includes('Failed to fetch')) {
          setError('Não foi possível conectar ao servidor. Verifique sua conexão com a internet.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Erro desconhecido ao carregar o post.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-32">
          <div className="text-center max-w-md mx-auto">
            <div className="text-red-600 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ops! Algo deu errado</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-y-4">
              <button
                onClick={fetchPost}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Tentar novamente
              </button>
              <Link
                to="/blog"
                className="block text-primary hover:text-primary/80 underline"
              >
                Voltar ao blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-32">
          <div className="text-center">
            <p className="text-gray-600">Post não encontrado.</p>
            <Link
              to="/blog"
              className="inline-block mt-4 text-primary hover:text-primary/80 underline"
            >
              Voltar ao blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-8">
        <nav className="text-sm text-gray-600">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-primary">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{post.title.rendered}</span>
        </nav>
      </div>

      {/* Post Content */}
      <article className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          {post._embedded?.['wp:featuredmedia']?.[0] && (
            <div className="mb-8 rounded-2xl overflow-hidden">
              <img
                src={post._embedded['wp:featuredmedia'][0].source_url}
                alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
            </div>
          )}

          {/* Post Header */}
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 font-jomolhari">
              {post.title.rendered}
            </h1>
            <div className="flex items-center text-gray-600 text-sm">
              <time dateTime={post.date}>
                {formatDate(post.date)}
              </time>
              {post._embedded?.author?.[0] && (
                <>
                  <span className="mx-2">•</span>
                  <span>Por {post._embedded.author[0].name}</span>
                </>
              )}
            </div>
          </header>

          {/* Post Content */}
          <div 
            className="prose sm:prose-lg max-w-none text-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              to="/blog"
              className="inline-flex items-center text-primary hover:text-primary/80 font-semibold"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar ao blog
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPostDetail;