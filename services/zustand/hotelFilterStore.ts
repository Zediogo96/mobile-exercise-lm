import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface FilterState {
    // Filter parameters
    priceRange: { min: number; max: number };
    starRating: number[];
    userRating: number[];
    selectedCity: string | null;
    searchQuery: string;

    // Actions
    setPriceRange: (range: { min: number; max: number }) => void;
    setStarRating: (ratings: number[]) => void;
    setUserRating: (ratings: number[]) => void;
    setSelectedCity: (city: string | null) => void;
    setSearchQuery: (query: string) => void;
    resetFilters: () => void;
}

const defaultFilters = {
    priceRange: { min: 0, max: 1000 },
    starRating: [],
    userRating: [],
    selectedCity: null,
    searchQuery: '',
};

const filters = { ...defaultFilters };

export const useFilterStore = create<FilterState>()(
    devtools((set) => ({
        // Initial state
        ...filters,

        // Actions
        setPriceRange: (range: { min: number; max: number }) => set({ priceRange: { min: range.min, max: range.max } }),

        setStarRating: (ratings: number[]) => set({ starRating: ratings }, false, 'setStarRating'),

        setUserRating: (ratings: number[]) => set({ userRating: ratings }, false, 'setUserRating'),

        setSelectedCity: (city: string | null) => set({ selectedCity: city }, false, 'setSelectedCity'),

        setSearchQuery: (query: string) => set({ searchQuery: query }, false, 'setSearchQuery'),

        resetFilters: () => set(defaultFilters, false, 'resetFilters'),
    }))
);
