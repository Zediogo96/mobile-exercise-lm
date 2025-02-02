export type TimeRange = {
    from: string;
    to: string;
};

export type HotelLocation = {
    address: string;
    city: string;
    latitude: number;
    longitude: number;
};

export type HotelContact = {
    email: string;
    phoneNumber: string;
};

export interface Hotel {
    id: number;
    name: string;
    stars: number;
    userRating: number;
    price: number;
    currency: string;
    location: HotelLocation;
    checkIn: TimeRange;
    checkOut: TimeRange;
    contact: HotelContact;
    gallery: string[];
}
