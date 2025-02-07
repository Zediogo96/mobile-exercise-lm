// TabTwoScreen.tsx
import FastImageWrapper from '@/components/Helper/FastImageWrapper';
import { SwipeableIOS } from '@/components/UI/SwipeableIOS';
import { useBookmarkStore } from '@/services/zustand/bookmarksStore';
import { Hotel } from '@/types/hotel.types';
import React, { useCallback, useRef } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import Animated, { LinearTransition } from 'react-native-reanimated';

import LottieView from 'lottie-react-native';
const { width } = Dimensions.get('window');

const BookmarkCard = ({ hotel }: { hotel: Hotel }) => {
    return (
        <View style={styles.card}>
            <FastImageWrapper source={{ uri: hotel.gallery[0] }} style={styles.image} resizeMode="cover" />
            <View style={styles.details}>
                <Text style={styles.name}>{hotel.name}</Text>
                <Text style={styles.location}>
                    {hotel.location?.city}, {hotel.location?.address}
                </Text>
            </View>
        </View>
    );
};

const BookmarkList = ({
    bookmarks,
    callbackAction,
}: {
    bookmarks: Record<string, Hotel>;
    callbackAction: (id: string) => void;
}) => {
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

const EmptyBookmarkList = () => {
    const animation = useRef<LottieView>(null);

    return (
        <SafeAreaView style={styles.emptyListContainer}>
            <LottieView
                ref={animation}
                style={styles.lottie}
                source={require('@/assets/animations/empty-results.json')}
                autoPlay
                loop
            />

            <Text style={styles.emptyListText}>No bookmarks yet</Text>
            <Text style={{ fontSize: 16, color: '#666', marginTop: 10 }}>
                {' '}
                Found an interesting hotel? Bookmark it!
            </Text>
        </SafeAreaView>
    );
};

export default function TabTwoScreen() {
    const { bookmarks, removeBookmark } = useBookmarkStore();

    const callbackAction = useCallback(
        (id: string) => {
            removeBookmark(id);
        },
        [removeBookmark]
    );

    return (
        <View style={styles.container}>
            {!!Object.keys(bookmarks).length ? (
                <BookmarkList bookmarks={bookmarks} callbackAction={callbackAction} />
            ) : (
                <EmptyBookmarkList />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainerStyle: {
        width: width * 0.9,
        height: 80,

        marginVertical: 6,
        boxShadow: '0px 1px 2px 2px rgba(0, 0, 0, 0.15)',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    listContainer: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 15,
        marginRight: 12,
    },
    details: {
        flex: 1,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    location: {
        fontSize: 14,
        color: '#666',
    },
    emptyListContainer: {
        flex: 1,
        marginTop: 200,

        alignItems: 'center',
    },
    lottie: {
        height: 300,
        width: 300,

        marginTop: -100,
    },
    emptyListText: {
        fontSize: 20,
        marginTop: -10,
    },
});
