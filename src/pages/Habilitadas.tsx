import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { supabase } from "../lib/supabase";
import { Habilitada } from "../lib/supabase";

const regions = {
  Norte: ["AC", "AP", "AM", "PA", "RO", "RR", "TO"],
  Nordeste: ["AL", "BA", "CE", "MA", "PB", "PE", "PI", "RN", "SE"],
  "Centro-Oeste": ["DF", "GO", "MT", "MS"],
  Sudeste: ["ES", "MG", "RJ", "SP"],
  Sul: ["PR", "RS", "SC"],
};

export function Habilitadas() {
  const [habilitadas, setHabilitadas] = useState<Habilitada[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"brazil" | "world">("brazil");

  useEffect(() => {
    const fetchHabilitadas = async () => {
      try {
        const { data, error } = await supabase
          .from("habilitadas")
          .select("*")
          .eq("is_active", true);

        if (error) {
          throw error;
        }

        setHabilitadas(data || []);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHabilitadas();
  }, []);

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region);
    setSelectedCountry(null);
  };

  const handleCountryClick = (countryName: string) => {
    setSelectedCountry(countryName);
    setSelectedRegion(null);
  };

  const getFilteredHabilitadas = () => {
    if (viewMode === 'brazil' && selectedRegion) {
      return habilitadas.filter(h => h.pais === 'Brasil' && regions[selectedRegion as keyof typeof regions].includes(h.estado));
    }
    if (viewMode === 'world' && selectedCountry) {
      return habilitadas.filter(h => h.pais === selectedCountry);
    }
    return habilitadas;
  };

  const filteredHabilitadas = getFilteredHabilitadas();

  // Obter países únicos (exceto Brasil)
  const countries = [...new Set(habilitadas.filter(h => h.pais !== 'Brasil').map(h => h.pais))];

  // Contar habilitadas por região
  const getRegionCount = (region: string) => {
    const regionStates = regions[region as keyof typeof regions];
    return habilitadas.filter(h => h.pais === 'Brasil' && regionStates.includes(h.estado)).length;
  };

  // Contar habilitadas por país
  const getCountryCount = (country: string) => {
    return habilitadas.filter(h => h.pais === country).length;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Habilitadas Método Nazaré Santos
        </h1>

        <div className="flex justify-center mb-8 space-x-2">
          <button 
            onClick={() => {setViewMode("brazil"); setSelectedCountry(null); setSelectedRegion(null);}} 
            className={`px-6 py-3 rounded-lg font-semibold ${viewMode === 'brazil' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Brasil
          </button>
          <button 
            onClick={() => {setViewMode("world"); setSelectedRegion(null); setSelectedCountry(null);}} 
            className={`px-6 py-3 rounded-lg font-semibold ${viewMode === 'world' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Outros Países
          </button>
        </div>

        {loading && <p className="text-center">Carregando...</p>}
        {error && <p className="text-center text-red-500">Erro: {error}</p>}

        {!loading && !error && (
          <>
            {viewMode === 'brazil' && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-center mb-6">Regiões do Brasil</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {Object.keys(regions).map((region) => (
                    <button
                      key={region}
                      onClick={() => handleRegionClick(region)}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        selectedRegion === region 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 bg-white hover:border-blue-300'
                      }`}
                    >
                      <h3 className="font-semibold text-lg">{region}</h3>
                      <p className="text-gray-600">{getRegionCount(region)} habilitadas</p>
                    </button>
                  ))}
                </div>
                
                <div className="text-center mt-6">
                  <button
                    onClick={() => setSelectedRegion(null)}
                    className={`px-6 py-3 rounded-lg font-semibold ${
                      !selectedRegion ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    Ver Todas as Regiões
                  </button>
                </div>
              </div>
            )}

            {viewMode === 'world' && countries.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-center mb-6">Outros Países</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {countries.map((country) => (
                    <button
                      key={country}
                      onClick={() => handleCountryClick(country)}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        selectedCountry === country 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 bg-white hover:border-blue-300'
                      }`}
                    >
                      <h3 className="font-semibold text-lg">{country}</h3>
                      <p className="text-gray-600">{getCountryCount(country)} habilitadas</p>
                    </button>
                  ))}
                </div>
                
                <div className="text-center mt-6">
                  <button
                    onClick={() => setSelectedCountry(null)}
                    className={`px-6 py-3 rounded-lg font-semibold ${
                      !selectedCountry ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    Ver Todos os Países
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                {selectedRegion
                  ? `Habilitadas - ${selectedRegion}`
                  : selectedCountry
                  ? `Habilitadas - ${selectedCountry}`
                  : viewMode === 'brazil' 
                  ? "Todas as Habilitadas do Brasil"
                  : "Todas as Habilitadas"}
              </h2>
              
              {filteredHabilitadas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredHabilitadas.map((habilitada) => (
                    <div key={habilitada.id} className="bg-white rounded-lg shadow-md p-6 border">
                      <h3 className="font-bold text-lg mb-2">{habilitada.name}</h3>
                      <p className="text-gray-600 mb-1">
                        <strong>Email:</strong> {habilitada.email}
                      </p>
                      <p className="text-gray-600 mb-1">
                        <strong>WhatsApp:</strong> {habilitada.whatsapp}
                      </p>
                      <p className="text-gray-600">
                        <strong>Localização:</strong> {habilitada.estado ? `${habilitada.estado}, ` : ''}{habilitada.pais}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  Nenhuma habilitada encontrada para esta seleção.
                </p>
              )}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}