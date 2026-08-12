import { useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router';
import { NutritionBadge } from '@/shared/components/NutritionBadge';
import { Skeleton } from '@/shared/components/Skeleton';
import { useProduct } from '../hooks/useProduct';
import { useCartStore } from '@/features/cart/store';
import { ProductHero } from '../components/ProductHero';
import { SizeSelector } from '../components/SizeSelector';
import { AddOnsList } from '../components/AddOnsList';
import { QuantityPicker } from '../components/QuantityPicker';
import type { ProductSize, AddOn } from '@/shared/types';

export function ProductDetailScreen() {
  const { productId } = useParams<{ productId: string }>();
  const { data: product, isLoading } = useProduct(productId ?? '');
  const addItem = useCartStore((s) => s.addItem);

  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Set default size when product loads
  const activeSize = selectedSize ?? product?.sizes[0] ?? null;

  const totalPrice = useMemo(() => {
    if (!activeSize) return 0;
    const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
    return (activeSize.price + addOnsTotal) * quantity;
  }, [activeSize, selectedAddOns, quantity]);

  const handleToggleAddOn = useCallback((addOn: AddOn) => {
    setSelectedAddOns((prev) =>
      prev.some((a) => a.id === addOn.id)
        ? prev.filter((a) => a.id !== addOn.id)
        : [...prev, addOn]
    );
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!product || !activeSize) return;

    const cartItem = {
      id: `${product.id}-${activeSize.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      image: product.image,
      size: activeSize,
      addOns: selectedAddOns,
      quantity,
      unitPrice: activeSize.price + selectedAddOns.reduce((s, a) => s + a.price, 0),
      totalPrice,
    };

    addItem(cartItem);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  }, [product, activeSize, selectedAddOns, quantity, totalPrice, addItem]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 overflow-y-auto flex-1 h-full w-full">
        <div className="w-full">
          <Skeleton className="w-full aspect-4/3 rounded-none rounded-b-3xl" />
          <div className="px-4 pt-4 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center w-full h-full">
        <div className="text-center">
          <span className="text-4xl">😕</span>
          <p className="text-sm text-gray-600 mt-2">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32 overflow-y-auto flex-1 h-full w-full">
      <div className="w-full">
        {/* Hero Image */}
        <ProductHero
          name={product.name}
          image={product.image}
          rating={product.rating}
          reviewCount={product.reviewCount}
          tags={product.tags}
        />

        {/* Content */}
        <div className="px-4 pt-5 space-y-5">
          {/* Title & Description */}
          <div>
            <h1 className="text-xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Nutrition Badge */}
          <NutritionBadge nutrition={product.nutrition} variant="full" />

          {/* Size Selector */}
          {activeSize && (
            <SizeSelector
              sizes={product.sizes}
              selectedSize={activeSize}
              onSelect={setSelectedSize}
            />
          )}

          {/* Add-ons */}
          <AddOnsList
            addOns={product.addOns}
            selectedAddOns={selectedAddOns}
            onToggle={handleToggleAddOn}
          />

          {/* Quantity */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">Quantity</h3>
            <QuantityPicker
              quantity={quantity}
              onIncrease={() => setQuantity((q) => Math.min(q + 1, 10))}
              onDecrease={() => setQuantity((q) => Math.max(q - 1, 1))}
            />
          </div>
        </div>
      </div>

      {/* Add to Cart Button (Fixed Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 w-full p-4 bg-white border-t border-gray-100 z-50">
        <button
          onClick={handleAddToCart}
          disabled={addedFeedback}
          className="w-full flex items-center justify-between px-6 py-4 bg-green-600 text-white rounded-2xl font-semibold hover:bg-green-700 active:scale-[0.98] transition-all disabled:bg-green-400 shadow-lg shadow-green-600/20"
        >
          <span className="text-sm">
            {addedFeedback ? '✓ Added to Cart!' : 'Add to Cart'}
          </span>
          <span className="text-sm font-bold">₹{totalPrice}</span>
        </button>
      </div>
    </div>
  );
}
