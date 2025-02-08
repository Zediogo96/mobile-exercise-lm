import BudgetPicker from '@/components/filter-modal/BudgetPicker';
import StarsPicker from '@/components/filter-modal/StarsPicker';
import UserRating from '@/components/filter-modal/UserRatingPicker';
import BlurFallbackView from '@/components/Helper/BlurFallbackView';
import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';

import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FilterModal() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    const onViewResults = () => {
        router.replace('/filter-results');
    };

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}
                contentContainerStyle={[styles.contentContainer]}
            >
                <BudgetPicker />
                <StarsPicker />
                <UserRating />

                {/* View at the bottom to add padding */}
                <View style={{ height: 100 }} />
            </ScrollView>
            {/* View results button */}
            <BlurFallbackView intensity={20} tint="light" style={styles.bottomContainer}>
                <TouchableOpacity style={styles.button} onPress={onViewResults}>
                    <Text style={styles.buttonText}>View Results</Text>
                </TouchableOpacity>
            </BlurFallbackView>
        </>
    );
}

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        bottomContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
        },
        container: {
            flex: 1,

            backgroundColor: colors.filterBackground,
        },

        contentContainer: {
            padding: 16,
        },

        button: {
            backgroundColor: colors.filterActionButton,
            padding: 16,
            borderRadius: 10,
            alignItems: 'center',
            width: '75%',
            alignSelf: 'center',
        },

        buttonText: {
            color: 'white',
            fontSize: 18,
        },
    });
