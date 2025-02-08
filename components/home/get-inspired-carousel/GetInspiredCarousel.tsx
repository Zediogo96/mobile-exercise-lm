import React, { useMemo, useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInLeft, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import GetInspiredBeach from '@/assets/images/get-inspired/get-inspired-beach.jpg';
import GetInspiredCity from '@/assets/images/get-inspired/get-inspired-city.jpg';
import GetInspiredFestival from '@/assets/images/get-inspired/get-inspired-festival.jpg';
import GetInspiredRelax from '@/assets/images/get-inspired/get-inspired-relax.jpg';
import GetInspiredRustic from '@/assets/images/get-inspired/get-inspired-rustic.jpg';
import GetInspiredCarouselItem from '@/components/home/get-inspired-carousel/GetInspiredCarouselItem';
import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const SCREEN_WIDTH = Dimensions.get('window').width;
export const GET_INSPIRED_CARD_WIDTH = SCREEN_WIDTH * 0.4;
export const GET_INSPIRED_CARD_HEIGHT = 200;
export const GET_INSPIRED_CARD_BORDER_RADIUS = 20;

export const GET_INSPIRED_MARGIN_CARDS = 8;

// Refactored images array with labels
const images = [
    { source: GetInspiredBeach, label: 'Beach' },
    { source: GetInspiredCity, label: 'City' },
    { source: GetInspiredRustic, label: 'Rustic' },
    { source: GetInspiredFestival, label: 'Festival' },
    { source: GetInspiredRelax, label: 'Relax' },
];

const GetInspiredCarousel = () => {
    const colors = useColorsFromTheme();

    const scrollX = useSharedValue(0);
    const flatListRef = useRef<FlatList>(null);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    const styles = useMemo(() => makeStyles(colors), [colors]);

    return (
        <View style={{ marginHorizontal: 20, marginVertical: 20, backgroundColor: colors.background }}>
            <Animated.Text entering={FadeInLeft.delay(250)} style={styles.title}>
                Get Inspired
            </Animated.Text>
            <Animated.Text style={styles.subtitle}>Discover the best places to travel this summer</Animated.Text>
            <View style={styles.container}>
                <Animated.FlatList
                    ref={flatListRef}
                    data={images}
                    renderItem={({ item, index }) => (
                        <GetInspiredCarouselItem item={item} index={index} scrollX={scrollX} />
                    )}
                    horizontal
                    snapToInterval={GET_INSPIRED_CARD_WIDTH + GET_INSPIRED_MARGIN_CARDS * 2}
                    decelerationRate="fast"
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                    contentContainerStyle={{ paddingRight: GET_INSPIRED_CARD_WIDTH + GET_INSPIRED_MARGIN_CARDS * 2 }}
                />
            </View>
        </View>
    );
};

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
            color: colors.textTitle,
        },
        subtitle: { fontSize: 14, marginBottom: 20, color: colors.textSecondary },
        container: {
            alignItems: 'center',
        },
    });

export default GetInspiredCarousel;
