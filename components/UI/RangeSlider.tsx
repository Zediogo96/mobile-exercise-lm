import React, { useEffect } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const RangeSlider = ({
    sliderWidth,
    min,
    max,
    step,
    priceRange,
    onValueChange,
}: {
    sliderWidth: number;
    min: number;
    max: number;
    step: number;
    priceRange: { min: number; max: number };
    onValueChange: (range: any) => void;
}) => {
    const context = useSharedValue(0);
    const context2 = useSharedValue(0);

    // * Opacities
    const opacity = useSharedValue(0);
    const opacity2 = useSharedValue(0);

    // * Z-Indexes
    const zIndex = useSharedValue(0);
    const zIndex2 = useSharedValue(0);

    // * Positions
    const positionLeftThumb = useSharedValue(0);
    const positionRightThumb = useSharedValue(sliderWidth);

    // * Scales
    const scaleLeftThumb = useSharedValue(1);
    const scaleRightThumb = useSharedValue(1);

    // Convert price range to slider positions
    const convertPriceToPosition = (price: number) => (price / (max - min)) * sliderWidth;

    useEffect(() => {
        // Update slider positions when priceRange changes externally
        positionLeftThumb.value = convertPriceToPosition(priceRange.min);
        positionRightThumb.value = convertPriceToPosition(priceRange.max);
    }, [priceRange.min, priceRange.max]);

    // Using new Gesture API
    const pan = Gesture.Pan()
        .onBegin(() => {
            context.value = positionLeftThumb.value;
        })
        .onUpdate((e) => {
            opacity.value = withTiming(1, { duration: 500 });
            scaleLeftThumb.value = withTiming(1.2, { duration: 200 });
            if (context.value + e.translationX < 0) {
                positionLeftThumb.value = 0;
            } else if (context.value + e.translationX > positionRightThumb.value) {
                positionLeftThumb.value = positionRightThumb.value;
                zIndex.value = 1;
                zIndex2.value = 0;
            } else {
                positionLeftThumb.value = context.value + e.translationX;
            }
        })
        .onEnd(() => {
            opacity.value = withTiming(0, { duration: 500 });
            scaleLeftThumb.value = withTiming(1, { duration: 200 });
            runOnJS(onValueChange)({
                min: min + Math.floor(positionLeftThumb.value / (sliderWidth / ((max - min) / step))) * step,
                max: min + Math.floor(positionRightThumb.value / (sliderWidth / ((max - min) / step))) * step,
            });
        });

    const pan2 = Gesture.Pan()
        .onBegin(() => {
            context2.value = positionRightThumb.value;
        })
        .onUpdate((e) => {
            opacity2.value = withTiming(1, { duration: 500 });
            scaleRightThumb.value = withTiming(1.2, { duration: 200 });
            if (context2.value + e.translationX > sliderWidth) {
                positionRightThumb.value = sliderWidth;
            } else if (context2.value + e.translationX < positionLeftThumb.value) {
                positionRightThumb.value = positionRightThumb.value;
                zIndex.value = 0;
                zIndex2.value = 1;
            } else {
                positionRightThumb.value = context2.value + e.translationX;
            }
        })
        .onEnd(() => {
            opacity2.value = withTiming(0, { duration: 500 });
            runOnJS(onValueChange)({
                min: min + Math.floor(positionLeftThumb.value / (sliderWidth / ((max - min) / step))) * step,
                max: min + Math.floor(positionRightThumb.value / (sliderWidth / ((max - min) / step))) * step,
            });
        });

    const animatedLeftThumbStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: positionLeftThumb.value }, { scale: scaleLeftThumb.value }],
        zIndex: zIndex.value,
    }));

    const animatedRightThumbStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: positionRightThumb.value }, { scale: scaleRightThumb.value }],
        zIndex: zIndex2.value,
    }));

    const opacityStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const opacityStyle2 = useAnimatedStyle(() => ({
        opacity: opacity2.value,
    }));

    const sliderStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: positionLeftThumb.value }],
        width: positionRightThumb.value - positionLeftThumb.value,
    }));

    // Add this line for Reanimated from v3.5.0
    Animated.addWhitelistedNativeProps({ text: true });
    const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

    const minLabelText = useAnimatedProps(() => {
        return {
            text: `$ ${min + Math.floor(positionLeftThumb.value / (sliderWidth / ((max - min) / step))) * step}`,
        };
    });
    const maxLabelText = useAnimatedProps(() => {
        return {
            text: `$ ${min + Math.floor(positionRightThumb.value / (sliderWidth / ((max - min) / step))) * step}`,
        };
    });

    return (
        <View style={[styles.sliderContainer, { width: sliderWidth }]}>
            <View style={[styles.sliderBack, { width: sliderWidth }]} />
            <Animated.View style={[sliderStyle, styles.sliderFront]} />
            <GestureDetector gesture={pan}>
                <Animated.View style={[animatedLeftThumbStyle, styles.thumb]}>
                    <Animated.View style={[opacityStyle, styles.label]}>
                        {/* @ts-expect-error: text prop is not available in TextInput, this is a workaround */}
                        <AnimatedTextInput style={styles.labelText} animatedProps={minLabelText} editable={false} />
                    </Animated.View>
                </Animated.View>
            </GestureDetector>
            <GestureDetector gesture={pan2}>
                <Animated.View style={[animatedRightThumbStyle, styles.thumb]}>
                    <Animated.View style={[opacityStyle2, styles.label]}>
                        {/* @ts-expect-error: text prop is not available in TextInput, this is a workaround */}
                        <AnimatedTextInput style={styles.labelText} animatedProps={maxLabelText} editable={false} />
                    </Animated.View>
                </Animated.View>
            </GestureDetector>
        </View>
    );
};

export default RangeSlider;

const styles = StyleSheet.create({
    sliderContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
    },
    sliderBack: {
        height: 8,
        backgroundColor: 'lightgray',
        borderRadius: 20,
    },
    sliderFront: {
        height: 8,
        backgroundColor: '#747474',
        borderRadius: 20,
        position: 'absolute',
    },
    thumb: {
        left: -10,
        width: 20,
        height: 20,
        position: 'absolute',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
    },
    label: {
        position: 'absolute',
        top: -45,
        bottom: 25,

        width: 65,
        backgroundColor: 'black',
        borderRadius: 5,
        alignSelf: 'center',
    },
    labelText: {
        color: 'white',
        padding: 5,
        fontWeight: 'bold',
        fontSize: 16,
        width: '100%',
        textAlign: 'center',
    },
});
