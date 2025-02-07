import { Hotel } from '@/types/hotel.types';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

type LocationMapProps = {
    hotel: Hotel;
};

const LocationMap = ({ hotel }: LocationMapProps) => {
    const config = Platform.OS === 'android' ? { provider: PROVIDER_GOOGLE, key: '' } : {};

    return (
        <View style={s.mapContainer}>
            <MapView
                {...config}
                style={s.map}
                initialRegion={{
                    latitude: hotel.location?.latitude || 0,
                    longitude: hotel.location?.longitude || 0,
                    latitudeDelta: 0.009,
                    longitudeDelta: 0.009,
                }}
                scrollEnabled={false}
            >
                {hotel.location && (
                    <Marker
                        coordinate={{
                            latitude: hotel.location.latitude,
                            longitude: hotel.location.longitude,
                        }}
                        title={hotel.name}
                        subtitleVisibility="visible"
                        description={hotel.name}
                    />
                )}
            </MapView>
        </View>
    );
};

export default LocationMap;

const s = StyleSheet.create({
    mapContainer: {
        height: 250,
        marginTop: 20,
        borderRadius: 10,

        // shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    map: {
        flex: 1,
        borderRadius: 10,
    },
});
