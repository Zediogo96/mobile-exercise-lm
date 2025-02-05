import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.9;
const IMAGE_HEIGHT = 150;
const CARD_BORDER_RADIUS = 15;

const SkeletonCard = () => {
    return (
        <View style={styles.hotelCard}>
            {/* Image Placeholder */}
            <SkeletonPlaceholder speed={1000} backgroundColor="#E0E0E0" highlightColor="#F0F0F0">
                <View style={styles.imagePlaceholder} />
            </SkeletonPlaceholder>

            {/* Content Placeholder */}
            <View style={styles.informationContainer}>
                <View style={styles.headerRow}>
                    <SkeletonPlaceholder speed={2000} backgroundColor="#E0E0E0" highlightColor="#F0F0F0">
                        <View style={styles.titlePlaceholder} />
                    </SkeletonPlaceholder>
                    <SkeletonPlaceholder speed={2000} backgroundColor="#E0E0E0" highlightColor="#F0F0F0">
                        <View style={styles.starsPlaceholder} />
                    </SkeletonPlaceholder>
                </View>
                <View style={styles.detailsRow}>
                    <SkeletonPlaceholder speed={2000} backgroundColor="#E0E0E0" highlightColor="#F0F0F0">
                        <View style={styles.locationPlaceholder} />
                    </SkeletonPlaceholder>
                    <SkeletonPlaceholder speed={2000} backgroundColor="#E0E0E0" highlightColor="#F0F0F0">
                        <View style={styles.pricePlaceholder} />
                    </SkeletonPlaceholder>
                </View>
            </View>
        </View>
    );
};

const HotelListSkeleton = () => {
    return (
        <Animated.FlatList
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={styles.listContainer}
            data={Array.from({ length: 3 })}
            keyExtractor={(_, index) => index.toString()}
            renderItem={() => <SkeletonCard />}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    hotelCard: {
        backgroundColor: '#FFFFFF',
        width: CARD_WIDTH,
        borderRadius: CARD_BORDER_RADIUS,
        marginVertical: 8,
        paddingBottom: 15,
        // Use overflow hidden to clip the skeletons to the card's rounded corners.
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
    },
    imagePlaceholder: {
        width: '100%',
        height: IMAGE_HEIGHT,
        borderTopLeftRadius: CARD_BORDER_RADIUS,
        borderTopRightRadius: CARD_BORDER_RADIUS,
    },
    informationContainer: {
        padding: 15,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    titlePlaceholder: {
        width: 200,
        height: 20,
        borderRadius: 4,
    },
    starsPlaceholder: {
        width: 80,
        height: 15,
        borderRadius: 4,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    locationPlaceholder: {
        width: 120,
        height: 15,
        borderRadius: 4,
    },
    pricePlaceholder: {
        width: 80,
        height: 20,
        borderRadius: 4,
    },
});

export default HotelListSkeleton;
