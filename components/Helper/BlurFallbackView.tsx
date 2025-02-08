import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, View, ViewStyle } from 'react-native';

interface BlurFallbackProps {
    intensity?: number;
    tint?: 'light' | 'dark' | 'default';
    style?: ViewStyle;
    children?: React.ReactNode;
}

const BlurFallbackView: React.FC<BlurFallbackProps> = ({ intensity = 20, tint = 'default', style, children }) => {
    if (Platform.OS === 'ios') {
        return (
            <BlurView style={style} intensity={intensity} tint={tint}>
                {children}
            </BlurView>
        );
    }

    // Calculate RGBA based on intensity and tint for Android
    let backgroundColor = 'rgba(255, 255, 255, 0.3)'; // Default light
    if (tint === 'dark') {
        backgroundColor = 'rgba(0, 0, 0, 0.3)'; // Dark
    } else if (tint === 'default') {
        backgroundColor = 'rgba(200, 200, 200, 0.3)'; // Default
    }

    // Adjust opacity based on intensity (linear approximation)
    const opacity = (intensity / 100) * 0.6; // Adjust multiplier as needed
    const rgbaColor = backgroundColor.replace(/, 0\.3\)/, `, ${opacity.toFixed(2)})`);

    return <View style={[style, { backgroundColor: rgbaColor }]}>{children}</View>;
};

export default BlurFallbackView;
