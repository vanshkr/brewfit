import { useState, useCallback } from 'react';
import { useLocationStore } from '@/features/location/store';
import { savedAddresses, searchSuggestions } from '../data/mock-locations';
import type { Address } from '../types';

export function useLocation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [detecting, setDetecting] = useState(false);
  const { setLocation } = useLocationStore();

  const filteredSuggestions = searchQuery.length > 1
    ? searchSuggestions.filter((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const selectAddress = useCallback((address: Address) => {
    setLocation({
      id: address.id,
      label: address.label,
      lat: address.lat,
      lng: address.lng,
    });
  }, [setLocation]);

  const detectCurrentLocation = useCallback(() => {
    setDetecting(true);
    // Simulate GPS detection
    setTimeout(() => {
      setLocation({
        id: 'current',
        label: 'Current Location',
        lat: 28.4595,
        lng: 77.0266,
      });
      setDetecting(false);
    }, 1500);
  }, [setLocation]);

  return {
    searchQuery,
    setSearchQuery,
    filteredSuggestions,
    savedAddresses,
    detecting,
    selectAddress,
    detectCurrentLocation,
  };
}
