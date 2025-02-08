import HotelCard from '@/components/filter-results/HotelCard';
import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import { Hotel } from '@/types/hotel.types';
import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated';

type ResultsListProps = {
    hotels: Hotel[] | undefined;
};

const ResultsList = ({ hotels }: ResultsListProps) => {
    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    if (hotels?.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Animated.Text entering={FadeInDown} style={styles.noResults}>
                    No results found
                </Animated.Text>
            </View>
        );
    }

    return (
        <Animated.FlatList
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={styles.listContainer}
            itemLayoutAnimation={LinearTransition}
            data={hotels}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <HotelCard hotel={item} />}
        />
    );
};

export default memo(ResultsList);

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        listContainer: {
            alignItems: 'center',
            backgroundColor: colors.background,
        },
        noResults: {
            textAlign: 'center',
            marginTop: 20,
            fontSize: 16,
            color: colors.textSecondary,
        },
    });
