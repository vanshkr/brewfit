import { useNavigate } from 'react-router';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  actionPath?: string;
}

export function SectionHeader({ title, actionLabel = 'See All', actionPath }: SectionHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-base font-bold text-gray-800">{title}</h2>
      {actionPath && (
        <button
          onClick={() => navigate(actionPath)}
          className="text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
        >
          {actionLabel} →
        </button>
      )}
    </div>
  );
}
