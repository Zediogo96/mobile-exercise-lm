import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TopSection = () => {
    const router = useRouter();

    const navigateToFilterModal = () => {
        router.push('/filter-modal');
    };

    const navigateToSearchModal = () => {
        router.push('/search-modal');
    };

    return (
        <View style={s.container}>
            <Text style={s.title}>Where would you like to go?</Text>
            <View style={s.row}>
                <TouchableOpacity style={s.buttonContainer} onPress={navigateToSearchModal}>
                    <FontAwesome style={s.searchIcon} name="search" size={15} color="#666" />
                    <Text style={s.searchInput}>Search for hotels, cities, or places</Text>
                </TouchableOpacity>

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
        justifyContent: 'space-between',
        gap: 16,
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
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        padding: 16,
        borderRadius: 12,
        // Shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,
    },
    searchIcon: {
        marginRight: 10,
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
