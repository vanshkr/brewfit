import { useState, useCallback } from 'react';
import { SearchBar } from '@/shared/components/SearchBar';
import { BottomNav } from '@/shared/components/BottomNav';
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

  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: popularProducts = [], isLoading: productsLoading } = useProducts({
    popular: true,
  });
  const { data: searchResults = [], isLoading: searchLoading } = useProducts({
    search: searchQuery,
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const isSearching = searchQuery.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-28 flex-1 overflow-y-auto w-full p-4"       
      style={{ WebkitOverflowScrolling: 'touch' }}>
      <div className="w-full px-4 pt-[env(safe-area-inset-top)]">
        {/* Header */}
        <div className="pt-4 pb-3">
          <HomeHeader />
        </div>

        {/* Search */}
        <div className="pb-4">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Search Results Mode */}
        {isSearching ? (
          <div className="space-y-3">
            <SectionHeader title={`Results for "${searchQuery}"`} />
            <PopularItems products={searchResults} isLoading={searchLoading} />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Banners */}
            <BannerCarousel banners={mockBanners} />

            {/* Categories */}
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

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}