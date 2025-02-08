import { ScrollView, StyleSheet, View } from 'react-native';

import TopSection from '@/components/home/TopSection';

import GetInspiredCarousel from '@/components/home/get-inspired-carousel/GetInspiredCarousel';
import MostPopularCarousel from '@/components/home/most-popular-carousel/MostPopularCarousel';
import GetInspiredSkeleton from '@/components/home/skeletons/GetInspiredSkeleton';
import MostPopularSkeleton from '@/components/home/skeletons/MostPopularSkeleton';
import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import { useMostPopularHotels } from '@/services/react-query/hotels';
import { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabOneScreen() {
    const colors = useColorsFromTheme();
    const { isLoading } = useMostPopularHotels();

    const styles = useMemo(() => makeStyles(colors), [colors]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TopSection />
                {isLoading ? <MostPopularSkeleton /> : <MostPopularCarousel />}
                {isLoading ? <GetInspiredSkeleton /> : <GetInspiredCarousel />}
                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
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
