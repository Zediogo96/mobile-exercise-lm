import { DEFAULT_CACHE_TIME } from '@/constants/react-query';
import { FilterState, useFilterStore } from '@/services/zustand/hotelFilterStore';
import { useQuery } from '@tanstack/react-query';
import { fetchHotels } from '../api/hotels';

// Helper function to apply filters
const applyFilters = (
    hotels: any[],
    filters: Omit<
        FilterState,
        keyof {
            setPriceRange: any;
            setStarRating: any;
            setMinUserRating: any;
            setSelectedCity: any;
            setSearchQuery: any;
            resetFilters: any;
        }
    >
) => {
    return hotels.filter((hotel) => {
        const matchesPrice = hotel.price >= filters.priceRange.min && hotel.price <= filters.priceRange.max;
        const matchesStars = filters.starRating.length === 0 || filters.starRating.includes(hotel.stars);
        const matchesRating = hotel.userRating >= filters.minUserRating;
        const matchesCity = !filters.selectedCity || hotel.location.city === filters.selectedCity;
        const matchesSearch =
            filters.searchQuery === '' || hotel.name.toLowerCase().includes(filters.searchQuery.toLowerCase());

        return matchesPrice && matchesStars && matchesRating && matchesCity && matchesSearch;
    });
};

export const useHotels = () => {
    return useQuery({
        queryKey: ['hotels'],
        queryFn: fetchHotels,
        staleTime: DEFAULT_CACHE_TIME,
        select: (hotels) => {
            const filters = useFilterStore.getState();
            return applyFilters(hotels, filters);
        },
    });
};

export const useMostPopularHotels = () => {
    return useQuery({
        queryKey: ['hotels', 'hottest'],
        queryFn: fetchHotels,
        staleTime: DEFAULT_CACHE_TIME,
        select: (hotels) => hotels.sort((a, b) => b.userRating - a.userRating).slice(0, 5),
    });
};

// get hotel by id from cache
export const useHotelById = (id: string) => {
    return useQuery({
        queryKey: ['hotels', id],
        queryFn: fetchHotels,
        staleTime: DEFAULT_CACHE_TIME,
        select: (hotels) => hotels.find((hotel) => hotel.id.toString() === id),
    });
};
