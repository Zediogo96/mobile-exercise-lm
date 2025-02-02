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

export const useHottestHotels = () => {
    return useQuery({
        queryKey: ['hotels', 'hottest'],
        queryFn: fetchHotels,
        staleTime: DEFAULT_CACHE_TIME,
        select: (hotels) => hotels.sort((a, b) => b.userRating - a.userRating).slice(0, 5),
    });
};
