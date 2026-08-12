import { useNavigate } from 'react-router';

interface ProductHeroProps {
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  tags?: string[];
}

export function ProductHero({ name, rating, reviewCount, tags }: ProductHeroProps) {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Product Image */}
      <div className="w-full aspect-4/3 bg-linear-to-br from-green-50 to-green-100 rounded-b-3xl flex items-center justify-center">
        <span className="text-7xl">☕</span>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        aria-label="Go back"
      >
        <span className="text-sm">←</span>
      </button>

      {/* Rating Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
        <span className="text-xs">⭐</span>
        <span className="text-xs font-bold text-gray-800">{rating}</span>
        <span className="text-[10px] text-gray-500">({reviewCount})</span>
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-medium text-green-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
