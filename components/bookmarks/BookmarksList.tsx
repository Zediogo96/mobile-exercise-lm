import BookmarkCard from '@/components/bookmarks/BookmarksCard';
import { SwipeableIOS } from '@/components/UI/SwipeableIOS';
import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import { Hotel } from '@/types/hotel.types';
import React, { useMemo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import Animated, { LinearTransition } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const BookmarksList = ({
    bookmarks,
    callbackAction,
}: {
    bookmarks: Record<string, Hotel>;
    callbackAction: (id: string) => void;
}) => {
    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    const scrollGesture = Gesture.Native();

    return (
        <Animated.FlatList
            itemLayoutAnimation={LinearTransition}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            data={Object.values(bookmarks)}
            renderItem={({ item }) => (
                <SwipeableIOS
                    key={item.id}
                    callbackAction={() => callbackAction(item.id.toString())}
                    scrollGesture={scrollGesture}
                    containerStyle={styles.cardContainerStyle}
                >
                    <BookmarkCard hotel={item} />
                </SwipeableIOS>
            )}
            contentContainerStyle={styles.listContainer}
        />
    );
};

export default BookmarksList;

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        cardContainerStyle: {
            width: width * 0.9,
            height: 100,

            marginVertical: 6,
            boxShadow: '0px 1px 2px 1px rgba(0, 0, 0, 0.15)',
        },
        listContainer: {
            alignItems: 'center',
            paddingVertical: 10,
        },
    });
