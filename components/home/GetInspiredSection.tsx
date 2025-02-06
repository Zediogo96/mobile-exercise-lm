import React, { useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
    Extrapolate,
    FadeIn,
    FadeInLeft,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

import GetInspiredBeach from '@/assets/images/get-inspired/get-inspired-beach.jpg';
import GetInspiredCity from '@/assets/images/get-inspired/get-inspired-city.jpg';
import GetInspiredFestival from '@/assets/images/get-inspired/get-inspired-festival.jpg';
import GetInspiredRelax from '@/assets/images/get-inspired/get-inspired-relax.jpg';
import GetInspiredRustic from '@/assets/images/get-inspired/get-inspired-rustic.jpg';
import { BlurView } from 'expo-blur';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.4;
const CARD_HEIGHT = 200;
const CARD_BORDER_RADIUS = 20;

const MARGIN_CARDS = 8;
const PARALLAX_FACTOR = 30; // Controls parallax strength

// Refactored images array with labels
const images = [
    { source: GetInspiredBeach, label: 'Beach' },
    { source: GetInspiredCity, label: 'City' },
    { source: GetInspiredRustic, label: 'Rustic' },
    { source: GetInspiredFestival, label: 'Festival' },
    { source: GetInspiredRelax, label: 'Relax' },
];

const GetInspiredSection = () => {
    const scrollX = useSharedValue(0);
    const flatListRef = useRef<FlatList>(null);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    return (
        <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
            <Animated.Text entering={FadeInLeft.delay(250)} style={styles.title}>
                Get Inspired
            </Animated.Text>
            <Animated.Text entering={FadeInLeft.delay(350)} style={styles.subtitle}>
                Discover the best places to travel this summer
            </Animated.Text>
            <View style={styles.container}>
                <Animated.FlatList
                    ref={flatListRef}
                    data={images}
                    renderItem={({ item, index }) => <CarouselItem item={item} index={index} scrollX={scrollX} />}
                    horizontal
                    snapToInterval={CARD_WIDTH + MARGIN_CARDS * 2}
                    decelerationRate="fast"
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                    contentContainerStyle={{ paddingRight: CARD_WIDTH + MARGIN_CARDS * 2 }}
                />
            </View>
        </View>
    );
};

const CarouselItem = ({ item, index, scrollX }: { item: any; index: number; scrollX: any }) => {
    console.log('Rendering item:', item); // Debugging line

    const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * (CARD_WIDTH + MARGIN_CARDS),
            index * (CARD_WIDTH + MARGIN_CARDS),
            (index + 1) * (CARD_WIDTH + MARGIN_CARDS),
        ];

        const opacity = interpolate(scrollX.value, inputRange, [0.5, 1, 0.5], Extrapolate.CLAMP);

        return {
            opacity,
        };
    });

    const imageAnimatedStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * (CARD_WIDTH + MARGIN_CARDS),
            index * (CARD_WIDTH + MARGIN_CARDS),
            (index + 1) * (CARD_WIDTH + MARGIN_CARDS),
        ];

        const translateX = interpolate(
            scrollX.value,
            inputRange,
            [-PARALLAX_FACTOR, 0, PARALLAX_FACTOR],
            Extrapolate.CLAMP
        );

        return {
            transform: [{ translateX }],
        };
    });

    return (
        <TouchableOpacity activeOpacity={0.9} style={styles.cardContainer}>
            <Animated.View entering={FadeIn.duration(250).delay(250)} style={[styles.card, animatedStyle]}>
                <Animated.Image source={item.source} style={[styles.image, imageAnimatedStyle]} resizeMode="cover" />
                <BlurView
                    intensity={10}
                    style={{ position: 'absolute', right: 5, bottom: 5, borderRadius: 10, overflow: 'hidden' }}
                >
                    <Animated.Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', margin: 10 }}>
                        {item.label} {/* Directly using the label from the object */}
                    </Animated.Text>
                </BlurView>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: { fontSize: 14, marginBottom: 20, color: 'gray' },
    container: {
        alignItems: 'center',
    },
    cardContainer: {
        width: CARD_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: MARGIN_CARDS,
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: CARD_BORDER_RADIUS,
        overflow: 'hidden',
    },
    image: {
        width: CARD_WIDTH * 1.5,
        height: CARD_HEIGHT,
        borderRadius: CARD_BORDER_RADIUS,
    },
});

export default GetInspiredSection;
