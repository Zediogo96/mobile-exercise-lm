import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import { useFilterStore } from '@/services/zustand/hotelFilterStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface FilterModalHeaderProps {
    title: string;
}

const FilterModalHeader: React.FC<FilterModalHeaderProps> = ({ title }) => {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    const { resetFilters } = useFilterStore((state) => state);

    const handleBackPress = () => {
        router.back();
    };

    const handleResetFilters = () => {
        resetFilters();
    };

    return (
        <View style={[styles.container, { marginTop: Platform.OS === 'ios' ? 0 : insets.top }]}>
            {/* Left section */}
            <View style={styles.leftContainer}>
                <TouchableOpacity onPress={handleBackPress} style={styles.iconButton}>
                    <Ionicons name="chevron-back" size={22} color={colors.textTitle} />
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
const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        container: {
            height: 50,
            flexDirection: 'row',
            backgroundColor: colors.filterHeaderBackground,
            borderBottomWidth: 1,
            borderBottomColor: colors.filterHeaderSeparator,
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
            color: colors.textTitle,
        },
        resetBtn: {
            color: colors.textSecondary,
        },
    });

export default FilterModalHeader;
