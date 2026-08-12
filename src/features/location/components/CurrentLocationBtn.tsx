import { LocateFixed } from 'lucide-react';

interface CurrentLocationBtnProps {
  onLocate: () => void;
  loading?: boolean;
}

export function CurrentLocationBtn({ onLocate, loading = false }: CurrentLocationBtnProps) {
  return (
    <button
      onClick={onLocate}
      disabled={loading}
      className="flex items-center gap-3 w-full p-4 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 transition-colors"
    >
      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
        <LocateFixed className="w-5 h-5 text-white" />
      </div>
      <div className="text-left">
        <p className="text-sm font-semibold text-emerald-700">
          {loading ? 'Detecting...' : 'Use current location'}
        </p>
        <p className="text-xs text-emerald-600">Using GPS</p>
      </div>
    </button>
  );
}
