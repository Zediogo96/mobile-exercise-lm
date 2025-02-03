import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface SearchHeaderProps {
    searchQuery: string;
    onSearchChange: (text: string) => void;
    topInset: number;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const SearchHeader = ({ searchQuery, onSearchChange, topInset }: SearchHeaderProps) => {
    return (
        <>
            <AnimatedTextInput
                entering={FadeInUp}
                value={searchQuery}
                onChangeText={onSearchChange}
                style={[styles.input, { marginTop: topInset - 50 }]}
                placeholder="Search for hotels, cities, or places"
            />

            <Text style={styles.sectionTitle}>Filtered hotels</Text>

            <View style={styles.separator} />
        </>
    );
};
const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 20,
    },
    separator: {
        height: 1,
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        marginHorizontal: 20,
        marginVertical: 25,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
});
