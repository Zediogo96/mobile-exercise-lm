import { HotelLocation } from '@/types/hotel.types';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type LocationTextProps = {
    location: HotelLocation;
};

const LocationText = ({ location }: LocationTextProps) => {
    return (
        <View style={s.locationContainer}>
            <FontAwesome name="map-marker" size={16} color="lightgray" />
            <Text style={s.address}>{location.address}</Text>
            <Text style={s.city}>- {location.city}</Text>
        </View>
    );
};

export default LocationText;

const s = StyleSheet.create({
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginVertical: 8,
        gap: 8,
    },
    address: {
        fontSize: 16,
        color: 'lightgray',
    },
    city: {
        fontSize: 16,
        color: 'lightgray',
    },
});
