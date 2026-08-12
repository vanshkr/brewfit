import { cn } from '@/shared/utils/cn';
import type { AddOn } from '@/shared/types';

interface AddOnsListProps {
  addOns: AddOn[];
  selectedAddOns: AddOn[];
  onToggle: (addOn: AddOn) => void;
}

export function AddOnsList({ addOns, selectedAddOns, onToggle }: AddOnsListProps) {
  const isSelected = (addOn: AddOn) =>
    selectedAddOns.some((a) => a.id === addOn.id);

  if (addOns.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-800">
        Add-ons
        <span className="text-xs font-normal text-gray-500 ml-1">(optional)</span>
      </h3>
      <div className="space-y-2">
        {addOns.map((addOn) => {
          const selected = isSelected(addOn);
          return (
            <button
              key={addOn.id}
              onClick={() => onToggle(addOn)}
              className={cn(
                'w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all text-left',
                selected
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-100 bg-white hover:border-green-200'
              )}
              aria-pressed={selected}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all',
                    selected
                      ? 'bg-green-600 border-green-600'
                      : 'border-gray-300'
                  )}
                >
                  {selected && (
                    <span className="text-white text-xs font-bold">✓</span>
                  )}
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-800">
                    {addOn.name}
                  </span>
                  {addOn.calories !== undefined && (
                    <span className="text-[10px] text-gray-500 ml-2">
                      +{addOn.calories} kcal
                    </span>
                  )}
                </div>
              </div>
              <span className="text-sm font-semibold text-green-600">
                +₹{addOn.price}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
