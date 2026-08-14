import { useState, useEffect } from 'react';
import { SearchBar } from '@/shared/components/SearchBar';
import { BannerCarousel } from '../components/BannerCarousel';
import { CategoryGrid } from '../components/CategoryGrid';
import { PopularItems } from '../components/PopularItems';
import { HomeHeader } from '../components/HomeHeader';
import { SectionHeader } from '../components/SectionHeader';
import { useCategories } from '../hooks/useCategories';
import { useProducts } from '@/features/catalog/hooks/useProducts';
import { mockBanners } from '@/mocks';

export function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query by 300ms to prevent network/query thrashing (Rule 5.7)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: popularProducts = [], isLoading: productsLoading } = useProducts({
    popular: true,
  });
  const { data: searchResults = [], isLoading: searchLoading } = useProducts({
    search: debouncedQuery,
  });

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div
      className="flex-1 min-h-screen w-full overflow-y-auto bg-gray-50 pb-20"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div className="w-full px-4 pt-[calc(env(safe-area-inset-top)+1rem)">
        {/* Header */}
        <div className="pb-3">
          <HomeHeader />
        </div>

        {/* Search */}
        <div className="pb-4">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {/* Search Results Mode vs Default Catalog Sections */}
        {isSearching ? (
          <div className="space-y-3">
            <SectionHeader title={`Results for "${searchQuery}"`} />
            {!searchLoading && searchResults.length === 0 ? (
              <div className="py-12 text-center text-sm text-gray-500">
                No items found matching "{searchQuery}"
              </div>
            ) : (
              <PopularItems products={searchResults} isLoading={searchLoading} />
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Promotional Banners */}
            <BannerCarousel banners={mockBanners} />

            {/* Category Grid */}
            <div className="space-y-3">
              <SectionHeader title="Categories" />
              <CategoryGrid
                categories={categories}
                isLoading={categoriesLoading}
              />
            </div>

            {/* Popular Items */}
            <div className="space-y-3">
              <SectionHeader
                title="Popular Near You"
                actionPath="/category/all"
              />
              <PopularItems
                products={popularProducts}
                isLoading={productsLoading}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}