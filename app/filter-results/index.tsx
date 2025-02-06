import FilterAndSortActions from '@/components/filter-results/FilterAndSortActions';
import HotelCard from '@/components/filter-results/HotelCard';
import HotelListSkeleton from '@/components/filter-results/HotelListSkeleton';
import SortOptions from '@/components/filter-results/SortOptions';
import { useHotelsByFilter } from '@/services/react-query/hotels';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

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
    if (!hotels?.length) return <Text style={styles.statusText}>No hotels found matching your criteria</Text>;

    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <Animated.FlatList
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={styles.listContainer}
                    itemLayoutAnimation={LinearTransition}
                    data={hotels}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <HotelCard hotel={item} />}
                />
                <FilterAndSortActions handleSortPress={openBottomSheet} />

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
        </BottomSheetModalProvider>
    );
};

export default HotelList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
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
    listContainer: {
        alignItems: 'center',
        paddingVertical: 16,
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
