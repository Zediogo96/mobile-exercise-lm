import { StyleSheet } from 'react-native';

import { BlurView } from 'expo-blur';

export default function SearchScreen() {
    return <BlurView intensity={35} tint="dark" style={styles.container}></BlurView>;
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
