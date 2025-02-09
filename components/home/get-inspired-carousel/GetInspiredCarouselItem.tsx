import BlurFallbackView from '@/components/Helper/BlurFallbackView';
import {
    GET_INSPIRED_CARD_BORDER_RADIUS,
    GET_INSPIRED_CARD_HEIGHT,
    GET_INSPIRED_CARD_WIDTH,
    GET_INSPIRED_MARGIN_CARDS,
} from '@/components/home/get-inspired-carousel/get-inspired-carousel-variables';
import AnimatedTouchableOpacity from '@/components/UI/animated-components/AnimatedTouchableOpacity';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Extrapolate, FadeIn, interpolate, useAnimatedStyle } from 'react-native-reanimated';

const PARALLAX_FACTOR = 30; // Controls parallax strength

const GetInspiredCarouselItem = ({ item, index, scrollX }: { item: any; index: number; scrollX: any }) => {
    const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * (GET_INSPIRED_CARD_WIDTH + GET_INSPIRED_MARGIN_CARDS),
            index * (GET_INSPIRED_CARD_WIDTH + GET_INSPIRED_MARGIN_CARDS),
            (index + 1) * (GET_INSPIRED_CARD_WIDTH + GET_INSPIRED_MARGIN_CARDS),
        ];

        const opacity = interpolate(scrollX.value, inputRange, [0.5, 1, 0.5], Extrapolate.CLAMP);

        return {
            opacity,
        };
    });

    const imageAnimatedStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * (GET_INSPIRED_CARD_WIDTH + GET_INSPIRED_MARGIN_CARDS),
            index * (GET_INSPIRED_CARD_WIDTH + GET_INSPIRED_MARGIN_CARDS),
            (index + 1) * (GET_INSPIRED_CARD_WIDTH + GET_INSPIRED_MARGIN_CARDS),
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
        <AnimatedTouchableOpacity
            activeOpacity={0.9}
            style={styles.cardContainer}
            entering={FadeIn.duration(250).delay(250)}
        >
            <Animated.View style={[styles.card, animatedStyle]}>
                <Animated.Image source={item.source} style={[styles.image, imageAnimatedStyle]} resizeMode="cover" />

                <BlurFallbackView
                    intensity={10}
                    style={{ position: 'absolute', right: 5, bottom: 5, borderRadius: 15, overflow: 'hidden' }}
                >
                    <Animated.Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', margin: 10 }}>
                        {item.label} {/* Directly using the label from the object */}
                    </Animated.Text>
                </BlurFallbackView>
            </Animated.View>
        </AnimatedTouchableOpacity>
    );
};

export default GetInspiredCarouselItem;

const styles = StyleSheet.create({
    cardContainer: {
        width: GET_INSPIRED_CARD_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: GET_INSPIRED_MARGIN_CARDS,
    },
    card: {
        width: GET_INSPIRED_CARD_WIDTH,
        height: GET_INSPIRED_CARD_HEIGHT,
        borderRadius: GET_INSPIRED_CARD_BORDER_RADIUS,
        overflow: 'hidden',
    },
    image: {
        width: GET_INSPIRED_CARD_WIDTH * 1.5,
        height: GET_INSPIRED_CARD_HEIGHT,
        borderRadius: GET_INSPIRED_CARD_BORDER_RADIUS,
    },
});
