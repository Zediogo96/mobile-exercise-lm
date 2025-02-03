import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface FilterState {
    // Filter parameters
    priceRange: { min: number; max: number };
    starRating: number[];
    minUserRating: number;
    selectedCity: string | null;
    searchQuery: string;

    // Actions
    setPriceRange: (min: number, max: number) => void;
    setStarRating: (ratings: number[]) => void;
    setMinUserRating: (rating: number) => void;
    setSelectedCity: (city: string | null) => void;
    setSearchQuery: (query: string) => void;
    resetFilters: () => void;
}

const defaultFilters = {
    priceRange: { min: 0, max: 1000 },
    starRating: [],
    minUserRating: 0,
    selectedCity: null,
    searchQuery: '',
};

const filters = { ...defaultFilters };

export const useFilterStore = create<FilterState>()(
    devtools((set) => ({
        // Initial state
        ...filters,

        // Actions
        setPriceRange: (min: number, max: number) => set({ priceRange: { min, max } }, false, 'setPriceRange'),

        setStarRating: (ratings: number[]) => set({ starRating: ratings }, false, 'setStarRating'),

        setMinUserRating: (rating: number) => set({ minUserRating: rating }, false, 'setMinUserRating'),

        setSelectedCity: (city: string | null) => set({ selectedCity: city }, false, 'setSelectedCity'),

        setSearchQuery: (query: string) => set({ searchQuery: query }, false, 'setSearchQuery'),

        resetFilters: () => set(defaultFilters, false, 'resetFilters'),
    }))
);
