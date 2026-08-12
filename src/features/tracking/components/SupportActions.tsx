import { memo } from 'react';

interface SupportActionsProps {
  canCancel: boolean;
  onCancel: () => void;
  onSupport: () => void;
}

export const SupportActions = memo(function SupportActions({
  canCancel,
  onCancel,
  onSupport,
}: SupportActionsProps) {
  return (
    <div className="flex gap-3">
      {canCancel && (
        <button
          onClick={onCancel}
          className="flex-1 py-3 rounded-xl border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 active:scale-[0.98] transition-all"
          aria-label="Cancel order"
        >
          Cancel Order
        </button>
      )}
      <button
        onClick={onSupport}
        className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 active:scale-[0.98] transition-all"
        aria-label="Contact support"
      >
        Need Help?
      </button>
    </div>
  );
});
