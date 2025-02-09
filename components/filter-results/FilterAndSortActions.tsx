import BlurFallbackView from '@/components/Helper/BlurFallbackView';
import { useFilterStore } from '@/services/zustand/hotelFilterStore';
import { MaterialIcons } from '@expo/vector-icons';

import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type FilterAndSortActionsProps = {
    handleSortPress: () => void;
    disabled?: boolean;
};

const FilterAndSortActions = ({ handleSortPress, disabled }: FilterAndSortActionsProps) => {
    const router = useRouter();

    const { hasFiltersApplied, hasSortApplied } = useFilterStore();

    const handleFilterPress = useCallback(() => {
        router.push('/filter-modal');
    }, []);

    return (
        <BlurFallbackView intensity={100} tint="dark" style={[styles.blurView]}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleFilterPress}>
                    <View>
                        <MaterialIcons name="filter-list" size={24} color="white" />
                        {hasFiltersApplied() && <View style={styles.indicator} />}
                    </View>
                    <Text style={styles.buttonText}>Filters</Text>
                </TouchableOpacity>

                <View style={styles.separator} />

                <TouchableOpacity style={styles.button} onPress={handleSortPress} disabled={disabled}>
                    <Text style={styles.buttonText}>Sort</Text>
                    <View>
                        <MaterialIcons name="sort" size={24} color="white" />
                        {hasSortApplied() && <View style={styles.indicator} />}
                    </View>
                </TouchableOpacity>
            </View>
        </BlurFallbackView>
    );
};

export default FilterAndSortActions;

const styles = StyleSheet.create({
    blurView: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 30 : 80,
        left: 0,
        right: 0,
        height: 50,
        marginHorizontal: 90,
        borderRadius: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1, padding: 10 },
    buttonText: { color: 'white', marginHorizontal: 5 },
    separator: { width: 1, height: 40, backgroundColor: 'rgba(255, 255, 255, 0.5)' },
    indicator: {
        width: 8,
        height: 8,
        backgroundColor: 'rgba(222, 91, 91, 0.5)',
        borderRadius: 5,
        position: 'absolute',
        top: -1,
        right: -1,
    },
});
