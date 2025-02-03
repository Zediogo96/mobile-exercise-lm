import AmenitiesSection from '@/components/hotel-details/AmenitiesSection';
import CheckInOutDetails from '@/components/hotel-details/CheckInOutDetails';
import ContactsSection from '@/components/hotel-details/Contacts';
import Description from '@/components/hotel-details/Description';
import LocationText from '@/components/hotel-details/LocationText';
import PriceAndAction from '@/components/hotel-details/Price&Action';
import RatingStars from '@/components/hotel-details/RatingStars';
import { useHotelById } from '@/services/react-query/hotels';
import { useBookmarkStore } from '@/services/zustand/bookmarksStore';

// * Icons
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const Details = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const { id } = useLocalSearchParams();
    const { data: hotel } = useHotelById(id as string);

    const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();
    const bookmarked = hotel?.id ? isBookmarked(hotel.id.toString()) : false;
    console.log('🚀 ~ Details ~ bookmarked:', bookmarked);

    const handleBookmarkPress = useCallback(() => {
        if (!hotel) return;

        if (bookmarked) {
            removeBookmark(hotel.id.toString());
        } else {
            addBookmark(hotel);
        }
    }, [hotel, bookmarked]);

    const renderGalleryItem = ({ item }: { item: string }) => (
        <Image source={{ uri: item }} style={s.galleryImage} resizeMode="cover" />
    );

    const shouldAllowScroll = hotel?.gallery && hotel.gallery.length > 1;

    if (!hotel) return null;

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} style={s.container}>
                <FlatList
                    data={hotel.gallery}
                    keyExtractor={(item) => item}
                    scrollEnabled={shouldAllowScroll}
                    renderItem={renderGalleryItem}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    style={s.gallery}
                />

                <View style={[s.floatingContainer, { top: insets.top + 5 }]}>
                    <BlurView intensity={25} tint="light" style={s.iconButton}>
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons name="chevron-back" size={22} color="black" />
                        </TouchableOpacity>
                    </BlurView>

                    <BlurView intensity={50} tint="light" style={s.iconButton}>
                        <TouchableOpacity onPress={handleBookmarkPress}>
                            <Ionicons name={bookmarked ? 'bookmark' : 'bookmark-outline'} size={22} color="black" />
                        </TouchableOpacity>
                    </BlurView>
                </View>

                <View style={s.detailsContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={s.hotelName}>{hotel.name}</Text>
                        <RatingStars count={hotel.stars} />
                    </View>

                    <LocationText location={hotel.location} />

                    <AmenitiesSection />

                    <View style={{ height: 1, backgroundColor: '#E0E0E0', marginTop: 20 }} />

                    <Description />

                    <CheckInOutDetails checkIn={hotel.checkIn} checkOut={hotel.checkOut} />

                    <ContactsSection contact={hotel.contact} />

                    <View style={s.mapContainer}>
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

                <View style={{ height: 100 }} />
            </ScrollView>
            <PriceAndAction
                price={hotel.price}
                currency={hotel.currency}
                hotelId={hotel.id.toString()}
                bottomInset={insets.bottom}
            />
        </>
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
    mapContainer: {
        height: 250,
        marginTop: 20,
    },
    map: {
        flex: 1,
        borderRadius: 10,
    },

    // Floating Button Container
    floatingContainer: {
        position: 'absolute',
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    // Individual Floating Buttons
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        overflow: 'hidden',
    },
});

export default Details;
