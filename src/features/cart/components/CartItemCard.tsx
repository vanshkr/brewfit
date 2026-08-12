import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import type { CartItem } from '../types';
import { getSizeLabel } from '../utils/cardUtils';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const deleteOpacity = useTransform(x, [-100, -50], [1, 0]);
  const deleteScale = useTransform(x, [-100, -50], [1, 0.8]);

  const itemTotal = (item.unitPrice + item?.addOns?.reduce((s, a) => s + a.price, 0)) * item.quantity;

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80) {
      setIsRemoving(true);
      setTimeout(() => onRemove(item.id), 200);
    }
  };

  return (
    <div ref={constraintsRef} className="relative overflow-hidden rounded-xl">
      {/* Delete background */}
      <motion.div
        className="absolute inset-y-0 right-0 flex items-center justify-center w-20 bg-red-500 rounded-xl"
        style={{ opacity: deleteOpacity, scale: deleteScale }}
      >
        <Trash2 className="w-5 h-5 text-white" />
      </motion.div>

      {/* Card */}
      <motion.div
        className={cn(
          'relative flex gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm',
          isRemoving && 'opacity-0 scale-95'
        )}
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        style={{ x }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        layout
      >
        {/* Image */}
        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h4>
          <p className="text-xs text-gray-500 mt-0.5">
            {getSizeLabel(item.size)}
            {item.addOns.length > 0 && ` • +${item.addOns.length} add-on${item.addOns.length > 1 ? 's' : ''}`}
          </p>
          {item.specialInstructions && (
            <p className="text-xs text-gray-400 mt-0.5 truncate italic">
              "{Array.isArray(item.specialInstructions) ? item.specialInstructions.join(', ') : item.specialInstructions}"
            </p>
          )}

          {/* Quantity & Price */}
          <div className="flex items-center justify-between mt-2">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-1 py-0.5">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm active:scale-90 transition-transform"
                aria-label={`Decrease quantity of ${item.name}`}
              >
                <Minus className="w-3 h-3 text-gray-600" />
              </button>
              <span className="text-sm font-semibold text-gray-900 w-5 text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                disabled={item.quantity >= 10}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-500 shadow-sm active:scale-90 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={`Increase quantity of ${item.name}`}
              >
                <Plus className="w-3 h-3 text-white" />
              </button>
            </div>

            {/* Price */}
            <span className="text-sm font-bold text-gray-900">₹{itemTotal}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
