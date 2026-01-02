import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Heart, ShoppingCart, User, X } from "lucide-react";
import Card from "./components/card";

type Item = {
  id: number;
  title: string;
  publisher: string;
  platform: string;
  region: string;
  originalPrice: number;
  discount: number;
  currentPrice: number;
  cashback: number;
  favorites: number;
  image: string;
};

const ListPage = () => {
  const [data, setData] = useState<Item[]>([]);
  const [filteredData, setFilteredData] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("http://localhost:3001/list")
      .then((res) => {
        const mapped = res.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          publisher: "EA",
          platform: "PC",
          region: item.region,
          originalPrice: item.original_price,
          discount: item.discount,
          currentPrice: item.current_price,
          cashback: item.cashback,
          favorites: item.favorites,
          image: item.image_url,
        }));

        setData(mapped);
        setFilteredData(mapped);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data");
        setIsLoading(false);
      });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length === 0) {
      setFilteredData(data);
    } else if (value.length >= 2) {
      const filtered = data.filter(
        (item) =>
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.publisher.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredData(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900">
      {/* Top Navigation Bar */}
      <div className="bg-purple-700/40 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-center gap-2 text-white text-sm">
            <span>← Games, Gift Cards, Top-Ups & More | Best Deals</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-purple-700/30 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-8 mb-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">e</span>
              </div>
              <span className="text-white text-2xl font-bold">eneba</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for games..."
                className="w-full px-4 py-3 pl-12 pr-12 bg-purple-600/60 border border-purple-400/40 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:border-purple-300 focus:bg-purple-600/80 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-purple-200"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-white hover:text-purple-200 transition-colors">
                <span className="text-sm">🇪🇺 English EU | EUR</span>
              </button>
              <button className="text-white hover:text-purple-200 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
              <button className="text-white hover:text-purple-200 transition-colors">
                <ShoppingCart className="w-6 h-6" />
              </button>
              <button className="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors">
                <User className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-white text-xl font-semibold mb-2">
            Results found:{" "}
            <span className="text-purple-300">{filteredData.length}</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-300 mt-4">Loading games...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-300 text-xl mb-4">
              No games found matching "{searchQuery}"
            </p>
            <button
              onClick={clearSearch}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-semibold"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredData.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-purple-900/40 backdrop-blur-sm border-t border-purple-500/20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-300 text-sm">
            © 2026 Game Store - Built with React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ListPage;
