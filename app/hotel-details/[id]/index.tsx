import CheckInOutDetails from '@/components/hotel-details/CheckInOutDetails';
import LocationText from '@/components/hotel-details/LocationText';
import RatingStars from '@/components/hotel-details/RatingStars';
import { useHotelById } from '@/services/react-query/hotels';

// * Icons
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

const Details = () => {
    const { id } = useLocalSearchParams();
    const { data: hotel } = useHotelById(id as string);

    const renderGalleryItem = ({ item }: { item: string }) => (
        <Image source={{ uri: item }} style={styles.galleryImage} resizeMode="cover" />
    );

    const shouldAllowsScroll = hotel?.gallery && hotel.gallery.length > 1;

    if (!hotel) return null;

    return (
        <ScrollView style={styles.container}>
            <FlatList
                data={hotel.gallery}
                keyExtractor={(item) => item}
                scrollEnabled={shouldAllowsScroll}
                renderItem={renderGalleryItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.gallery}
            />

            <View style={styles.detailsContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.hotelName}>{hotel.name}</Text>
                    <RatingStars count={hotel.stars} />
                </View>

                <LocationText location={hotel.location} />

                <CheckInOutDetails checkIn={hotel.checkIn} checkOut={hotel.checkOut} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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

    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
});

export default Details;
