import React from 'react';

interface EventHeroProps {
  onSearch: (query: string) => void;
}

export const EventHero: React.FC<EventHeroProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery);
  };

  return (
    <section className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16 sm:py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Nossos Eventos</h1>
        <p className="text-base sm:text-lg mb-8">Fique por dentro dos próximos eventos e workshops.</p>
        <div className="max-w-md mx-auto flex flex-col sm:flex-row">
          <input
            type="text"
            placeholder="Buscar eventos..."
            className="flex-grow p-3 rounded-md sm:rounded-l-md sm:rounded-r-none text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2 sm:mb-0"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearchClick();
              }
            }}
          />
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-md sm:rounded-r-md sm:rounded-l-none transition duration-300"
            onClick={handleSearchClick}
          >
            Buscar
          </button>
        </div>
      </div>
    </section>
  );
};