import { Hotel } from '@/types/hotel.types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type LocationMapProps = {
    hotel: Hotel;
};

const LocationMap = ({ hotel }: LocationMapProps) => {
    return (
        <View style={s.mapContainer}>
            <View style={s.mapWrapper}>
                <MapView
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
        </View>
    );
};

export default LocationMap;

const s = StyleSheet.create({
    mapContainer: {
        height: 250,
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden', // Ensure content is clipped

        boxShadow: '0px 1px 2px 1px rgba(0, 0, 0, 0.15)',
    },
    mapWrapper: {
        flex: 1,
        borderRadius: 10,
        overflow: 'hidden', // Clip the map inside
    },
    map: {
        flex: 1,
    },
});
