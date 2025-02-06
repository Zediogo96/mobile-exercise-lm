// ImageCounter.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ImageCounterProps {
    currentIndex: number;
    totalImages: number;
}

const { height } = Dimensions.get('window');
const IMAGE_HEIGHT = height * 0.35;

const ImageCounter: React.FC<ImageCounterProps> = ({ currentIndex, totalImages }) => {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                top: insets.top + IMAGE_HEIGHT / 2 + 10, // value from padding
                ...styles.container,
            }}
        >
            <Ionicons name="images" size={14} color="white" />
            <Text style={[styles.text]}>{currentIndex + 1}</Text>
            <Text style={styles.text}>/ {totalImages}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 20,
        width: 75,
        height: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        gap: 5,
    },
    text: {
        color: 'white',
        fontSize: 14,
    },
});

export default ImageCounter;
