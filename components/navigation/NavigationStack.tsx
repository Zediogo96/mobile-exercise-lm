import FilterModalHeader from '@/components/filter-modal/FilterModalHeader';
import { JsStack } from '@/components/navigation/JsStack';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TransitionPresets } from '@react-navigation/stack';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';

type NavigationStackProps = {
    headerTintColor: string;
    headerSearchBarOptions: any;
};

const NavigationStack: React.FC<NavigationStackProps> = ({ headerTintColor, headerSearchBarOptions }) => {
    const router = useRouter();

    return (
        <JsStack
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

            <JsStack.Screen
                name="filter-modal/index"
                options={{
                    ...TransitionPresets.ModalPresentationIOS,
                    presentation: 'modal',
                    gestureEnabled: true,
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
                    headerTransparent: true,
                    headerTitle: 'Hotels',
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                router.replace('/(tabs)');
                            }}
                            style={{ marginLeft: 5 }}
                        >
                            <FontAwesome name="chevron-left" size={15} color={headerTintColor} />
                        </TouchableOpacity>
                    ),
                    headerTintColor: headerTintColor,
                    headerSearchBarOptions: headerSearchBarOptions,
                }}
            />
        </JsStack>
    );
};

export default NavigationStack;
