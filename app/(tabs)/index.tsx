import { ScrollView, StyleSheet } from 'react-native';

import TopSection from '@/components/home/TopSection';

import GetInspiredSection from '@/components/home/GetInspiredSection';
import MostPopularCarousel from '@/components/home/MostPopularCarousel';
import CarouselSkeleton from '@/components/home/skeletons/CarouselSkeleton';
import GetInspiredSkeleton from '@/components/home/skeletons/GetInspiredSkeleton';
import { useMostPopularHotels } from '@/services/react-query/hotels';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabOneScreen() {
    const { isLoading } = useMostPopularHotels();
    return (
        <SafeAreaView style={styles.container}>
            <TopSection />
            <ScrollView showsVerticalScrollIndicator={false}>
                {isLoading ? <CarouselSkeleton /> : <MostPopularCarousel />}
                {isLoading ? <GetInspiredSkeleton /> : <GetInspiredSection />}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
