import { useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { SearchBar } from '@/shared/components/SearchBar';
import { CategoryPill } from '@/shared/components/CategoryPill';
import { CategoryHeader } from '../components/CategoryHeader';
import { SortFilter } from '../components/SortFilter';
import { ProductGrid } from '../components/ProductGrid';
import { ViewToggle } from '../components/ViewToggle';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '@/features/home/hooks/useCategories';
import type { SortOption } from '../components/SortFilter';
import type { Product } from '@/shared/types';

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case 'popular':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case 'price-low':
      return sorted.sort((a, b) => (a.sizes[0]?.price ?? 0) - (b.sizes[0]?.price ?? 0));
    case 'price-high':
      return sorted.sort((a, b) => (b.sizes[0]?.price ?? 0) - (a.sizes[0]?.price ?? 0));
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'protein':
      return sorted.sort((a, b) => b.nutrition.protein - a.nutrition.protein);
    default:
      return sorted;
  }
}

export function CategoryListingScreen() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [activeSort, setActiveSort] = useState<SortOption>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(categoryId ?? 'all');

  const { data: categories = [] } = useCategories();
  const { data: products = [], isLoading } = useProducts({
    categoryId: activeCategory === 'all' ? undefined : activeCategory,
    search: searchQuery || undefined,
  });

  const sortedProducts = useMemo(
    () => sortProducts(products, activeSort),
    [products, activeSort]
  );

  const currentCategory = categories.find((c) => c.id === activeCategory);
  const title = activeCategory === 'all' ? 'All Items' : currentCategory?.name ?? 'Category';

  return (
    <div className="min-h-screen bg-gray-50 pb-24 overflow-y-auto flex-1 h-full">
      <div className="w-full px-4 pt-[env(safe-area-inset-top)]">
        {/* Header */}
        <CategoryHeader title={title} itemCount={sortedProducts.length} />

        {/* Search */}
        <div className="pb-3">
          <SearchBar
            placeholder={`Search in ${title}...`}
            onSearch={setSearchQuery}
          />
        </div>

        {/* Category Pills (horizontal scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-3">
          <CategoryPill
            icon="🍽️"
            name="All"
            isActive={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
          />
          {categories.map((cat) => (
            <CategoryPill
              key={cat.id}
              icon={cat.icon}
              name={cat.name}
              isActive={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </div>

        {/* Sort + View Toggle */}
        <div className="flex items-center justify-between pb-3">
          <SortFilter activeSort={activeSort} onSortChange={setActiveSort} />
          <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
        </div>

        {/* Product Grid/List */}
        <ProductGrid
          products={sortedProducts}
          isLoading={isLoading}
          viewMode={viewMode}
        />
      </div>
    </div>
  );
}
