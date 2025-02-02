import { DEFAULT_CACHE_TIME } from '@/constants/react-query';
import { useQuery } from '@tanstack/react-query';
import { fetchHotels } from '../api/hotels';

export const useHotels = () => {
    return useQuery({
        queryKey: ['hotels'],
        queryFn: fetchHotels,
        staleTime: DEFAULT_CACHE_TIME,
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
