import HotelGallery from '@/components/filter-results/HotelImageGallery';
import RatingStars from '@/components/hotel-details/RatingStars';
import BookmarkButton from '@/components/UI/BookmarkButton';
import Colors from '@/constants/Colors';
import { CURRENCY_SYMBOL_MAP } from '@/constants/currencies';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import { useBookmarkStore } from '@/services/zustand/bookmarksStore';
import { Hotel } from '@/types/hotel.types';
import { Entypo } from '@expo/vector-icons';

import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const COLORS = {
    background: '#F5F5F5',
    cardBackground: '#FFFFFF',
    textDark: '#1A1A1A',
    textGrey: '#717171',
    border: '#E0E0E0',
    dotInactive: 'rgba(0, 0, 0, 0.2)',
    dotActive: '#000',
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.9;
const IMAGE_HEIGHT = 150;
const CARD_BORDER_RADIUS = 15;

const HotelCard = ({ hotel }: { hotel: Hotel }) => {
    const router = useRouter();

    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    const currencySymbol = CURRENCY_SYMBOL_MAP[hotel.currency || 'USD'];

    const { isBookmarked, addBookmark, removeBookmark } = useBookmarkStore();

    const bookmarked = isBookmarked(hotel.id.toString());

    const handleBookmarkPress = () => {
        if (bookmarked) {
            removeBookmark(hotel.id.toString());
        } else {
            addBookmark(hotel);
        }
    };

    const handlePress = () => {
        router.push(`/hotel-details/${hotel.id}`);
    };

    return (
        <Animated.View style={styles.hotelCard} key={hotel.id} entering={FadeIn}>
            <View style={styles.carouselContainer}>
                <Pressable onPress={handlePress} style={{ flex: 1 }}>
                    <HotelGallery gallery={hotel.gallery} hotelId={hotel.id.toString()} />
                </Pressable>
                <View style={{ position: 'absolute', top: 10, right: 10 }}>
                    <BookmarkButton bookmarked={bookmarked} handleBookmarkPress={handleBookmarkPress} />
                </View>
            </View>

            <View style={styles.informationContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.hotelName} numberOfLines={1}>
                        {hotel.name}
                    </Text>
                    <RatingStars count={hotel.stars} fontStyle={{ fontSize: 14 }} />
                </View>

                <View style={styles.detailsRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Entypo name="location-pin" size={16} color={colors.textSecondary} />
                        <Text style={styles.hotelLocation}>{hotel.location.city}</Text>
                    </View>

                    <Text style={styles.price}>
                        {currencySymbol} {hotel.price} <Text style={styles.perNightText}> / night</Text>
                    </Text>
                </View>
            </View>
        </Animated.View>
    );
};

export default HotelCard;

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        hotelCard: {
            backgroundColor: colors.cardBackground,
            width: CARD_WIDTH,
            borderRadius: CARD_BORDER_RADIUS,
            marginVertical: 8,
            boxShadow: '0px 1px 6px  rgba(104, 104, 104, 0.55)',
        },
        carouselContainer: {
            height: IMAGE_HEIGHT,
            width: '100%',
        },
        carouselImage: {
            width: CARD_WIDTH,
            height: IMAGE_HEIGHT,
            overflow: 'hidden',
            borderTopLeftRadius: CARD_BORDER_RADIUS,
            borderTopRightRadius: CARD_BORDER_RADIUS,
        },
        paginationContainer: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            paddingVertical: 5,
        },
        paginationDot: {
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: COLORS.dotActive,
            marginHorizontal: 4,
        },
        paginationDotInactive: {
            backgroundColor: COLORS.dotInactive,
        },
        informationContainer: {
            padding: 15,
            rowGap: 20,
        },
        headerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
        },
        detailsRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        locationContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
        },
        hotelName: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.textTitle,
            flex: 1,
            marginRight: 10,
        },
        hotelLocation: {
            fontSize: 14,
            color: colors.textSecondary,
        },
        price: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.textTitle,
        },
        perNightText: {
            fontSize: 12,
            fontWeight: 'normal',
            color: colors.textSecondary,
        },
    });
