import FastImageWrapper from '@/components/Helper/FastImageWrapper';
import RatingStars from '@/components/hotel-details/RatingStars';
import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import { Hotel } from '@/types/hotel.types';
import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type BookmarkCardProps = {
    hotel: Hotel;
};

const BookmarkCard = ({ hotel }: BookmarkCardProps) => {
    const router = useRouter();

    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    const handlePress = () => {
        router.push(`/hotel-details/${hotel.id}`);
    };

    return (
        <View style={styles.card}>
            <FastImageWrapper source={{ uri: hotel.gallery[0] }} style={styles.image} resizeMode="cover" />
            <View style={styles.details}>
                <Text style={styles.name} numberOfLines={1} ellipsizeMode="middle">
                    {hotel.name}
                </Text>
                <View style={styles.locationContainer}>
                    <View style={styles.cityContainer}>
                        <Entypo name="location-pin" size={16} color={colors.textSecondary} />
                        <Text style={styles.location}>{hotel.location?.city}</Text>
                        <RatingStars count={hotel.stars} />
                    </View>
                    <TouchableOpacity onPress={handlePress}>
                        <Entypo name="chevron-right" size={24} color={colors.textSecondary} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default BookmarkCard;

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        card: {
            height: '100%',
            flexDirection: 'row',
            padding: 12,
            backgroundColor: colors.bookmarkCardBackground,
        },
        image: {
            width: 75,
            height: 75,
            borderRadius: 15,
            marginRight: 12,
        },
        details: {
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'stretch',
            paddingVertical: 4,
        },
        name: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.textTitle,

            width: '100%',
        },
        locationContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        cityContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        location: {
            fontSize: 14,
            color: colors.textSecondary,
            marginLeft: 5,
            marginRight: 10,
        },
    });
