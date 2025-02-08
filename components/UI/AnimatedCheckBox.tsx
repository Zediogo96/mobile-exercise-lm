import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import { useEffect, useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface AnimatedCheckboxProps {
    selected: boolean;
    onPress: () => void;
}

const AnimatedCheckbox: React.FC<AnimatedCheckboxProps> = ({ selected, onPress }) => {
    const scale = useSharedValue(selected ? 1 : 0);

    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    useEffect(() => {
        scale.value = withTiming(selected ? 1 : 0, { duration: 300 });
    }, [selected, scale]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <TouchableOpacity style={styles.checkbox} onPress={onPress}>
            <Animated.View style={[styles.checkboxInner, animatedStyle]} />
        </TouchableOpacity>
    );
};

export default AnimatedCheckbox;

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        checkbox: {
            width: 20,
            height: 20,

            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center',

            backgroundColor: '#fff',

            // shadow
            shadowColor: '#000',
            shadowOffset: { width: 0.5, height: 0.5 },
            shadowOpacity: 0.5,
            shadowRadius: 1.5,
            elevation: 5,
        },
        checkboxInner: {
            width: 14,
            height: 14,
            borderRadius: 4,
            backgroundColor: '#aaa',
        },
    });
