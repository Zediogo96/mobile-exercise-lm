import { useHotelById } from '@/services/react-query/hotels';

// * Icons
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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

    const renderRatingStars = (count = 5) => {
        const totalStars = 5; // Total number of stars
        const filledStars = count; // Number of filled stars
        const emptyStars = totalStars - filledStars; // Number of empty stars

        return (
            <>
                {/* Render filled stars */}
                {[...Array(filledStars)].map((_, i) => (
                    <AntDesign key={i} name="star" size={16} color="#FFD700" />
                ))}

                {/* Render empty stars */}
                {[...Array(emptyStars)].map((_, i) => (
                    <AntDesign key={i + filledStars} name="staro" size={16} color="gray" />
                ))}
            </>
        );
    };

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
                    <View style={styles.stars}>{renderRatingStars(hotel.stars)}</View>
                </View>

                <Text style={styles.userRating}>User Rating: {hotel.userRating}/10</Text>

                <View style={styles.locationContainer}>
                    <FontAwesome name="map-marker" size={16} color="#666" />
                    <Text style={styles.address}>{hotel.location.address}</Text>
                    <Text style={styles.city}> - {hotel.location.city}</Text>
                </View>

                <View style={styles.timingsContainer}>
                    <Text style={styles.sectionTitle}>Check-in/Check-out</Text>
                    <Text>
                        Check-in: {hotel.checkIn.from} - {hotel.checkIn.to}
                    </Text>
                    <Text>
                        Check-out: {hotel.checkOut.from} - {hotel.checkOut.to}
                    </Text>
                </View>

                <View style={styles.contactContainer}>
                    <Text style={styles.sectionTitle}>Contact</Text>
                    <Text>Email: {hotel.contact.email}</Text>
                    <Text>Phone: {hotel.contact.phoneNumber}</Text>
                </View>

                <View style={styles.priceContainer}>
                    <Text style={styles.price}>
                        {hotel.currency} {hotel.price}
                    </Text>
                    <Text style={styles.perNight}>per night</Text>
                </View>
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
        height: Dimensions.get('window').height * 0.3,
    },
    galleryImage: {
        width: width,
        height: '100%',
    },
    detailsContainer: {
        padding: 16,
    },
    hotelName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    stars: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    userRating: {
        fontSize: 16,
        color: '#666',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
    },
    address: {
        fontSize: 16,

        color: '#666',
    },
    city: {
        fontSize: 16,
        color: '#666',
    },
    timingsContainer: {
        marginBottom: 16,
    },
    contactContainer: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    priceContainer: {
        alignItems: 'center',
        marginTop: 16,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E7D32',
    },
    perNight: {
        color: '#666',
    },
});

export default Details;
