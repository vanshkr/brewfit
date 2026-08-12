import { useNavigate } from 'react-router';

interface CategoryHeaderProps {
  title: string;
  itemCount: number;
}

export function CategoryHeader({ title, itemCount }: CategoryHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 py-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="Go back"
      >
        <span className="text-sm">←</span>
      </button>
      <div className="flex-1">
        <h1 className="text-lg font-bold text-gray-800">{title}</h1>
        <p className="text-xs text-gray-500">{itemCount} items available</p>
      </div>
    </div>
  );
}
