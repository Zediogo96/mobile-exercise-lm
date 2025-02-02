import CheckInOutDetails from '@/components/hotel-details/CheckInOutDetails';
import Description from '@/components/hotel-details/Description';
import LocationText from '@/components/hotel-details/LocationText';
import RatingStars from '@/components/hotel-details/RatingStars';
import { CURRENCY_SYMBOL_MAP } from '@/constants/currencies';
import { useHotelById } from '@/services/react-query/hotels';

// * Icons
import { Link, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const Details = () => {
    const { id } = useLocalSearchParams();
    const { data: hotel } = useHotelById(id as string);

    const renderGalleryItem = ({ item }: { item: string }) => (
        <Image source={{ uri: item }} style={s.galleryImage} resizeMode="cover" />
    );

    const shouldAllowsScroll = hotel?.gallery && hotel.gallery.length > 1;

    const currencySymbol = CURRENCY_SYMBOL_MAP[hotel?.currency || 'USD'];

    if (!hotel) return null;

    return (
        <ScrollView style={s.container}>
            <FlatList
                data={hotel.gallery}
                keyExtractor={(item) => item}
                scrollEnabled={shouldAllowsScroll}
                renderItem={renderGalleryItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={s.gallery}
            />

            <View style={s.detailsContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={s.hotelName}>{hotel.name}</Text>
                    <RatingStars count={hotel.stars} />
                </View>

                <LocationText location={hotel.location} />

                <CheckInOutDetails checkIn={hotel.checkIn} checkOut={hotel.checkOut} />

                <Description />
            </View>

            <View
                style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 25, alignItems: 'flex-end' }}
            >
                {/* Left section */}
                <View>
                    <Text style={{ fontSize: 16, color: '#666', marginBottom: 10 }}>Price</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>
                        {currencySymbol} {hotel.price}
                        <Text style={{ fontSize: 12, fontWeight: 'normal', color: '#666' }}> / night</Text>
                    </Text>
                </View>

                {/* Right section */}
                <Link href="/modal">
                    <TouchableOpacity style={s.viewDealButton}>
                        <Text style={s.textButton}>Book now</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </ScrollView>
    );
};

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    gallery: {
        height: Dimensions.get('window').height * 0.35,
    },
    galleryImage: {
        width: width,
        height: '100%',
    },
    detailsContainer: {
        flex: 1,
        paddingHorizontal: 25,
        padding: 35,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
        borderCurve: 'continuous',
        backgroundColor: '#fff',
    },
    hotelName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    viewDealButton: {
        flex: 1,

        backgroundColor: '#000',

        paddingVertical: 12, // Add padding to top and bottom
        paddingHorizontal: 16, // Add padding to left and right

        borderRadius: 10,
    },

    textButton: {
        fontWeight: '500',
        color: '#fff',
        fontSize: 15, // Reduced font size
        textAlign: 'center', // Ensure text is centered if it wraps
    },
});

export default Details;
