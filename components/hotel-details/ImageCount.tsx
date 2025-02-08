// ImageCounter.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ImageCounterProps {
    currentIndex: number;
    totalImages: number;
}

const ImageCounter: React.FC<ImageCounterProps> = ({ currentIndex, totalImages }) => {
    return (
        <View
            style={{
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
        // zIndex: 10,
        bottom: 50, // 30 from info container displacement + 20 from bottom
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
