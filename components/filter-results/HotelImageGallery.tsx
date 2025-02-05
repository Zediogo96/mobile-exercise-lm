import FastImageWrapper from '@/components/Helper/FastImageWrapper';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.9;
const IMAGE_HEIGHT = 150;
const CARD_BORDER_RADIUS = 15;
const DOT_SIZE = 6;
const ACTIVE_DOT_SIZE = 12;

// Animation constants
const MIN_SCALE = 0.7;
const MIN_OPACITY = 0.4;

const AnimatedImage = Animated.createAnimatedComponent(FastImageWrapper);

interface CarouselItemProps {
    item: string;
    index: number;
    scrollX: Animated.SharedValue<number>;
    hotelId: string;
}

const CarouselItem = React.memo(({ item, index, scrollX, hotelId }: CarouselItemProps) => {
    const router = useRouter();

    const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH];
        const scale = interpolate(scrollX.value, inputRange, [MIN_SCALE, 1, MIN_SCALE], Extrapolate.CLAMP);
        const opacity = interpolate(scrollX.value, inputRange, [MIN_OPACITY, 1, MIN_OPACITY], Extrapolate.CLAMP);
        const translateY = interpolate(scrollX.value, inputRange, [20, 0, -20], Extrapolate.CLAMP);
        return {
            transform: [{ scale }, { translateY }],
            opacity,
        };
    });

    const handlePress = () => {
        // Navigate to the hotel details page (adjust route as needed)
        router.push(`/hotel-details/${hotelId}`);
    };

    return (
        <TouchableOpacity activeOpacity={0.9} delayPressIn={100} onPress={handlePress}>
            <AnimatedImage source={{ uri: item }} style={[styles.carouselImage, animatedStyle]} resizeMode="cover" />
        </TouchableOpacity>
    );
});

interface AnimatedDotProps {
    index: number;
    scrollX: Animated.SharedValue<number>;
}

const AnimatedDot: React.FC<AnimatedDotProps> = ({ index, scrollX }) => {
    const animatedStyle = useAnimatedStyle(() => {
        const input = scrollX.value / CARD_WIDTH;
        const scale = interpolate(input, [index - 1, index, index + 1], [0.8, 1, 0.8], Extrapolate.CLAMP);
        const opacity = interpolate(input, [index - 1, index, index + 1], [0.6, 1, 0.6], Extrapolate.CLAMP);
        const width = interpolate(
            input,
            [index - 1, index, index + 1],
            [DOT_SIZE, ACTIVE_DOT_SIZE, DOT_SIZE],
            Extrapolate.CLAMP
        );
        return {
            transform: [{ scale }],
            opacity,
            width,
            height: width,
            backgroundColor: opacity > 0.8 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
        };
    });
    return <Animated.View style={[styles.dot, animatedStyle]} />;
};

interface CustomPaginationProps {
    length: number;
    scrollX: Animated.SharedValue<number>;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ length, scrollX }) => {
    return (
        <BlurView style={styles.paginationContainer} intensity={50} tint="light">
            {Array.from({ length }).map((_, index) => (
                <AnimatedDot key={index} index={index} scrollX={scrollX} />
            ))}
        </BlurView>
    );
};

interface HotelGalleryProps {
    gallery: string[];
    hotelId: string;
}

const HotelGallery: React.FC<HotelGalleryProps> = ({ gallery, hotelId }) => {
    const scrollX = useSharedValue(0);
    const flatListRef = useRef<FlatList>(null);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    const getItemLayout = useCallback(
        (_: any, index: number) => ({
            length: CARD_WIDTH,
            offset: CARD_WIDTH * index,
            index,
        }),
        []
    );

    if (gallery.length === 1) {
        return <FastImageWrapper source={{ uri: gallery[0] }} style={styles.carouselImage} resizeMode="cover" />;
    }

    return (
        <View style={styles.container}>
            <Animated.FlatList
                ref={flatListRef}
                data={gallery}
                renderItem={({ item, index }: { item: string; index: number }) => (
                    <CarouselItem item={item} index={index} scrollX={scrollX} hotelId={hotelId} />
                )}
                horizontal
                pagingEnabled
                snapToInterval={CARD_WIDTH}
                decelerationRate="fast"
                bounces={false}
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                getItemLayout={getItemLayout}
                scrollEventThrottle={16}
                initialScrollIndex={0}
            />
            <CustomPagination length={gallery.length} scrollX={scrollX} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: IMAGE_HEIGHT,
        width: '100%',
    },
    itemContainer: {
        width: CARD_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
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
    dot: {
        borderRadius: ACTIVE_DOT_SIZE / 2,
        marginHorizontal: 4,
    },
});

export default HotelGallery;
