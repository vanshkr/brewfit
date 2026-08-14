import { useNavigate } from 'react-router';
import { useLocationStore } from '@/features/location/store';

export function HomeHeader() {
  const { selectedLocation } = useLocationStore();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between gap-2">
      {/* Location Selector CTA */}
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-gray-400 font-medium">Delivering to</p>
        <button
          onClick={() => navigate('/location')}
          className="flex items-center gap-1 mt-0.5 group text-left"
          aria-label="Change location"
        >
          <span className="text-sm font-bold text-gray-800 truncate max-w-40 group-hover:text-green-600 transition-colors">
            {selectedLocation?.label ?? 'Select Location'}
          </span>
          <span className="text-gray-400 text-xs">▼</span>
        </button>
      </div>

      {/* Compact Mode Pill (Pickup Focused for MVP) */}
      {/* <div className="flex items-center bg-gray-100 p-1 rounded-full border border-gray-200 text-xs font-semibold">
        <span
          className="px-2.5 py-1 text-gray-400 cursor-not-allowed opacity-60 flex items-center gap-1"
          title="Delivery disabled in MVP"
        >
          🛵 <span className="text-[11px]">Delivery</span>
        </span>
        <span className="px-2.5 py-1 bg-green-600 text-white rounded-full shadow-sm flex items-center gap-1">
          🛍️ <span className="text-[11px]">Pickup</span>
        </span>
      </div> */}
      {/* Pickup-only Badge for MVP */}
      <div className="flex items-center">
        {/* Delivery mode disabled/hidden for MVP single-kiosk scope */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-semibold">
          🛍️ <span>Pickup</span>
        </span>
      </div>
    </div>
  );
}