import { useMostPopularHotels } from '@/services/react-query/hotels';
import { Hotel } from '@/types/hotel.types';
import React, { useMemo, useRef } from 'react';
import { Dimensions, StyleSheet, Text, useColorScheme, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

import MostPopularCarouselItem from '@/components/home/most-popular-carousel/MostPopularCarouselItem';
import Colors from '@/constants/Colors';
import Animated, { FadeInLeft } from 'react-native-reanimated';

// Adjusted dimensions for smaller cards
const SLIDER_WIDTH = screenWidth;
export const MOST_POPULAR_CAROUSEL_CARD_WIDTH = screenWidth * 0.45;
export const MOST_POPULAR_CAROUSEL_CARD_HEIGHT = screenHeight * 0.25;

const MostPopularCarousel = () => {
    const theme = useColorScheme() ?? 'light';
    const carouselRef = useRef<Carousel<Hotel>>(null);

    const { data, isLoading, error } = useMostPopularHotels();

    const hotels = useMemo(() => data, [data]);

    const s = useMemo(() => makeStyles(Colors[theme]), [theme]);

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
            <Animated.Text style={s.subtitle}>What travelers are loving right now</Animated.Text>
            <Carousel
                ref={carouselRef}
                data={hotels}
                renderItem={renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={MOST_POPULAR_CAROUSEL_CARD_WIDTH}
                itemHeight={MOST_POPULAR_CAROUSEL_CARD_HEIGHT}
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

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            marginVertical: 10,
            color: colors.textTitle,
        },
        subtitle: { fontSize: 14, marginBottom: 20, color: colors.textLightGray },
    });

export default MostPopularCarousel;
