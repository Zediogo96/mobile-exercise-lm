// CustomHeader.tsx
import { useFilterStore } from '@/services/zustand/hotelFilterStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FilterModalHeaderProps {
    title: string;
}

const FilterModalHeader: React.FC<FilterModalHeaderProps> = ({ title }) => {
    const router = useRouter();

    // Correctly select the resetFilters function
    const { priceRange, resetFilters } = useFilterStore((state) => state);

    console.log(priceRange);

    const handleBackPress = () => {
        router.back();
    };

    const handleResetFilters = () => {
        resetFilters();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                <Ionicons name="chevron-back" size={22} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={handleResetFilters}>
                <Text style={styles.resetBtn}> Reset all </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    backButton: {
        padding: 5,
    },
    title: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    resetBtn: {
        color: '#666',
    },
});

export default FilterModalHeader;
