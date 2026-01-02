import { Heart } from "lucide-react";
import { useState } from "react";

type CardProps = {
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

const Card = ({
  title,
  publisher,
  platform,
  region,
  originalPrice,
  discount,
  currentPrice,
  cashback,
  favorites,
  image,
}: CardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="bg-gradient-to-b from-indigo-900/40 to-purple-900/50 rounded-lg overflow-hidden border border-indigo-700/40 hover:border-purple-500/60 transition-all duration-300 hover:transform hover:scale-[1.02]">
      <div className="relative h-72 overflow-hidden group">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Cashback Badge */}
        <div className="absolute top-3 left-3 bg-emerald-400 text-black px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 shadow-lg">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
          </svg>
          CASHBACK
        </div>

        {/* Platform Badge */}
        <div className="absolute bottom-3 left-3 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded text-xs font-semibold">
          {publisher}
        </div>
      </div>

      <div className="p-4">
        {/* Title */}
        <h3 className="text-white font-semibold text-base mb-1 line-clamp-2 min-h-[48px]">
          {title} ({platform}) {region}
        </h3>

        {/* Region Badge */}
        <div className="mb-3">
          <span
            className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
              region === "GLOBAL"
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-blue-500/20 text-blue-400"
            }`}
          >
            {region}
          </span>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-gray-400 text-sm line-through">
            From €{originalPrice.toFixed(2)}
          </span>
          <span className="bg-emerald-500 text-black px-2 py-0.5 rounded text-xs font-bold">
            -{discount}%
          </span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-white text-2xl font-bold">
            €{currentPrice.toFixed(2)}
          </span>
          <svg
            className="w-4 h-4 text-gray-400 cursor-help"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path
              d="M12 16v-4M12 8h.01"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Cashback */}
        <div className="text-emerald-400 text-sm font-semibold mb-4">
          Cashback: €{cashback.toFixed(2)}
        </div>

        {/* Favorites */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <Heart
            className="w-5 h-5"
            fill={isFavorited ? "currentColor" : "none"}
          />
          <span className="text-sm">{favorites + (isFavorited ? 1 : 0)}</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
