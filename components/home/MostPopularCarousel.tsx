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
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

// Adjusted dimensions for smaller cards
const SLIDER_WIDTH = screenWidth;
const CARD_WIDTH = screenWidth * 0.6; // Reduced from 0.85 to 0.6
const CARD_HEIGHT = screenHeight * 0.15; // Reduced from 0.23 to 0.15

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
            <Animated.Text entering={FadeInDown.delay(250)} style={s.title}>
                Most Popular 🔥
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
                pathname: '/details/[id]',
                params: { id: item.id },
            }}
        >
            <Animated.View entering={FadeIn.delay(500)} style={s.card}>
                <Animated.Image
                    sharedTransitionTag="hotel-image"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={s.image}
                    source={imageSource}
                    resizeMode="cover"
                />
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

                    <Link href="/modal" style={s.viewDealButton}>
                        <Text style={[s.text, s.textButton]}>
                            {currencySymbol} {item.price} / night
                        </Text>
                    </Link>
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
        height: '40%', // Increased from 30% to accommodate content
        margin: 8, // Reduced margin
        overflow: 'hidden',
        padding: 8, // Reduced padding
        borderRadius: 4,
        borderCurve: 'continuous',
    },
    viewDealButton: {
        backgroundColor: '#000',
        padding: 8, // Reduced padding
        borderRadius: 4,
    },
    text: {
        color: '#fff',
        fontSize: 11, // Reduced font size
    },
    textMain: {
        fontWeight: 'bold',
    },
    textButton: {
        fontWeight: '500',
    },
});

export default MostPopularCarousel;
