import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type BookmarkButtonProps = {
    bookmarked: boolean;
    handleBookmarkPress: () => void;
};

const BookmarkButton = ({ bookmarked, handleBookmarkPress }: BookmarkButtonProps) => {
    const animation = useSharedValue(0);

    useEffect(() => {
        animation.value = withTiming(1, { duration: 300 }, () => {
            animation.value = withTiming(0, { duration: 300 });
        });

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }, [bookmarked]);

    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(animation.value, [0, 1], [1, 1.2]);
        return { transform: [{ scale }] };
    });

    return (
        <BlurView intensity={20} tint="light" style={styles.iconButton}>
            <TouchableOpacity onPress={handleBookmarkPress} activeOpacity={0.7}>
                <Animated.View style={animatedStyle}>
                    <Ionicons name={bookmarked ? 'bookmark' : 'bookmark-outline'} size={22} color="black" />
                </Animated.View>
            </TouchableOpacity>
        </BlurView>
    );
};

export default BookmarkButton;

const styles = StyleSheet.create({
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        overflow: 'hidden',
    },
});
