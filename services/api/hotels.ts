import { API_URL } from '@/constants/api-urls';
import { Hotel } from '@/types/hotel.types';
import axios from 'axios';

export const fetchHotels = async (): Promise<Hotel[]> => {
    const response = await axios.get(API_URL);
    const data: Hotel[] = response.data;
    return data;
};
