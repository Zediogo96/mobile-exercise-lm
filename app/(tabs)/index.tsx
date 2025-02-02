import { StyleSheet } from 'react-native';

import MostPopularCarousel from '@/components/home/MostPopularCarousel';
import { Text, View } from '@/components/Themed';
import { useHottestHotels } from '@/services/react-query/hotels';

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
        <View style={styles.container}>
            <MostPopularCarousel />
        </View>
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
