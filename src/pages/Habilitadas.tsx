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

const stateMap: { [key: string]: string } = {
  'acre': 'AC', 'alagoas': 'AL', 'amapá': 'AP', 'amazonas': 'AM', 'bahia': 'BA', 'ceara': 'CE', 'ceará': 'CE',
  'distrito federal': 'DF', 'espírito santo': 'ES', 'espirito santo': 'ES', 'goiás': 'GO', 'goias': 'GO',
  'maranhão': 'MA', 'maranhao': 'MA', 'mato grosso': 'MT', 'mato grosso do sul': 'MS', 'minas gerais': 'MG',
  'pará': 'PA', 'para': 'PA', 'paraíba': 'PB', 'paraiba': 'PB', 'paraná': 'PR', 'parana': 'PR', 'pernambuco': 'PE',
  'piauí': 'PI', 'piaui': 'PI', 'rio de janeiro': 'RJ', 'rio grande do norte': 'RN', 'rio grande do sul': 'RS',
  'rondônia': 'RO', 'rondonia': 'RO', 'roraima': 'RR', 'santa catarina': 'SC', 'são paulo': 'SP', 'sao paulo': 'SP',
  'sergipe': 'SE', 'tocantins': 'TO', 'ac': 'AC', 'al': 'AL', 'ap': 'AP', 'am': 'AM', 'ba': 'BA', 'ce': 'CE',
  'df': 'DF', 'es': 'ES', 'go': 'GO', 'ma': 'MA', 'mt': 'MT', 'ms': 'MS', 'mg': 'MG', 'pa': 'PA', 'pb': 'PB',
  'pr': 'PR', 'pe': 'PE', 'pi': 'PI', 'rj': 'RJ', 'rn': 'RN', 'rs': 'RS', 'ro': 'RO', 'rr': 'RR', 'sc': 'SC',
  'sp': 'SP', 'se': 'SE', 'to': 'TO'
};

const getNormalizedStateAbbr = (stateName: string): string => {
  if (!stateName) return '';
  const cleanedName = stateName.trim().replace(/,/g, '').toLowerCase();
  return stateMap[cleanedName] || cleanedName.toUpperCase();
};

const hasPais = (obj: unknown): obj is { pais: string } => {
  return typeof (obj as { pais?: unknown }).pais === 'string';
};

const getStateValue = (h: any): string => h?.estado ?? h?.Estado ?? '';
const getWhatsappValue = (h: any): string => h?.whatsapp ?? h?.WhatsApp ?? '';

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
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
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
    if (viewMode === 'brazil') {
      const brazilHabilitadas = habilitadas.filter((h) => (hasPais(h) ? h.pais === 'Brasil' : true));
      if (selectedRegion) {
        return brazilHabilitadas.filter((h) => {
          const normalizedState = getNormalizedStateAbbr(getStateValue(h));
          return regions[selectedRegion as keyof typeof regions].includes(normalizedState);
        });
      }
      return brazilHabilitadas;
    }

    if (viewMode === 'world') {
      const worldHabilitadas = habilitadas.filter((h) => (hasPais(h) ? h.pais !== 'Brasil' : false));
      if (selectedCountry) {
        return worldHabilitadas.filter((h) => h.pais === selectedCountry);
      }
      return worldHabilitadas;
    }

    return [];
  };

  const filteredHabilitadas = getFilteredHabilitadas();

  const countries = [
    ...new Set(
      habilitadas
        .filter((h) => hasPais(h))
        .map((h) => h.pais)
        .filter((pais) => pais && pais !== 'Brasil')
    ),
  ];

  const getRegionCount = (region: string) => {
    const regionStates = regions[region as keyof typeof regions];
    return habilitadas.filter((h) => {
      const normalizedState = getNormalizedStateAbbr(getStateValue(h));
      return regionStates.includes(normalizedState);
    }).length;
  };

  const getCountryCount = (country: string) => {
    return habilitadas.filter(h => h.pais === country).length;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="font-jomolhari text-3xl sm:text-4xl md:text-5xl text-[hsl(var(--primary))] text-center mb-8">
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

            <h2 className="text-2xl font-bold text-center mb-6">
              {viewMode === 'brazil'
                ? selectedRegion
                  ? `Habilitadas - ${selectedRegion}`
                  : "Todas as Habilitadas do Brasil"
                : selectedCountry
                  ? `Habilitadas - ${selectedCountry}`
                  : "Habilitadas - Outros Países"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHabilitadas.map((habilitada) => (
                <div
                  key={habilitada.id}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                >
                  <h3 className="text-xl font-bold mb-2">{habilitada.name}</h3>
                  <p className="text-gray-700">Estado: {getStateValue(habilitada)}</p>
                  <p className="text-gray-700">E-mail: {habilitada.email}</p>
                  <p className="text-gray-700">WhatsApp: {getWhatsappValue(habilitada)}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}