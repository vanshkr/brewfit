import { MessageSquare, ToggleLeft, ToggleRight } from 'lucide-react';

interface DeliveryInstructionsProps {
  instructions: string;
  contactless: boolean;
  onInstructionsChange: (value: string) => void;
  onToggleContactless: () => void;
}

export function DeliveryInstructions({
  instructions,
  contactless,
  onInstructionsChange,
  onToggleContactless,
}: DeliveryInstructionsProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
        <MessageSquare className="w-4 h-4 text-emerald-500" />
        Delivery instructions
      </label>

      <textarea
        value={instructions}
        onChange={(e) => onInstructionsChange(e.target.value)}
        placeholder="E.g., Ring the bell twice, leave at door..."
        maxLength={150}
        rows={2}
        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl resize-none outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors placeholder:text-gray-400"
      />
      <div className="flex justify-between items-center text-xs text-gray-400">
        <span>{instructions.length}/150</span>
      </div>

      {/* Contactless toggle */}
      <button
        onClick={onToggleContactless}
        className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
      >
        <div>
          <p className="text-sm font-medium text-gray-900">Contactless delivery</p>
          <p className="text-xs text-gray-500">Leave order at the door</p>
        </div>
        {contactless ? (
          <ToggleRight className="w-8 h-8 text-emerald-500" />
        ) : (
          <ToggleLeft className="w-8 h-8 text-gray-300" />
        )}
      </button>
    </div>
  );
}
