import { CURRENCY_SYMBOL_MAP } from '@/constants/currencies';
import { useMostPopularHotels } from '@/services/react-query/hotels';
import { Hotel } from '@/types/hotel.types';
import Entypo from '@expo/vector-icons/Entypo';
import { BlurView } from 'expo-blur';
import { Link } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

import DefaultImage1 from '@/assets/images/hotels/default-hotel-1.jpg';
import DefaultImage2 from '@/assets/images/hotels/default-hotel-2.jpg';
import DefaultImage3 from '@/assets/images/hotels/default-hotel-3.jpg';

import FastImageWrapper from '@/components/Helper/FastImageWrapper';
import RatingStars from '@/components/hotel-details/RatingStars';
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated';

const AnimatedFastImageWrapper = Animated.createAnimatedComponent(FastImageWrapper);

// Adjusted dimensions for smaller cards
const SLIDER_WIDTH = screenWidth;
const CARD_WIDTH = screenWidth * 0.45; // Reduced from 0.85 to 0.6
const CARD_HEIGHT = screenHeight * 0.25; // Reduced from 0.23 to 0.15

const MostPopularCarousel = () => {
    const carouselRef = useRef<Carousel<Hotel>>(null);

    const { data, isLoading, error } = useMostPopularHotels();

    const hotels = useMemo(() => data, [data]);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error instanceof Error) {
        return <Text>Error: {error.message}</Text>;
    }

    if (!hotels || hotels.length === 0) {
        return <Text>No Hotels Available</Text>;
    }

    const renderItem = ({ item }: { item: Hotel }) => <MostPopularCarouselItem {...item} />;

    return (
        <View style={{ marginHorizontal: 20 }}>
            <Animated.Text entering={FadeInLeft.delay(250)} style={s.title}>
                Most Popular
            </Animated.Text>
            <Carousel
                ref={carouselRef}
                data={hotels}
                renderItem={renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={CARD_WIDTH}
                itemHeight={CARD_HEIGHT}
                loop={true}
                inactiveSlideScale={0.9}
                inactiveSlideOpacity={0.3}
                activeSlideAlignment="start"
                enableSnap={true}
                firstItem={0}
            />
        </View>
    );
};

const MostPopularCarouselItem = (item: Hotel) => {
    const currencySymbol = CURRENCY_SYMBOL_MAP[item.currency] || '';
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => setIsLoading(false);

    const handleImageError = () => {
        setImageError(true);
        setIsLoading(false);
    };

    const imageSource = useMemo(() => {
        if (isLoading || imageError) {
            const fallbackImages = [DefaultImage1, DefaultImage2, DefaultImage3];
            const index = Math.floor(Math.random() * fallbackImages.length);
            return fallbackImages[index];
        }

        return { uri: item.gallery[0] };
    }, [isLoading, imageError, item.gallery]);

    return (
        <Link
            href={{
                pathname: '/hotel-details/[id]',
                params: { id: item.id },
            }}
        >
            <Animated.View entering={FadeIn.duration(500)} style={s.card}>
                <AnimatedFastImageWrapper
                    sharedTransitionTag="hotel-image"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={s.image}
                    source={imageSource}
                    resizeMode="cover"
                />
                <BlurView
                    intensity={40}
                    tint="dark"
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        padding: 5,
                        borderRadius: 4,
                        overflow: 'hidden',
                    }}
                >
                    <RatingStars count={item.stars} fontStyle={{ color: 'white', fontSize: 14 }} />
                </BlurView>

                <BlurView intensity={65} tint="light" style={s.blurInformationContainer}>
                    <View style={{ flex: 1, rowGap: 3 }}>
                        <Text style={[s.text, s.textMain]} numberOfLines={1}>
                            {item.name}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="location-pin" size={12} color="white" />
                            <Text style={s.text} numberOfLines={1}>
                                {item.location.city}
                            </Text>
                        </View>
                    </View>
                </BlurView>
            </Animated.View>
        </Link>
    );
};

const s = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    card: {
        borderRadius: 12, // Slightly reduced radius
        borderCurve: 'continuous',
        backgroundColor: '#fff',
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    image: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        position: 'absolute',
        top: 0,
    },
    blurInformationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        margin: 8,
        overflow: 'hidden',
        padding: 8,
        borderRadius: 4,
        borderCurve: 'continuous',
    },
    viewDealButton: {
        backgroundColor: '#000',
        padding: 8,
        borderRadius: 4,
    },
    text: {
        color: '#fff',
        fontSize: 11,
    },
    textMain: {
        fontWeight: 'bold',
    },
    textButton: {
        fontWeight: '500',
    },
});

export default MostPopularCarousel;
