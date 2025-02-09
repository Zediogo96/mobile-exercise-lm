import { API_URL } from '@/constants/api-urls';
import { Hotel } from '@/types/hotel.types';
import axios from 'axios';

export const fetchHotels = async ({
    shouldFakeLoadingTime = false,
    fakeLoadingTime = 2000,
}: {
    shouldFakeLoadingTime?: boolean;
    fakeLoadingTime?: number;
} = {}): Promise<Hotel[]> => {
    const response = await axios.get(API_URL);
    const data: Hotel[] = response.data;

    if (shouldFakeLoadingTime) {
        await new Promise((resolve) => setTimeout(resolve, fakeLoadingTime));
    }

    if (!data) {
        throw new Error('Failed to fetch hotels');
    }

    return data;
};
