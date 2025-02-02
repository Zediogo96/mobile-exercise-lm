import { useQuery } from '@tanstack/react-query';
import { fetchHotels } from '../api/hotels';

export const useHotels = () => {
    return useQuery({
        queryKey: ['hotels'],
        queryFn: fetchHotels,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });
};
