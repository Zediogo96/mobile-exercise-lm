import FastImageWrapper from '@/components/Helper/FastImageWrapper';
import { BlurView } from 'expo-blur';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import Carousel from 'react-native-snap-carousel';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.9;
const IMAGE_HEIGHT = 150;
const CARD_BORDER_RADIUS = 15;
const DOT_SIZE = 6;
const ACTIVE_DOT_SIZE = 12;

interface AnimatedDotProps {
    active: boolean;
}

const AnimatedDot: React.FC<AnimatedDotProps> = ({ active }) => {
    // Shared values for scale and opacity
    const scale = useSharedValue(active ? 1 : 0.8);
    const opacity = useSharedValue(active ? 1 : 0.6);
    const size = useSharedValue(active ? ACTIVE_DOT_SIZE : DOT_SIZE);

    // Update shared values when active changes
    useEffect(() => {
        scale.value = withSpring(active ? 1 : 0.8, { mass: 4 });
        opacity.value = withTiming(active ? 1 : 0.6, { duration: 250 });
        size.value = withTiming(active ? ACTIVE_DOT_SIZE : DOT_SIZE, {
            duration: 250,
        });
    }, [active, scale, opacity, size]);

    // Animated style for the dot
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
        width: size.value,
        height: size.value,
        backgroundColor: active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
    }));

    return <Animated.View style={[styles.dot, animatedStyle]} />;
};

interface CustomPaginationProps {
    length: number;
    activeIndex: number;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ length, activeIndex }) => {
    return (
        <BlurView style={styles.paginationContainer} intensity={50} tint="light">
            {Array.from({ length }).map((_, index) => (
                <AnimatedDot key={index} active={index === activeIndex} />
            ))}
        </BlurView>
    );
};

interface HotelGalleryProps {
    gallery: string[];
    hotelId: string;
}

const HotelGallery: React.FC<HotelGalleryProps> = ({ gallery, hotelId }: HotelGalleryProps) => {
    const [activeSlide, setActiveSlide] = useState(0);

    const renderCarouselItem = ({ item }: { item: string }) => (
        <FastImageWrapper source={{ uri: item }} style={styles.carouselImage} resizeMode="cover" />
    );

    if (gallery.length === 1) {
        return <FastImageWrapper source={{ uri: gallery[0] }} style={styles.carouselImage} resizeMode="cover" />;
    }

    return (
        <View style={styles.container}>
            <Carousel
                data={gallery}
                renderItem={renderCarouselItem}
                sliderWidth={CARD_WIDTH}
                itemWidth={CARD_WIDTH}
                loop={true}
                autoplay={false}
                inactiveSlideScale={0.6}
                inactiveSlideOpacity={0.3}
                activeSlideAlignment="start"
                enableSnap={true}
                firstItem={0}
                onSnapToItem={setActiveSlide}
            />

            <CustomPagination length={gallery.length} activeIndex={activeSlide} />
        </View>
    );
};

export default HotelGallery;

const styles = StyleSheet.create({
    container: {
        height: IMAGE_HEIGHT,
        width: '100%',
    },
    carouselImage: {
        width: CARD_WIDTH,
        height: IMAGE_HEIGHT,
        borderTopLeftRadius: CARD_BORDER_RADIUS,
        borderTopRightRadius: CARD_BORDER_RADIUS,
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 10,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',

        alignSelf: 'center',

        borderRadius: 20,

        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 4,
        overflow: 'hidden',
    },
    dotsContainer: {},
    dot: {
        borderRadius: ACTIVE_DOT_SIZE / 2,
        marginHorizontal: 4,
    },

    iconButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        overflow: 'hidden',
    },
});
