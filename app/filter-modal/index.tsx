import BudgetPicker from '@/components/filter-modal/BudgetPicker';
import StarsPicker from '@/components/filter-modal/StarsPicker';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SearchScreen() {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <BudgetPicker />
            <StarsPicker />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
