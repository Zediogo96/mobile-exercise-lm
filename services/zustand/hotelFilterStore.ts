// store/filterStore.ts
import { SortOption } from '@/types/filter.types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface FilterState {
    // Previous filter parameters
    priceRange: { min: number; max: number };
    starRating: number[];
    userRating: number[];
    selectedCity: string | null;
    searchQuery: string;
    sortOption: SortOption;

    // Actions
    setPriceRange: (range: { min: number; max: number }) => void;
    setStarRating: (ratings: number[]) => void;
    setUserRating: (ratings: number[]) => void;
    setSelectedCity: (city: string | null) => void;
    setSearchQuery: (query: string) => void;
    setSortOption: (option: SortOption) => void;
    resetFilters: () => void;

    // Computed properties
    hasFiltersApplied: () => boolean;
    hasSortApplied: () => boolean;
}

const defaultFilters = {
    priceRange: { min: 0, max: 1000 },
    starRating: [],
    userRating: [],
    selectedCity: null,
    searchQuery: '',
    sortOption: SortOption.RECOMMENDED,
};

export const useFilterStore = create<FilterState>()(
    devtools((set, get) => ({
        // Initial state
        ...defaultFilters,

        // Previous actions
        setPriceRange: (range: { min: number; max: number }) => set({ priceRange: { min: range.min, max: range.max } }),

        setStarRating: (ratings: number[]) => set({ starRating: ratings }, false, 'setStarRating'),

        setUserRating: (ratings: number[]) => set({ userRating: ratings }, false, 'setUserRating'),

        setSelectedCity: (city: string | null) => set({ selectedCity: city }, false, 'setSelectedCity'),

        setSearchQuery: (query: string) => set({ searchQuery: query }, false, 'setSearchQuery'),

        // New sort action
        setSortOption: (option: SortOption) => set({ sortOption: option }, false, 'setSortOption'),

        resetFilters: () => set(defaultFilters, false, 'resetFilters'),

        // Computed properties
        hasFiltersApplied: () => {
            const state = get();
            return (
                state.priceRange.min !== 0 ||
                state.priceRange.max !== 1000 ||
                state.starRating.length > 0 ||
                state.userRating.length > 0 ||
                state.selectedCity !== null ||
                state.searchQuery !== ''
            );
        },

        hasSortApplied: () => get().sortOption !== SortOption.RECOMMENDED,
    }))
);
