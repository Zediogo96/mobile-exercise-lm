import HotelCard from '@/components/filter-results/HotelCard';
import { useThemeColor } from '@/components/Themed';
import { Hotel } from '@/types/hotel.types';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated';

type ResultsListProps = {
    hotels: Hotel[] | undefined;
};

const ResultsList = ({ hotels }: ResultsListProps) => {
    const darkText = useThemeColor({}, 'textDark');

    if (hotels?.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Animated.Text entering={FadeInDown} style={[styles.noResults, { color: darkText }]}>
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

const styles = StyleSheet.create({
    listContainer: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    noResults: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
});
