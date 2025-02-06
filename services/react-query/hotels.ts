import { DEFAULT_CACHE_TIME } from '@/constants/react-query';
import { useFilterStore } from '@/services/zustand/hotelFilterStore';
import { SortOption } from '@/types/filter.types';
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
        queryFn: () => fetchHotels({ shouldFakeLoadingTime: true, fakeLoadingTime: 5000 }),
        staleTime: DEFAULT_CACHE_TIME,
        select: (hotels) => hotels.sort((a, b) => b.userRating - a.userRating).slice(0, 5),
    });
};

// get hotel by id from cache
export const useHotelById = (id: string) => {
    return useQuery({
        queryKey: ['hotels', id],
        queryFn: () => fetchHotels(),
        staleTime: DEFAULT_CACHE_TIME,
        select: (hotels) => hotels.find((hotel) => hotel.id.toString() === id),
    });
};

export const useQuicksearchHotels = () => {
    return useQuery({
        queryKey: ['hotels'],
        queryFn: () => fetchHotels(),
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
        queryFn: () => fetchHotels({ shouldFakeLoadingTime: true, fakeLoadingTime: 1000 }),
        staleTime: DEFAULT_CACHE_TIME,
        select: (hotels) => {
            // First apply filters
            let filteredHotels = hotels.filter((hotel) => {
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

                // Selected city check
                if (selectedCity && hotel.location.city.toLowerCase() !== selectedCity.toLowerCase()) {
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

            // Then apply sorting
            const { sortOption } = filters;

            switch (sortOption) {
                case SortOption.PRICE_LOW_TO_HIGH:
                    return [...filteredHotels].sort((a, b) => a.price - b.price);

                case SortOption.PRICE_HIGH_TO_LOW:
                    return [...filteredHotels].sort((a, b) => b.price - a.price);

                case SortOption.STARS_LOW_TO_HIGH:
                    return [...filteredHotels].sort((a, b) => a.stars - b.stars);

                case SortOption.STARS_HIGH_TO_LOW:
                    return [...filteredHotels].sort((a, b) => b.stars - a.stars);

                case SortOption.RECOMMENDED:
                default:
                    // For recommended, we'll sort by a combination of rating and price
                    return [...filteredHotels].sort((a, b) => {
                        // Create a score based on stars and normalized price
                        const getScore = (hotel: Hotel) => {
                            const maxPrice = Math.max(...filteredHotels.map((h) => h.price));
                            const normalizedPrice = 1 - hotel.price / maxPrice; // Higher score for lower price
                            const starScore = hotel.stars / 5; // Normalize stars to 0-1
                            const userRatingScore = hotel.userRating || 0; // Already 0-1

                            // Weight factors (adjust these based on your preference)
                            return starScore * 0.4 + normalizedPrice * 0.3 + userRatingScore * 0.3;
                        };

                        return getScore(b) - getScore(a); // Higher score first
                    });
            }
        },
    });
};
