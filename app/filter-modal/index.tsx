import BudgetPicker from '@/components/filter-modal/BudgetPicker';
import StarsPicker from '@/components/filter-modal/StarsPicker';
import UserRating from '@/components/filter-modal/UserRatingPicker';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FilterModal() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const onViewResults = () => {
        router.replace('/filter-results');
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={[styles.contentContainer]}
        >
            <BudgetPicker />
            <StarsPicker />
            <UserRating />

            {/* View results button */}

            <TouchableOpacity style={styles.button} onPress={onViewResults}>
                <Text style={styles.buttonText}>View Results</Text>
            </TouchableOpacity>

            {/* View at the bottom to add padding */}
            <View style={{ height: insets.bottom }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    contentContainer: {
        padding: 16,
    },

    button: {
        backgroundColor: 'black',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
    },

    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});
