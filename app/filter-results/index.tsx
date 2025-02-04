import HotelGallery from '@/components/filter-results/HotelImageGallery';
import RatingStars from '@/components/hotel-details/RatingStars';
import { CURRENCY_SYMBOL_MAP } from '@/constants/currencies';
import { useHotelsByFilter } from '@/services/react-query/hotels';
import { Hotel } from '@/types/hotel.types';
import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
    const currencySymbol = CURRENCY_SYMBOL_MAP[hotel.currency || 'USD'];

    return (
        <View style={styles.hotelCard}>
            <View style={styles.carouselContainer}>
                <HotelGallery gallery={hotel.gallery} hotelId={hotel.id.toString()} />;
            </View>

            <View style={styles.informationContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.hotelName} numberOfLines={1}>
                        {hotel.name}
                    </Text>
                    <RatingStars count={hotel.stars} fontSize={14} />
                </View>

                <View style={styles.detailsRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Entypo name="location-pin" size={16} color={COLORS.textGrey} />
                        <Text style={styles.hotelLocation}>{hotel.location.city}</Text>
                    </View>

                    <Text style={styles.price}>
                        {' '}
                        {currencySymbol} {hotel.price} <Text style={styles.perNightText}> / night</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

const HotelList = () => {
    const insets = useSafeAreaInsets();
    const { data: hotels, isLoading, error } = useHotelsByFilter();

    if (isLoading) return <Text style={styles.statusText}>Loading...</Text>;
    if (error) return <Text style={styles.statusText}>Error loading hotels</Text>;
    if (!hotels?.length) return <Text style={styles.statusText}>No hotels found matching your criteria</Text>;

    return (
        <View style={styles.container}>
            <View style={[styles.topSection, { paddingTop: insets.top }]}>
                <Text style={styles.topSectionTitle}>Hotels</Text>
                <Text style={styles.topSectionQueryLength}>{hotels.length} results</Text>
            </View>

            <FlatList
                contentContainerStyle={styles.listContainer}
                data={hotels}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <HotelCard hotel={item} />}
            />
        </View>
    );
};

export default HotelList;

const styles = StyleSheet.create({
    // ... existing styles ...
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    listContainer: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    statusText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: COLORS.textDark,
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: COLORS.cardBackground,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    topSectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    topSectionQueryLength: {
        fontSize: 16,
        color: COLORS.textGrey,
    },
    hotelCard: {
        backgroundColor: COLORS.cardBackground,
        width: CARD_WIDTH,
        borderRadius: CARD_BORDER_RADIUS,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
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
        color: '#494848',
        flex: 1,
        marginRight: 10,
    },
    hotelLocation: {
        fontSize: 14,
        color: COLORS.textGrey,
    },
    price: { fontSize: 16, fontWeight: 'bold', color: '#494848' },
    perNightText: {
        fontSize: 12,
        fontWeight: 'normal',
        color: COLORS.textGrey,
    },
});
