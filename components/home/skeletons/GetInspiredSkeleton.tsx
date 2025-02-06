import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.4;
const CARD_HEIGHT = 200;
const NUMBER_OF_SKELETONS = 3;

const GetInspiredSkeleton = () => {
    return (
        <>
            <SkeletonPlaceholder highlightColor="#f0f0f0">
                <View style={styles.title}>
                    <View style={{ width: 150, height: 25, marginBottom: 10 }} />
                </View>
            </SkeletonPlaceholder>

            <SkeletonPlaceholder>
                <View style={styles.container}>
                    {[...Array(NUMBER_OF_SKELETONS)].map((_, index) => (
                        <View
                            key={index}
                            style={{
                                ...styles.card,
                                marginRight: 20,
                            }}
                        />
                    ))}
                </View>
            </SkeletonPlaceholder>
        </>
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

export default GetInspiredSkeleton;
