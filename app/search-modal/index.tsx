import { HotelSmallerCard } from '@/components/search-modal/HotelSmallerCard';
import { SearchHeader } from '@/components/search-modal/SearchHeader';
import { useHotels } from '@/services/react-query/hotels';
import { useFilterStore } from '@/services/zustand/hotelFilterStore';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SearchScreen() {
    const insets = useSafeAreaInsets();
    const { searchQuery, setSearchQuery } = useFilterStore();
    const { data: filteredHotels } = useHotels();
    const router = useRouter();

    const handleHotelPress = (hotelId: string) => {
        router.replace({
            pathname: '/hotel-details/[id]',
            params: { id: hotelId },
        });
    };

    return (
        <View style={styles.container}>
            <BlurView intensity={35} tint="dark" style={[styles.blurContainer, { paddingTop: insets.top }]}>
                <SearchHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} topInset={insets.top} />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    {filteredHotels?.map((hotel, index) => (
                        <HotelSmallerCard key={hotel.id} hotel={hotel} index={index} onPress={handleHotelPress} />
                    ))}
                </ScrollView>
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    blurContainer: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
});
