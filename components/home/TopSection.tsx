import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TopSection = () => {
    return (
        <View style={s.container}>
            <Text style={s.title}>Where would you like to go?</Text>
            <Link href="/search-modal" style={s.buttonContainer}>
                <FontAwesome name="search" size={20} color="#666" />
                <Text style={s.searchInput}>Search for hotels, cities, or places</Text>
            </Link>
        </View>
    );
};

export default TopSection;

const s = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        padding: 16,
        borderRadius: 12,
    },
    searchInput: {
        marginLeft: 16,
        color: '#666',
    },

});
