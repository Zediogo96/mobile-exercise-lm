import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import LottieView from 'lottie-react-native';
import React, { useMemo, useRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const EmptyBookmarksList = () => {
    const animation = useRef<LottieView>(null);
    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    return (
        <SafeAreaView style={styles.emptyListContainer}>
            <Animated.View entering={FadeIn.delay(250)} style={styles.lottieContainer}>
                <LottieView
                    ref={animation}
                    style={styles.lottie}
                    source={require('@/assets/animations/empty-results.json')}
                    autoPlay
                    loop
                />
            </Animated.View>

            <Animated.Text entering={FadeIn.delay(500)} style={styles.emptyListMainText}>
                No bookmarks yet
            </Animated.Text>
            <Animated.Text entering={FadeIn.delay(650)} style={styles.emptyListSecondaryText}>
                Found an interesting hotel? Bookmark it!
            </Animated.Text>
        </SafeAreaView>
    );
};

export default EmptyBookmarksList;

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        emptyListContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background,
        },
        lottieContainer: {
            height: 300,
            width: 300,
            marginTop: -150,
        },
        lottie: {
            height: 300,
            width: 300,
        },
        emptyListMainText: {
            fontSize: 20,
            marginTop: -10,
            color: colors.text,
        },
        emptyListSecondaryText: { fontSize: 16, color: colors.textSecondary, marginTop: 10 },
    });
