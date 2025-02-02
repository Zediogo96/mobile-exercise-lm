import { useHotels } from '@/services/react-query/hotels';
import { useFilterStore } from '@/services/zustand/hotelFilterStore';
import { BlurView } from 'expo-blur';
import { StyleSheet, Text, TextInput } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function SearchScreen() {
    const insets = useSafeAreaInsets(); // Get the safe area insets
    const { searchQuery, setSearchQuery } = useFilterStore(); // Get the search query from the store
    console.log('🚀 ~ SearchScreen ~ searchQuery:', searchQuery);

    const { data: filteredHotels } = useHotels();

    console.log('🚀 ~ SearchScreen ~ filteredHotels:', filteredHotels);

    return (
        <SafeAreaView style={[styles.container]}>
            <BlurView intensity={35} tint="dark" style={[styles.blurContainer, { paddingTop: insets.top }]}>
                <AnimatedTextInput
                    entering={FadeInUp}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={[styles.input, { marginTop: insets.top }]} // Respect the top inset
                    placeholder="Search for hotels, cities, or places"
                />

                {/* Display filtered hotels */}
                {filteredHotels?.map((hotel) => (
                    <Text key={hotel.id}>{hotel.name}</Text>
                ))}
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
