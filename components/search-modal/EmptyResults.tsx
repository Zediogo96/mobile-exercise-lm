import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import anim from '@/assets/animations/empty-hotels-result.json';

const EmptyResults = () => {
    return (
        <View>
            <LottieView source={anim} autoPlay loop style={styles.animation} />
        </View>
    );
};

export default EmptyResults;

const styles = StyleSheet.create({
    animation: {
        width: 200,
        height: 200,
    },
});
