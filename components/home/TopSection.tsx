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
                    <FontAwesome style={s.searchIcon} name="search" size={16} color="#888" />
                    <Text style={s.searchInput}>Search for hotels, cities, or places</Text>
                </TouchableOpacity>

                <TouchableOpacity style={s.filterButton} onPress={navigateToFilterModal}>
                    <FontAwesome name="filter" size={18} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TopSection;

const s = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginVertical: 10,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 2, // Android shadow
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        color: '#888',
        fontSize: 14,
    },
    filterButton: {
        backgroundColor: '#1C1C1C',
        padding: 14,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        width: 48, // Makes it circular
        height: 48,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 3, // Android shadow
    },
});
