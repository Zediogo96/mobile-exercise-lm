import { FlatList, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useBookmarkStore } from '@/services/zustand/bookmarksStore';

export default function TabTwoScreen() {
    const { bookmarks } = useBookmarkStore();

    console.log('🚀 ~ TabTwoScreen ~ bookmarks', bookmarks);

    return (
        <View style={styles.container}>
            <FlatList
                data={Object.values(bookmarks)}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View key={item.id}>
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
        alignItems: 'center',
        justifyContent: 'center',
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
