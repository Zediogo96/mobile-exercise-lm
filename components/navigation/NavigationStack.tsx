import FilterModalHeader from '@/components/filter-modal/FilterModalHeader';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import { useFilterStore } from '@/services/zustand/hotelFilterStore';
import { FontAwesome } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { NativeSyntheticEvent, Platform, TextInputChangeEventData, TouchableOpacity } from 'react-native';

const NavigationStack: React.FC = () => {
    const router = useRouter();
    const colors = useColorsFromTheme();

    const { searchQuery, setSearchQuery } = useFilterStore();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                headerBackTitle: '',
                gestureDirection: 'horizontal',
            }}
        >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
                name="search-modal/index"
                options={{
                    ...Platform.select({
                        ios: {
                            presentation: 'transparentModal', // ✅ Makes modal background transparent
                        },
                        android: {
                            presentation: 'modal', // ✅ Makes modal background transparent
                        },
                    }),

                    animation: 'fade_from_bottom', // ✅ Smooth transition
                }}
            />
            <Stack.Screen
                name="filter-modal/index"
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom', // ✅ Smooth transition
                    headerShown: true,
                    header: () => <FilterModalHeader title="Filter" />,
                }}
            />
            <Stack.Screen name="hotel-details/[id]/index" />

            <Stack.Screen
                name="filter-results/index"
                options={{
                    headerShown: true,
                    headerBlurEffect: 'regular',
                    headerTransparent: Platform.OS === 'ios',
                    headerLeft: () => {
                        return Platform.OS === 'ios' ? (
                            <TouchableOpacity
                                onPress={() => {
                                    router.replace('/(tabs)');
                                }}
                                style={{ marginLeft: 5, marginRight: 10 }}
                            >
                                <FontAwesome name="chevron-left" size={15} color={colors.textTitle} />
                            </TouchableOpacity>
                        ) : null;
                    },

                    headerTitle: 'Hotels',

                    headerTintColor: colors.text,
                    headerSearchBarOptions: {
                        placeholder: 'Search for hotels',
                        headerIconColor: colors.textSecondary,
                        hintTextColor: colors.textSecondary,
                        tintColor: colors.textSecondary,
                        shouldShowHintSearchIcon: true,

                        hideWhenScrolling: true,
                        onChangeText: (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                            setSearchQuery(e.nativeEvent.text);
                        },
                        onBlur: () => {
                            setSearchQuery(searchQuery);
                        },
                    },
                }}
            />
        </Stack>
    );
};

export default NavigationStack;
