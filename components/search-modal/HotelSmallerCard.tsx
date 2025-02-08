import BlurFallbackView from '@/components/Helper/BlurFallbackView';
import RatingStars from '@/components/hotel-details/RatingStars';
import AnimatedTouchableOpacity from '@/components/UI/animated-components/AnimatedTouchableOpacity';
import { CURRENCY_SYMBOL_MAP } from '@/constants/currencies';
import { Hotel } from '@/types/hotel.types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FadeInUp } from 'react-native-reanimated';

interface HotelCardProps {
    hotel: Hotel;
    index: number;
    onPress: (id: string) => void;
}

export const HotelSmallerCard = ({ hotel, index, onPress }: HotelCardProps) => {
    return (
        <AnimatedTouchableOpacity onPress={() => onPress(hotel.id.toString())} entering={FadeInUp.delay(index * 50)}>
            <BlurFallbackView intensity={5} tint="light" style={styles.card}>
                <View style={styles.centeredRow}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
                        {hotel.name}
                    </Text>
                    <RatingStars count={hotel.stars} />
                </View>

                <View style={styles.centeredRow}>
                    <Text numberOfLines={1} ellipsizeMode="clip" style={styles.address}>
                        {hotel.location.address}
                    </Text>
                    <Text>
                        {CURRENCY_SYMBOL_MAP[hotel.currency] || ''} {hotel.price}
                        <Text style={styles.perNight}> / night</Text>
                    </Text>
                </View>
            </BlurFallbackView>
        </AnimatedTouchableOpacity>
    );
};
const styles = StyleSheet.create({
    centeredRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 50,
    },
    card: {
        flex: 1,

        borderRadius: 12,
        padding: 16,
        marginHorizontal: 20,
        marginVertical: 8,
        rowGap: 15,

        backgroundColor: 'rgba(255, 255, 255, 0.8)',

        shadowColor: '#000',
        overflow: 'hidden',

        borderCurve: 'continuous',
    },
    perNight: {
        fontSize: 12,
        color: '#666',
    },

    address: {
        fontSize: 12,
        color: '#666',
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        width: '80%',
    },
});
