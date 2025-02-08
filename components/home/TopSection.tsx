import Colors from '@/constants/Colors';
import { useMostPopularHotels } from '@/services/react-query/hotels';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { FC, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

const TopSection: FC = () => {
    const router = useRouter();
    const { isLoading } = useMostPopularHotels();
    const theme = useColorScheme() ?? 'light';

    const styles = useMemo(() => makeStyles(Colors[theme]), [theme]);

    const navigateToFilterModal = () => {
        router.push('/filter-modal');
    };

    const navigateToSearchModal = () => {
        router.push('/search-modal');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Where would you like to go?</Text>
            <View style={styles.row}>
                <TouchableOpacity style={styles.buttonContainer} onPress={navigateToSearchModal} disabled={isLoading}>
                    <FontAwesome style={styles.searchIcon} name="search" size={16} color="#888" />
                    <Text style={styles.searchInput}>Search for hotels, cities, or places</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={navigateToFilterModal}
                    disabled={isLoading}
                    activeOpacity={0.8}
                >
                    <FontAwesome name="filter" size={18} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TopSection;

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        container: {
            marginHorizontal: 20,
        },
        title: {
            fontSize: 25,
            fontWeight: 'bold',
            marginBottom: 20,
            color: colors.textTitle,
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
            backgroundColor: colors.searchBarHomeColor,
            paddingVertical: 14,
            paddingHorizontal: 16,
            borderRadius: 14,

            boxShadow: '0px 1px 4px  rgba(0, 0, 0, 0.35)',
        },
        searchIcon: {
            marginRight: 12,
        },
        searchInput: {
            color: colors.textLightGray,
            fontSize: 14,
        },
        filterButton: {
            backgroundColor: colors.filterButton,
            padding: 14,
            borderRadius: 14,
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,

            boxShadow: '0px 2px 4px rgba(245, 244, 244, 0.15)',
        },
    });
