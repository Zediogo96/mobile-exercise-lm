import RangeSlider from '@/components/UI/RangeSlider';
import { useFilterStore } from '@/services/zustand/hotelFilterStore';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withSequence, withTiming } from 'react-native-reanimated';

const BudgetPicker = () => {
    const MIN_DEFAULT = 0;
    const MAX_DEFAULT = 1000;

    const { priceRange, setPriceRange } = useFilterStore();

    // these need to be two separate useAnimatedStyle hooks
    // because if there is only one, the animation will be applied to both values
    const minValueStyle = useAnimatedStyle(
        () => ({
            transform: [
                {
                    scale: withSequence(withTiming(1.1, { duration: 200 }), withTiming(1, { duration: 200 })),
                },
            ],
        }),
        [priceRange.min]
    );

    const maxValueStyle = useAnimatedStyle(
        () => ({
            transform: [
                {
                    scale: withSequence(withTiming(1.1, { duration: 200 }), withTiming(1, { duration: 200 })),
                },
            ],
        }),
        [priceRange.max]
    );

    return (
        <>
            <Text style={styles.title}>
                Budget
                <Text style={styles.subTitle}> (per night)</Text>
            </Text>
            <View style={styles.cardContainer}>
                <View style={styles.sliderContainer}>
                    <RangeSlider
                        sliderWidth={265}
                        min={MIN_DEFAULT}
                        max={MAX_DEFAULT}
                        step={25}
                        priceRange={priceRange}
                        onValueChange={(range: any) => {
                            setPriceRange(range);
                        }}
                    />
                </View>

                <View style={styles.valuesContainer}>
                    <View style={styles.bottomCardContainer}>
                        <Text style={styles.smallLabel}> Min </Text>
                        <Animated.Text style={[styles.valueText, minValueStyle]}>€ {priceRange.min}</Animated.Text>
                    </View>
                    <Text style={{ fontSize: 20 }}> - </Text>
                    <View style={styles.bottomCardContainer}>
                        <Text style={styles.smallLabel}> Max </Text>
                        <Animated.Text style={[styles.valueText, maxValueStyle]}>€ {priceRange.max}</Animated.Text>
                    </View>
                </View>
            </View>
        </>
    );
};

export default BudgetPicker;

const styles = StyleSheet.create({
    cardContainer: {
        height: 200,
        width: '95%',
        alignSelf: 'center',

        backgroundColor: 'white',
        borderRadius: 10,
        padding: 30,

        // shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 2.84,
        elevation: 5,
    },
    title: { color: '#666', fontSize: 18, marginBottom: 20, fontWeight: 'bold' },
    subTitle: { color: '#666', fontSize: 16, fontWeight: 'normal' },
    sliderContainer: { flex: 1, marginTop: 20 },

    valuesContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 30 },
    bottomCardContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        maxWidth: '40%',
        gap: 5,

        // shadow
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1.5,
        elevation: 5,
    },

    smallLabel: { fontSize: 12, color: 'black', letterSpacing: 1 },
    valueText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#999',
    },
});
