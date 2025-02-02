type TimeRange = {
    from: string;
    to: string;
};

export interface Hotel {
    id: number;
    name: string;
    stars: number;
    userRating: number;
    price: number;
    currency: string;
    location: {
        address: string;
        city: string;
        latitude: number;
        longitude: number;
    };
    checkIn: TimeRange;
    checkOut: TimeRange;
    contact: {
        email: string;
        phoneNumber: string;
    };
    gallery: string[];
}
