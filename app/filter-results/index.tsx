import FilterAndSortActions from '@/components/filter-results/FilterAndSortActions';
import HotelListSkeleton from '@/components/filter-results/HotelListSkeleton';
import ResultsList from '@/components/filter-results/ResultsList';
import SortOptions from '@/components/filter-results/SortOptions';
import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import { useHotelsByFilter } from '@/services/react-query/hotels';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const COLORS = {
    background: '#F5F5F5',
    cardBackground: '#FFFFFF',
    textDark: '#1A1A1A',
    textGrey: '#717171',
    border: '#E0E0E0',
    dotInactive: 'rgba(0, 0, 0, 0.2)',
    dotActive: '#000',
};

const HotelList = () => {
    const { data: hotels, isLoading, error } = useHotelsByFilter();
    const navigation = useNavigation();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    // Variables for bottom sheet
    const snapPoints = useMemo(() => ['50%'], []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                if (!hotels) return null;
                return <Text style={styles.topSectionQueryLength}>{hotels.length} hotels</Text>;
            },
        });
    }, [hotels]);

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior="close" />
        ),
        []
    );

    const openBottomSheet = () => {
        bottomSheetModalRef.current?.present();
    };

    const handleSheetClose = () => {
        bottomSheetModalRef.current?.dismiss();
    };

    if (isLoading) return <HotelListSkeleton />;
    if (error) return <Text style={styles.statusText}>Error loading hotels</Text>;

    const hasResults = hotels && hotels.length > 0;

    return (
        <View style={styles.container}>
            <ResultsList hotels={hotels} />
            <FilterAndSortActions handleSortPress={openBottomSheet} disabled={!hasResults} />

            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                backgroundStyle={styles.bottomSheetContainer}
            >
                <SortOptions onClose={handleSheetClose} />
            </BottomSheetModal>
        </View>
    );
};

export default HotelList;

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        bottomSheetContainer: {
            backgroundColor: '#FFFFFF',
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 20,
        },
        option: {
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0',
        },
        optionText: {
            fontSize: 16,
        },

        statusText: {
            textAlign: 'center',
            marginTop: 20,
            fontSize: 16,
            color: COLORS.textDark,
        },
        topSection: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: COLORS.cardBackground,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.border,
        },
        topSectionTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: COLORS.textDark,
        },
        topSectionQueryLength: {
            fontSize: 16,
            color: COLORS.textGrey,
        },
    });
