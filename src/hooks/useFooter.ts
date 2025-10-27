import { useState, useEffect } from 'react';

interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

interface ContactInfo {
  title: string;
  address: string[];
  phone: string;
}

interface NavigationLink {
  label: string;
  href: string;
}

interface CopyrightInfo {
  text: string;
  developer: {
    text: string;
    href: string;
  };
}

interface FooterContent {
  logoSrc: string;
  logoAlt: string;
  socialLinks: SocialLink[];
  contactInfo: ContactInfo;
  navigationLinks: NavigationLink[];
  copyright: CopyrightInfo;
}

const useFooter = () => {
  const [content, setContent] = useState<FooterContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        setContent({
          logoSrc: '/logo clinica.svg',
          logoAlt: 'Logo Clínica Nazaré Santos',
          socialLinks: [
            { label: 'Instagram', href: '#', icon: 'InstagramIcon' },
            { label: 'YouTube', href: '#', icon: 'YouTubeIcon' },
          ],
          contactInfo: {
            title: 'Entre em contato',
            address: ['R. Barbosa de Freitas, 1415', 'loja C - Aldeota'],
            phone: 'Telefone: (85) 99620-9515',
          },
          navigationLinks: [
            { label: 'Home', href: '#' },
            { label: 'Quem é Nazaré Santos', href: '#' },
            { label: 'Metodologia', href: '#' },
            { label: 'Blog', href: '#' },
          ],
          copyright: {
            text: '© 2025 Clínica Nazaré Santos. Todos os direitos reservados.',
            developer: {
              text: 'Desenvolvido por',
              href: '#',
            },
          },
        });
      } catch (err) {
        setError('Failed to load footer content.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, loading, error };
};

export default useFooter;