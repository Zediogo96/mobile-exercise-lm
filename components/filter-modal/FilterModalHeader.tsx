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
    const { resetFilters } = useFilterStore((state) => state);

    const handleBackPress = () => {
        router.back();
    };

    const handleResetFilters = () => {
        resetFilters();
    };

    return (
        <View style={styles.container}>
            {/* Left section */}
            <View style={styles.leftContainer}>
                <TouchableOpacity onPress={handleBackPress} style={styles.iconButton}>
                    <Ionicons name="chevron-back" size={22} color="black" />
                </TouchableOpacity>
            </View>

            {/* Center section */}
            <View style={styles.centerContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>

            {/* Right section */}
            <View style={styles.rightContainer}>
                <TouchableOpacity onPress={handleResetFilters}>
                    <Text style={styles.resetBtn}>Reset all</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center', // Vertically center all sections
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10,
    },

    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButton: {
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    resetBtn: {
        color: '#666',
    },
});

export default FilterModalHeader;
