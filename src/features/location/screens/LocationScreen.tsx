import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import  {useLocationStore} from '@/features/location/store';
import { LocationSearchBar } from '../components/LocationSearchBar';
import { CurrentLocationBtn } from '../components/CurrentLocationBtn';
import { SavedAddressList } from '../components/SavedAddressList';
import { useLocation } from '../hooks/useLocation';

export function LocationScreen() {
  const navigate = useNavigate();
  const currentLocation = useLocationStore((s) => s.selectedLocation);
  const {
    searchQuery,
    setSearchQuery,
    filteredSuggestions,
    savedAddresses,
    detecting,
    selectAddress,
    detectCurrentLocation,
  } = useLocation();

  const handleSelect = (address: Parameters<typeof selectAddress>[0]) => {
    selectAddress(address);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 overflow-y-auto flex-1 h-full w-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Select Location</h1>
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col gap-5">
        {/* Search */}
        <LocationSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />

        {/* Search Suggestions */}
        {filteredSuggestions.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  setSearchQuery(suggestion);
                  // In real app, geocode this and select
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Use Current Location */}
        <CurrentLocationBtn onLocate={detectCurrentLocation} loading={detecting} />

        {/* Saved Addresses */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Saved Addresses</h2>
          <SavedAddressList
            addresses={savedAddresses}
            selectedId={currentLocation?.id ?? null}
            onSelect={handleSelect}
          />
        </div>
      </div>
    </div>
  );
}
