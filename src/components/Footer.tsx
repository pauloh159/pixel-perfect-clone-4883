import React from 'react';
import useFooter from '../hooks/useFooter';
import InstagramIcon from './icons/InstagramIcon';
import YouTubeIcon from './icons/YouTubeIcon';
import TelephoneIcon from './icons/TelephoneIcon';

export const Footer: React.FC = () => {
  const { content, loading, error } = useFooter();

  if (loading) {
    return <footer className="bg-footer-background py-12 px-4 sm:px-6 lg:px-8">Loading...</footer>;
  }

  if (error) {
    return <footer className="bg-footer-background py-12 px-4 sm:px-6 lg:px-8">Error loading footer.</footer>;
  }

  if (!content) {
    return null;
  }

  const { logoSrc, logoAlt, socialLinks, contactInfo, navigationLinks, copyright } = content;

  const iconComponents: { [key: string]: React.FC } = {
    InstagramIcon,
    YouTubeIcon,
  };

  return (
    <footer className="bg-footer-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 items-start text-center sm:text-left">
        {/* Logo and Social */}
        <div className="flex flex-col items-center sm:items-start">
          <img
            src={logoSrc}
            alt={logoAlt}
            className="w-40 sm:w-48 h-auto object-contain mb-4"
          />
          <div className="flex space-x-4">
            {socialLinks.map(link => {
              const Icon = iconComponents[link.icon];
              return (
                <a key={link.label} href={link.href} aria-label={link.label}>
                  {Icon && <Icon />}
                </a>
              );
            })}
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center sm:text-left">
          <h3 className="font-poppins text-lg sm:text-xl font-bold text-primary mb-4">{contactInfo.title}</h3>
          <div className="font-poppins text-sm sm:text-base text-primary">
            <p className="mb-4">
              {contactInfo.address.map((line, index) => (
                <React.Fragment key={index}>{line}<br /></React.Fragment>
              ))}
            </p>
            <p className="relative pl-6 sm:pl-8">
              <span className="absolute left-0 top-0">
                <TelephoneIcon />
              </span>
              {contactInfo.phone}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="text-center sm:text-left">
          <h3 className="font-poppins text-lg sm:text-xl font-bold text-primary mb-4">Navegação Rápida</h3>
          <ul className="font-poppins text-sm sm:text-base text-primary space-y-2">
            {navigationLinks.map(link => (
              <li key={link.label}><a href={link.href} className="hover:underline">{link.label}</a></li>
            ))}
          </ul>
        </div>

        {/* Empty div for spacing */}
        <div></div>
      </div>

      {/* Divider and Copyright */}
      <div className="container mx-auto mt-12 pt-8 border-t border-primary/50 text-center">
        <p className="font-poppins text-sm text-primary">
          {copyright.text}
        </p>
        <p className="font-poppins text-sm text-primary">
          {copyright.developer.text} <a href={copyright.developer.href} className="underline hover:text-accent">Phsprojet_</a>
        </p>
      </div>
    </footer>
  );
};
