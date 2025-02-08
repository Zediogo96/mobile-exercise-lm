// TabTwoScreen.tsx
import { useBookmarkStore } from '@/services/zustand/bookmarksStore';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import BookmarksList from '@/components/bookmarks/BookmarksList';
import EmptyBookmarksList from '@/components/bookmarks/EmptyBookmarksList';
import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';

export default function TabTwoScreen() {
    const { bookmarks, removeBookmark } = useBookmarkStore();

    const callbackAction = useCallback(
        (id: string) => {
            removeBookmark(id);
        },
        [removeBookmark]
    );

    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    return (
        <View style={styles.container}>
            {!!Object.keys(bookmarks).length ? (
                <BookmarksList bookmarks={bookmarks} callbackAction={callbackAction} />
            ) : (
                <EmptyBookmarksList />
            )}
        </View>
    );
}

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
    });
