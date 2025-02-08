import RangeSlider from '@/components/UI/RangeSlider';
import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import { useFilterStore } from '@/services/zustand/hotelFilterStore';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withSequence, withTiming } from 'react-native-reanimated';

const BudgetPicker = () => {
    const MIN_DEFAULT = 0;
    const MAX_DEFAULT = 1000;

    const { priceRange, setPriceRange } = useFilterStore();

    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

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

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        cardContainer: {
            height: 200,
            width: '95%',
            alignSelf: 'center',

            backgroundColor: colors.cardBackground,
            borderRadius: 10,
            padding: 30,

            boxShadow: '0px 2px 1px rgba(218, 215, 215, 0.25)',
        },
        title: { fontSize: 18, marginBottom: 20, fontWeight: 'bold', color: colors.textTitle },
        subTitle: { fontSize: 16, fontWeight: 'normal', color: colors.textSecondary },
        sliderContainer: { flex: 1, marginTop: 20 },

        valuesContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 30 },
        bottomCardContainer: {
            flex: 1,
            backgroundColor: colors.subCardBackground,
            padding: 10,
            borderRadius: 5,
            maxWidth: '40%',
            gap: 5,

            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
        },

        smallLabel: { fontSize: 12, color: 'black', letterSpacing: 1 },
        valueText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#999',
        },
    });
