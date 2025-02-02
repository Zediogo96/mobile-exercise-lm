import { API_URL } from '@/constants/api-urls';
import axios from 'axios';

export const fetchHotels = async () => {
    const response = await axios.get(API_URL);
    return response.data; // Assuming the API returns JSON directly
};
