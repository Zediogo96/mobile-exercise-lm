import { useFilterStore } from '@/services/zustand/hotelFilterStore';
import { SORT_OPTION_LABELS, SortOption } from '@/types/filter.types';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type SortOptionsProps = {
    onClose?: () => void;
};

const SortOptions = ({ onClose }: SortOptionsProps) => {
    const { sortOption, setSortOption } = useFilterStore();

    const handleSortSelect = (option: SortOption) => {
        setSortOption(option);
        onClose?.();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Sort</Text>
            </View>

            <View style={styles.optionsContainer}>
                {Object.values(SortOption).map((option) => (
                    <TouchableOpacity key={option} style={styles.optionRow} onPress={() => handleSortSelect(option)}>
                        <Text style={[styles.optionText, sortOption === option && styles.selectedOptionText]}>
                            {SORT_OPTION_LABELS[option]}
                        </Text>
                        {sortOption === option && <MaterialIcons name="check" size={24} color="#007AFF" />}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
    },
    header: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
    },
    optionsContainer: {
        padding: 16,
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    optionText: {
        fontSize: 16,
        color: '#333333',
    },
    selectedOptionText: {
        color: '#007AFF',
        fontWeight: '500',
    },
});

export default SortOptions;
