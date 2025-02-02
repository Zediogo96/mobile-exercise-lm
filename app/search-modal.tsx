import { BlurView } from 'expo-blur';
import { StyleSheet, TextInput } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function SearchScreen() {
    const insets = useSafeAreaInsets(); // Get the safe area insets

    return (
        <SafeAreaView style={[styles.container]}>
            <BlurView intensity={35} tint="dark" style={[styles.blurContainer, { paddingTop: insets.top }]}>
                <AnimatedTextInput
                    entering={FadeInUp}
                    style={[styles.input, { marginTop: insets.top - 20 }]} // Respect the top inset
                    placeholder="Search for hotels, cities, or places"
                />

                
            </BlurView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    blurContainer: {
        flex: 1,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 20,
    },
});
