import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';

const EmptyResults = () => {
    return (
        <Animated.Text entering={FadeInLeft.delay(250)} style={styles.text}>
            No hotels found.
        </Animated.Text>
    );
};

export default EmptyResults;

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: 'white',
        marginHorizontal: 20,
        fontWeight: 'bold',

        // text shadow
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
});
