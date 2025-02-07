// SwipeableIOS.tsx
import { FontAwesome } from '@expo/vector-icons';
import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { Alert, Dimensions, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    FadeOutLeft,
    default as Reanimated,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const AnimatedFontAwesome = Reanimated.createAnimatedComponent(FontAwesome);

const { width } = Dimensions.get('window');

const DEFAULT_COMPONENT_HEIGHT = 50;
const DEFAULT_COMPONENT_WIDTH = width * 0.95;
const DEFAULT_COMPONENT_BORDER_RADIUS = 10;
const DEFAULT_SWIPE_THRESHOLD = 100;
const DEFAULT_ACTION_THRESHOLD = DEFAULT_SWIPE_THRESHOLD * 2;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

type SwipeableIOSProps = {
    callbackAction: () => void;
    children: React.ReactNode;
    scrollGesture: ReturnType<typeof Gesture.Native>;
    containerStyle?: ViewStyle | ViewStyle[];
    componentHeight?: number;
    componentWidth?: number;
    componentBorderRadius?: number;
    swipeThreshold?: number;
    actionThreshold?: number;
    deleteButtonColor?: string;
    deleteIconName?: keyof typeof FontAwesome.glyphMap;
    deleteIconSize?: number;
    deleteIconColor?: string;
    deleteTextColor?: string;
};

export const SwipeableIOS: FunctionComponent<SwipeableIOSProps> = ({
    children,
    containerStyle,
    scrollGesture,
    callbackAction,
    componentHeight = DEFAULT_COMPONENT_HEIGHT,
    componentWidth = DEFAULT_COMPONENT_WIDTH,
    componentBorderRadius = DEFAULT_COMPONENT_BORDER_RADIUS,
    swipeThreshold = DEFAULT_SWIPE_THRESHOLD,
    actionThreshold = DEFAULT_ACTION_THRESHOLD,
    deleteButtonColor = 'red',
    deleteIconName = 'trash',
    deleteIconSize = 26,
    deleteIconColor = 'white',
    deleteTextColor = 'white',
}) => {
    const translateX = useSharedValue(0);
    const startX = useSharedValue(0); // Track starting X position of the gesture

    const handleSwipeOrClick = useCallback(() => {
        Alert.alert(
            'Delete Bookmark',
            'Are you sure you want to delete this bookmark?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {
                        translateX.value = withSpring(0, { stiffness: 1000, damping: 500 });
                    },
                },
                {
                    text: 'OK',
                    onPress: () => {
                        callbackAction();
                    },
                },
            ],
            { cancelable: false }
        );
    }, []);

    const panGesture = Gesture.Pan()
        .simultaneousWithExternalGesture(scrollGesture)
        .activeOffsetX([-10, 10]) // Only activate after 10px movement
        .onStart(() => {
            'worklet';
            startX.value = translateX.value; // Capture the current translateX value
        })
        .onUpdate((event) => {
            'worklet';
            // Adjust the translateX value based on the current position
            translateX.value = Math.min(0, startX.value + event.translationX);
        })
        .onEnd((event) => {
            'worklet';
            if (event.translationX < 0) {
                if (Math.abs(translateX.value) > swipeThreshold && Math.abs(translateX.value) < actionThreshold) {
                    translateX.value = withSpring(-swipeThreshold);
                } else if (Math.abs(translateX.value) > actionThreshold) {
                    translateX.value = withSpring(-componentWidth * 1.4);
                    runOnJS(handleSwipeOrClick)();
                } else {
                    translateX.value = withTiming(0, { duration: 500 });
                }
            } else {
                translateX.value = withTiming(0, { duration: 500 });
            }
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const deleteButtonStyle = useAnimatedStyle(() => ({
        width: Math.abs(translateX.value) + 10,
    }));

    const deleteIconStyle = useAnimatedStyle(() => ({
        opacity: withTiming(translateX.value !== 0 ? 1 : 0),
    }));

    const deleteTextStyle = useAnimatedStyle(() => ({
        opacity: withTiming(Math.abs(translateX.value) > 50 ? 1 : 0),
        transform: [{ translateX: Math.abs(translateX.value) > 50 ? 0 : -50 }],
    }));

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    position: 'relative',
                    height: componentHeight,
                    borderRadius: componentBorderRadius,
                    overflow: 'hidden',
                },
                deleteButton: {
                    position: 'absolute',
                    height: '100%',
                    backgroundColor: deleteButtonColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    right: 0,
                    borderTopRightRadius: componentBorderRadius,
                    borderBottomRightRadius: componentBorderRadius,
                    flexDirection: 'row',
                    columnGap: 10,
                },
                deleteText: {
                    color: deleteTextColor,
                    fontWeight: 'bold',
                },
                swipeable: {
                    height: '100%',
                    backgroundColor: 'white',
                    borderRadius: componentBorderRadius,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    width: '100%',
                },
            }),
        [componentHeight, componentWidth, componentBorderRadius, deleteButtonColor, deleteTextColor]
    );

    return (
        <Animated.View exiting={FadeOutLeft} style={[styles.container, containerStyle]}>
            <AnimatedTouchableOpacity onPress={handleSwipeOrClick} style={[styles.deleteButton, deleteButtonStyle]}>
                <AnimatedFontAwesome
                    style={deleteIconStyle}
                    name={deleteIconName}
                    size={deleteIconSize}
                    color={deleteIconColor}
                />
                <Animated.Text style={[deleteTextStyle, styles.deleteText]}>Delete</Animated.Text>
            </AnimatedTouchableOpacity>
            <GestureDetector gesture={panGesture}>
                <Reanimated.View style={[styles.swipeable, animatedStyle]}>{children}</Reanimated.View>
            </GestureDetector>
        </Animated.View>
    );
};
