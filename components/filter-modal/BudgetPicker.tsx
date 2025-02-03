import RangeSlider from '@/components/UI/RangeSlider';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withSequence, withTiming } from 'react-native-reanimated';

const BudgetPicker = () => {
    const MIN_DEFAULT = 0;
    const MAX_DEFAULT = 1000;

    const [minValue, setMinValue] = React.useState(MIN_DEFAULT);
    const [maxValue, setMaxValue] = React.useState(MAX_DEFAULT);

    // these need to be two separate useAnimatedStyle hooks
    // because if there is only one, the animation will be applied to both values
    const minValueStyle = useAnimatedStyle(
        () => ({
            transform: [
                {
                    scale: withSequence(withTiming(1.2, { duration: 200 }), withTiming(1, { duration: 200 })),
                },
            ],
        }),
        [minValue]
    );

    const maxValueStyle = useAnimatedStyle(
        () => ({
            transform: [
                {
                    scale: withSequence(withTiming(1.2, { duration: 200 }), withTiming(1, { duration: 200 })),
                },
            ],
        }),
        [maxValue]
    );

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.title}>Budget</Text>

            <View style={styles.sliderContainer}>
                <RangeSlider
                    sliderWidth={250}
                    min={MIN_DEFAULT}
                    max={MAX_DEFAULT}
                    step={25}
                    onValueChange={(range: any) => {
                        setMinValue(range.min);
                        setMaxValue(range.max);
                    }}
                />
            </View>

            <View style={styles.valuesContainer}>
                <View style={styles.bottomCardContainer}>
                    <Text style={styles.smallLabel}> Min </Text>
                    <Animated.Text style={[styles.valueText, minValueStyle]}>€ {minValue}</Animated.Text>
                </View>
                <Text style={{ fontSize: 20 }}> - </Text>
                <View style={styles.bottomCardContainer}>
                    <Text style={styles.smallLabel}> Max </Text>
                    <Animated.Text style={[styles.valueText, maxValueStyle]}>€ {maxValue}</Animated.Text>
                </View>
            </View>
        </View>
    );
};

export default BudgetPicker;

const styles = StyleSheet.create({
    cardContainer: {
        height: 250,

        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,

        // shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,
        elevation: 5,
    },
    title: { fontSize: 20, marginBottom: 20, fontWeight: 'bold' },
    sliderContainer: { flex: 1, marginTop: 40 },

    valuesContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 30 },
    bottomCardContainer: { flex: 1, backgroundColor: '#ECECEC', padding: 10, borderRadius: 5, maxWidth: '40%', gap: 5 },

    smallLabel: { fontSize: 12, color: '#747474' },
    valueText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
