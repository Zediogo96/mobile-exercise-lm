import FastImageWrapper from '@/components/Helper/FastImageWrapper';
import AmenitiesSection from '@/components/hotel-details/AmenitiesSection';
import CheckInOutDetails from '@/components/hotel-details/CheckInOutDetails';
import ContactsSection from '@/components/hotel-details/Contacts';
import Description from '@/components/hotel-details/Description';
import ImageCounter from '@/components/hotel-details/ImageCount';
import LocationMap from '@/components/hotel-details/LocationMap';
import LocationText from '@/components/hotel-details/LocationText';
import PriceAndAction from '@/components/hotel-details/Price&Action';
import RatingStars from '@/components/hotel-details/RatingStars';
import BookmarkButton from '@/components/UI/BookmarkButton';
import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';

import { useHotelById } from '@/services/react-query/hotels';
import { useBookmarkStore } from '@/services/zustand/bookmarksStore';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const IMAGE_HEIGHT = height * 0.35;
const IMAGE_WIDTH = width;

const AnimatedFastImageWrapper = Animated.createAnimatedComponent(FastImageWrapper);

const Details = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    const { id } = useLocalSearchParams();
    const { data: hotel } = useHotelById(id as string);

    const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();
    const bookmarked = hotel?.id ? isBookmarked(hotel.id.toString()) : false;

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleBookmarkPress = useCallback(() => {
        if (!hotel) return;

        if (bookmarked) {
            removeBookmark(hotel.id.toString());
        } else {
            addBookmark(hotel);
        }
    }, [hotel, bookmarked]);

    const scrollY = useRef(new Animated.Value(0)).current;

    const headerScale = scrollY.interpolate({
        inputRange: [-150, 0],
        outputRange: [1.5, 1],
        extrapolate: 'clamp',
    });

    const headerTranslateY = scrollY.interpolate({
        inputRange: [-150, 0],
        outputRange: [-70, 0],
        extrapolate: 'clamp',
    });

    if (!hotel) return null;

    // Determine if there's only one image
    const showListAndImageCounter = hotel.gallery.length > 1;

    return (
        <>
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                    useNativeDriver: true,
                })}
            >
                <View style={{ height: IMAGE_HEIGHT }}>
                    {showListAndImageCounter ? (
                        <Animated.FlatList
                            data={hotel.gallery}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            snapToInterval={width}
                            decelerationRate="fast"
                            bounces={false}
                            scrollEventThrottle={16}
                            style={{ transform: [{ scale: headerScale }, { translateY: headerTranslateY }] }}
                            onScroll={(event) => {
                                const totalWidth = event.nativeEvent.layoutMeasurement.width;
                                const xPosition = event.nativeEvent.contentOffset.x;
                                const newIndex = Math.round(xPosition / totalWidth);
                                if (newIndex !== currentIndex) {
                                    setCurrentIndex(newIndex);
                                }
                            }}
                            renderItem={({ item }) => (
                                <AnimatedFastImageWrapper
                                    source={{ uri: item }}
                                    style={[styles.headerImage]}
                                    resizeMode="cover"
                                />
                            )}
                        />
                    ) : (
                        <AnimatedFastImageWrapper
                            source={{ uri: hotel.gallery[0] }}
                            style={[
                                styles.headerImage,
                                { transform: [{ scale: headerScale }, { translateY: headerTranslateY }] },
                            ]}
                            resizeMode="cover"
                        />
                    )}
                    {showListAndImageCounter && (
                        <ImageCounter currentIndex={currentIndex} totalImages={hotel.gallery.length} />
                    )}
                </View>

                {/* Floating buttons overlay */}
                <View style={[styles.floatingContainer, { top: insets.top + 5 }]}>
                    <BlurView
                        experimentalBlurMethod="dimezisBlurView"
                        intensity={25}
                        tint="light"
                        style={styles.iconButton}
                    >
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons name="chevron-back" size={22} color="black" />
                        </TouchableOpacity>
                    </BlurView>

                    <BookmarkButton bookmarked={bookmarked} handleBookmarkPress={handleBookmarkPress} />
                </View>

                {/* The rest of your content */}
                <View style={styles.detailsContainer}>
                    <View style={styles.hotelNameContainer}>
                        <Text style={styles.hotelName}>{hotel.name}</Text>
                        <RatingStars count={hotel.stars} />
                    </View>

                    <LocationText location={hotel.location} />

                    <AmenitiesSection />

                    <View style={styles.divider} />

                    <Description hotel={hotel} />

                    <CheckInOutDetails checkIn={hotel.checkIn} checkOut={hotel.checkOut} />

                    <ContactsSection contact={hotel.contact} />

                    <LocationMap hotel={hotel} />
                </View>

                <View style={styles.bottomSpacer} />
            </Animated.ScrollView>
            <PriceAndAction
                price={hotel.price}
                currency={hotel.currency}
                hotelId={hotel.id.toString()}
                bottomInset={insets.bottom}
            />
        </>
    );
};

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        headerImage: {
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
        },
        detailsContainer: {
            flex: 1,
            paddingHorizontal: 25,
            padding: 35,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginTop: -30,
            borderCurve: 'continuous',
            backgroundColor: colors.cardBackground,
        },
        hotelNameContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        hotelName: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.textTitle,
        },

        floatingContainer: {
            position: 'absolute',
            left: 20,
            right: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        iconButton: {
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            overflow: 'hidden',
        },
        divider: {
            height: 1,
            backgroundColor: '#E0E0E0',
            marginTop: 20,
        },
        bottomSpacer: {
            height: 100,
            backgroundColor: colors.cardBackground,
        },
    });

export default Details;
