import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CARD_WIDTH = screenWidth * 0.4;
const CARD_HEIGHT = screenHeight * 0.25;
const NUMBER_OF_SKELETONS = 3;

const CarouselSkeleton = () => {
    return (
        <SkeletonPlaceholder>
            <>
                <View style={styles.title}>
                    <View style={{ width: 150, height: 25, marginBottom: 10 }} />
                </View>

                <View style={styles.container}>
                    {[...Array(NUMBER_OF_SKELETONS)].map((_, index) => (
                        <View
                            key={index}
                            style={{
                                ...styles.card,
                                marginRight: index === NUMBER_OF_SKELETONS - 1 ? 40 : 0,
                                transform: [{ scale: 1 - index * 0.1 }, { translateX: index === 0 ? 0 : 10 }],
                            }}
                        />
                    ))}
                </View>
            </>
        </SkeletonPlaceholder>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    container: {
        flexDirection: 'row',

        paddingHorizontal: 20,
        marginTop: 20,
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 12,
    },
});

export default CarouselSkeleton;
