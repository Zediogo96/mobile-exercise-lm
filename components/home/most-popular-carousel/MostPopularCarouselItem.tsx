import BlurFallbackView from '@/components/Helper/BlurFallbackView';
import FastImageWrapper from '@/components/Helper/FastImageWrapper';
import {
    MOST_POPULAR_CAROUSEL_CARD_HEIGHT,
    MOST_POPULAR_CAROUSEL_CARD_WIDTH,
} from '@/components/home/most-popular-carousel/most-popular-carousel-variables';

import RatingStars from '@/components/hotel-details/RatingStars';
import Colors from '@/constants/Colors';
import { Hotel } from '@/types/hotel.types';
import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useMemo } from 'react';
import { Platform, StyleSheet, Text, useColorScheme, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const AnimatedFastImageWrapper = Animated.createAnimatedComponent(FastImageWrapper);

const MostPopularCarouselItem = (item: Hotel) => {
    const theme = useColorScheme() ?? 'light';
    const styles = useMemo(() => makeStyles(Colors[theme]), [theme]);

    const colors = Platform.select({
        ios: {},
    });

    return (
        <Link
            href={{
                pathname: '/hotel-details/[id]',
                params: { id: item.id },
            }}
        >
            <Animated.View entering={FadeIn.duration(500)} style={styles.card}>
                <AnimatedFastImageWrapper
                    sharedTransitionTag="hotel-image"
                    style={styles.image}
                    source={{ uri: item.gallery[0] }}
                    resizeMode="cover"
                />

                <BlurFallbackView intensity={40} tint="dark" style={styles.topContainer}>
                    <RatingStars count={item.stars} fontStyle={styles.fontStyleRatingStars} />
                </BlurFallbackView>

                <BlurFallbackView intensity={65} tint="light" style={styles.blurInformationContainer}>
                    <View style={{ flex: 1, rowGap: 3 }}>
                        <Text style={[styles.text, styles.textMain]} numberOfLines={1}>
                            {item.name}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <Entypo name="location-pin" size={12} color={Platform.OS === 'ios' ? 'white' : 'black'} />
                            <Text style={styles.text} numberOfLines={1}>
                                {item.location.city}
                            </Text>
                        </View>
                    </View>
                </BlurFallbackView>
            </Animated.View>
        </Link>
    );
};

export default MostPopularCarouselItem;

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        card: {
            borderRadius: 12, // Slightly reduced radius
            borderCurve: 'continuous',

            width: MOST_POPULAR_CAROUSEL_CARD_WIDTH,
            height: MOST_POPULAR_CAROUSEL_CARD_HEIGHT,
            overflow: 'hidden',
            justifyContent: 'flex-end',
        },
        image: {
            width: MOST_POPULAR_CAROUSEL_CARD_WIDTH,
            height: MOST_POPULAR_CAROUSEL_CARD_HEIGHT,
            ...StyleSheet.absoluteFillObject,
        },
        blurInformationContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '25%',
            margin: 8,

            padding: 8,
            borderRadius: 8,
            borderCurve: 'continuous',
            overflow: 'hidden',
        },
        text: {
            color: Platform.OS === 'ios' ? 'white' : 'black',
            fontSize: 11,
        },
        textMain: {
            fontWeight: 'bold',
        },

        topContainer: {
            position: 'absolute',
            top: 10,
            right: 10,
            padding: 5,
            borderRadius: 4,
            overflow: 'hidden',
        },

        fontStyleRatingStars: {
            color: 'white',
            fontSize: 14,
        },
    });
