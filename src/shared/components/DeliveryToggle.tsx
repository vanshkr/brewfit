import { cn } from '@/shared/utils/cn';
import { useLocationStore } from '@/features/location/store';
import type { DeliveryMode } from '@/shared/types';

export function DeliveryToggle() {
  const { deliveryMode, setDeliveryMode } = useLocationStore();

  const options: { mode: DeliveryMode; label: string; icon: string }[] = [
    { mode: 'delivery', label: 'Delivery', icon: '🚴' },
    { mode: 'pickup', label: 'Pickup', icon: '🏪' },
  ];

  return (
    <div className="flex items-center bg-gray-100 rounded-full p-1">
      {options.map(({ mode, label, icon }) => (
        <button
          key={mode}
          onClick={() => setDeliveryMode(mode)}
          className={cn(
            'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all',
            deliveryMode === mode
              ? 'bg-white text-green-600 shadow-sm'
              : 'text-gray-500'
          )}
          aria-pressed={deliveryMode === mode}
        >
          <span aria-hidden="true">{icon}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
