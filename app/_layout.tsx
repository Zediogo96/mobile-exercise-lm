import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import FilterModalHeader from '@/components/filter-modal/FilterModalHeader';
import { useColorScheme } from '@/components/useColorScheme';
import { useFilterStore } from '@/services/zustand/hotelFilterStore';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

const queryClient = new QueryClient();

function RootLayoutNav() {
    const colorScheme = useColorScheme();
    const router = useRouter();

    const { searchQuery, setSearchQuery } = useFilterStore();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                    <QueryClientProvider client={queryClient}>
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
                                    presentation: 'transparentModal', // ✅ Makes modal background transparent
                                    animation: 'fade', // ✅ Smooth transition
                                }}
                            />
                            <Stack.Screen
                                name="filter-modal/index"
                                options={{
                                    presentation: 'modal', // ✅ Makes modal background transparent
                                    animation: 'slide_from_bottom', // ✅ Smooth transition
                                    headerShown: true,
                                    header: (props) => <FilterModalHeader title="Filter" />,
                                }}
                            />
                            <Stack.Screen name="hotel-details/[id]/index" />
                            <Stack.Screen name="book/[id]/index" />

                            <Stack.Screen
                                name="filter-results/index"
                                options={{
                                    headerShown: true,
                                    headerBlurEffect: 'regular',
                                    headerTransparent: true,

                                    headerTitle: 'Hotels',
                                    headerShadowVisible: false,
                                    headerLeft: () => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    router.replace('/(tabs)');
                                                }}
                                                style={{ marginLeft: 5 }}
                                            >
                                                <FontAwesome name="chevron-left" size={15} color="black" />
                                            </TouchableOpacity>
                                        );
                                    },

                                    headerTintColor: 'black',

                                    headerSearchBarOptions: {
                                        placeholder: 'Search for hotels',
                                        hideWhenScrolling: false, // Changed this to false
                                        onChangeText: (text) => {
                                            setSearchQuery(text.nativeEvent.text);
                                        },
                                        onBlur: () => {
                                            setSearchQuery(searchQuery);
                                        },
                                    },
                                }}
                            />
                        </Stack>
                    </QueryClientProvider>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </ThemeProvider>
    );
}
