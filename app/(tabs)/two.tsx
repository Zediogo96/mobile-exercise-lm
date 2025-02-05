import { FlatList, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useBookmarkStore } from '@/services/zustand/bookmarksStore';

export default function TabTwoScreen() {
    const { bookmarks } = useBookmarkStore();

    return (
        <View style={styles.container}>
            <FlatList
                style={{ width: '100%', backgroundColor: 'transparent' }}
                data={Object.values(bookmarks)}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                    </View>
                )}
            />
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
