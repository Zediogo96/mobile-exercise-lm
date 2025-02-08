import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import { useFilterStore } from '@/services/zustand/hotelFilterStore';
import { SORT_OPTION_LABELS, SortOption } from '@/types/filter.types';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type SortOptionsProps = {
    onClose?: () => void;
    disabled?: boolean;
};

const SortOptions = ({ onClose }: SortOptionsProps) => {
    const { sortOption, setSortOption } = useFilterStore();

    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    const handleSortSelect = (option: SortOption) => {
        setSortOption(option);
        onClose?.();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Sort by</Text>
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

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.cardBackground,
        },
        header: {
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1.5,
            borderBottomColor: colors.filterHeaderSeparator,
        },
        headerTitle: {
            fontSize: 16,
            fontWeight: '600',
            color: colors.textTitle,
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
            borderBottomColor: colors.filterHeaderSeparator,
        },
        optionText: {
            fontSize: 16,
            color: colors.textSecondary,
        },
        selectedOptionText: {
            color: '#007AFF',
            fontWeight: '500',
        },
    });

export default SortOptions;
