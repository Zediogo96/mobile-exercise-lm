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
