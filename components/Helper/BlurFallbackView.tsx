import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';

interface BlurFallbackProps {
    intensity?: number;
    tint?: 'light' | 'dark' | 'default';
    style?: ViewStyle | ViewStyle[];
    children?: React.ReactNode;
}

const BlurFallback: React.FC<BlurFallbackProps> = ({ intensity = 20, tint = 'default', style, children }) => {
    if (Platform.OS === 'ios') {
        return (
            <BlurView style={style} intensity={intensity} tint={tint}>
                {children}
            </BlurView>
        );
    }

    const baseColor = tint === 'dark' ? 'rgba(0, 0, 0, ' : 'rgba(255, 255, 255, ';
    const opacity = (intensity / 100) * 0.4; // Reduced opacity for layering

    return (
        <View style={style}>
            <View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: baseColor + (opacity * 0.8).toFixed(2) + ')',
                }}
            />
            <View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: baseColor + (opacity * 0.6).toFixed(2) + ')',
                    transform: [{ translateX: 1 }, { translateY: 1 }],
                }}
            />
            <View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: baseColor + (opacity * 0.4).toFixed(2) + ')',
                    transform: [{ translateX: -1 }, { translateY: -1 }],
                }}
            />
            <View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: baseColor + (opacity * 0.2).toFixed(2) + ')',
                    transform: [{ translateX: 2 }, { translateY: -2 }],
                }}
            />
            {children}
        </View>
    );
};

export default BlurFallback;
