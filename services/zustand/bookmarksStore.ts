import { Hotel } from '@/types/hotel.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type BookmarkStore = {
    bookmarks: Record<string, any>; // Key-value store (hotel ID -> hotel data)
    addBookmark: (hotel: any) => void;
    removeBookmark: (id: string) => void;
    isBookmarked: (id: string) => boolean;
};

export const useBookmarkStore = create<BookmarkStore>()(
    persist(
        (set, get) => ({
            bookmarks: {},
            addBookmark: (hotel: Hotel) =>
                set((state) => {
                    return { bookmarks: { ...state.bookmarks, [hotel.id]: hotel } };
                }),
            removeBookmark: (id) =>
                set((state) => {
                    const newBookmarks = { ...state.bookmarks };
                    delete newBookmarks[id];
                    return { bookmarks: newBookmarks };
                }),
            isBookmarked: (id) => {
                const bookmarks = get().bookmarks;
                return !!bookmarks[id];
            },
        }),
        {
            name: 'bookmarks-storage', // Key in AsyncStorage
            storage: {
                getItem: async (name: string) => {
                    const value = await AsyncStorage.getItem(name);
                    return value ? JSON.parse(value) : null;
                },
                setItem: async (name: string, value: any) => {
                    await AsyncStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: async (name: string) => {
                    await AsyncStorage.removeItem(name);
                },
            },
        }
    )
);
