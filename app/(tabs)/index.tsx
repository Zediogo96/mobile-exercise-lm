import { StyleSheet } from 'react-native';

import MostPopularCarousel from '@/components/home/MostPopularCarousel';
import TopSection from '@/components/home/TopSection';
import { Text } from '@/components/Themed';
import { useHottestHotels } from '@/services/react-query/hotels';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabOneScreen() {
    const { data: hotels, isLoading, error } = useHottestHotels();
    console.log('🚀 ~ TabOneScreen ~ hotels:', hotels);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <TopSection />
            <MostPopularCarousel />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
