import { useLocationStore } from '@/features/location/store';
import { DeliveryToggle } from '@/shared/components/DeliveryToggle';

export function HomeHeader() {
  const { selectedLocation } = useLocationStore();

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 font-medium">Delivering to</p>
        <button className="flex items-center gap-1 mt-0.5">
          <span className="text-sm font-semibold text-gray-800 truncate max-w-45">
            {selectedLocation?.label ?? 'Select Location'}
          </span>
          <span className="text-gray-400 text-xs">▼</span>
        </button>
      </div>
      <DeliveryToggle />
    </div>
  );
}
