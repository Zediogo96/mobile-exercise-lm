import { create } from 'zustand';

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

export const useFilterStore = create<FilterState>()((set) => ({
    // Initial state
    ...defaultFilters,

    // Actions
    setPriceRange: (min: number, max: number) => set({ priceRange: { min, max } }),

    setStarRating: (ratings: number[]) => set({ starRating: ratings }),

    setMinUserRating: (rating: number) => set({ minUserRating: rating }),

    setSelectedCity: (city: string | null) => set({ selectedCity: city }),

    setSearchQuery: (query: string) => set({ searchQuery: query }),

    resetFilters: () => set(defaultFilters),
}));
