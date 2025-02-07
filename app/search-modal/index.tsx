import EmptyResults from '@/components/search-modal/empty-results';
import { HotelSmallerCard } from '@/components/search-modal/HotelSmallerCard';
import { SearchHeader } from '@/components/search-modal/SearchHeader';
import { useQuicksearchHotels } from '@/services/react-query/hotels';
import { useFilterStore } from '@/services/zustand/hotelFilterStore';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SearchScreen() {
    const insets = useSafeAreaInsets();

    const { data: filteredHotels } = useQuicksearchHotels();
    const { searchQuery, setSearchQuery } = useFilterStore();
    const router = useRouter();

    const handleHotelPress = (hotelId: string) => {
        router.replace({
            pathname: '/hotel-details/[id]',
            params: { id: hotelId },
        });
    };

    const renderResults = useCallback(() => {
        if (!filteredHotels) return null;

        if (filteredHotels.length === 0) {
            return <EmptyResults />;
        }

        return filteredHotels.map((hotel, index) => (
            <HotelSmallerCard key={hotel.id} hotel={hotel} index={index} onPress={handleHotelPress} />
        ));
    }, [filteredHotels]);

    return (
        <View style={styles.container}>
            <BlurView intensity={35} tint="dark" style={[styles.blurContainer, { paddingTop: insets.top }]}>
                <SearchHeader
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    hotelsCount={filteredHotels?.length || 0}
                />

                <ScrollView
                    keyboardDismissMode="on-drag"
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    {renderResults()}
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
