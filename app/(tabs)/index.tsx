import { StyleSheet } from 'react-native';

import MostPopularCarousel from '@/components/home/MostPopularCarousel';
import TopSection from '@/components/home/TopSection';

import { SafeAreaView } from 'react-native-safe-area-context';



export default function TabOneScreen() {
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
