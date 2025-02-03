import { useFilterStore } from '@/services/zustand/hotelFilterStore';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TopSection = () => {
    const router = useRouter();

    const navigateToFilterModal = () => {
        router.push('/filter-modal');
    };



    return (
        <View style={s.container}>
            <Text style={s.title}>Where would you like to go?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Link href="/search-modal" style={s.buttonContainer}>
                    <FontAwesome name="search" size={20} color="#666" />
                    <Text style={s.searchInput}>Search for hotels, cities, or places</Text>
                </Link>

                <TouchableOpacity style={s.filterButton} onPress={navigateToFilterModal}>
                    <FontAwesome name="filter" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TopSection;

const s = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
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
        color: '#666',
    },

    filterButton: {
        backgroundColor: '#1C1C1C',
        padding: 16,
        borderRadius: 12,
    },
});
