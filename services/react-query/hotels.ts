import { DEFAULT_CACHE_TIME } from '@/constants/react-query';
import { useFilterStore } from '@/services/zustand/hotelFilterStore';
import { Hotel } from '@/types/hotel.types';
import { useQuery } from '@tanstack/react-query';
import { fetchHotels } from '../api/hotels';

// Helper function to apply search query
const applyQuickFilters = (hotels: Hotel[], searchQuery: string) => {
    if (searchQuery === '') return [];

    return hotels.filter((hotel) => {
        return (
            hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hotel.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hotel.location.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
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

export const useQuicksearchHotels = () => {
    return useQuery({
        queryKey: ['hotels'],
        queryFn: fetchHotels,
        staleTime: DEFAULT_CACHE_TIME,
        select: (hotels) => {
            const filter = useFilterStore.getState();
            return applyQuickFilters(hotels, filter.searchQuery);
        },
    });
};

export const useHotelsByFilter = () => {
    const filters = useFilterStore();

    return useQuery({
        queryKey: ['hotels', 'search', filters],
        queryFn: fetchHotels,
        staleTime: DEFAULT_CACHE_TIME,
        select: (hotels) => {
            return hotels.filter((hotel) => {
                // Retrieve Filters
                const { priceRange, starRating, userRating, selectedCity, searchQuery } = filters;

                // Price range check
                if (hotel.price < priceRange.min || hotel.price > priceRange.max) {
                    return false;
                }

                // Star rating check
                if (starRating.length > 0 && !starRating.includes(hotel.stars)) {
                    return false;
                }

                // User rating check
                if (userRating.length > 0 && Math.min(...userRating) > hotel.userRating * 10) {
                    return false;
                }

                // Search query check (only if there's a query)
                if (searchQuery) {
                    const searchLower = searchQuery.toLowerCase();
                    return (
                        hotel.name.toLowerCase().includes(searchLower) ||
                        hotel.location.city.toLowerCase().includes(searchLower) ||
                        hotel.location.address.toLowerCase().includes(searchLower)
                    );
                }

                return true;
            });
        },
    });
};
