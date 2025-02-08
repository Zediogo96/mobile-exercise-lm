import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import { HotelLocation } from '@/types/hotel.types';
import { FontAwesome } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type LocationTextProps = {
    location: HotelLocation;
};

const LocationText = ({ location }: LocationTextProps) => {
    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);
    return (
        <View style={styles.locationContainer}>
            <FontAwesome name="map-marker" size={16} color={colors.textLightGray} />
            <Text style={styles.address}>{location.address}</Text>
            <Text style={styles.city}>- {location.city}</Text>
        </View>
    );
};

export default LocationText;

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        locationContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 5,
            marginVertical: 8,
            gap: 8,
        },
        address: {
            fontSize: 16,
            color: colors.textLightGray,
        },
        city: {
            fontSize: 16,
            color: colors.textLightGray,
        },
    });
