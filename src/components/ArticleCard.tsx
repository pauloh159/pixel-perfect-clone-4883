import React from 'react';

interface ArticleCardProps {
  title: string;
  image: string;
  description: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ title, image, description }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg text-left overflow-hidden">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h3 className="text-h1-custom font-jomolhari text-primary mb-2">{title}</h3>
        <p className="text-foreground leading-snug mb-4">{description}</p>
        <a href="#" className="bg-[#a66642] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#8e5634] transition-colors">
          Saiba mais
        </a>
      </div>
    </div>
  );
};