import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { useFilterStore } from '@/services/zustand/hotelFilterStore';

import NavigationStack from '@/components/navigation/NavigationStack';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'react-native';
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

    const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

    const headerTintColor = theme.colors.text;

    const headerSearchBarOptions = {
        placeholder: 'Search for hotels',
        hideWhenScrolling: false,
        onChangeText: (text = { nativeEvent: { text: '' } }) => {
            setSearchQuery(text.nativeEvent.text);
        },
        onBlur: () => {
            setSearchQuery(searchQuery);
        },
    };

    return (
        <ThemeProvider value={theme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                    <QueryClientProvider client={queryClient}>
                        <NavigationStack
                            headerTintColor={headerTintColor}
                            headerSearchBarOptions={headerSearchBarOptions}
                        />
                        <StatusBar translucent backgroundColor="transparent" />
                    </QueryClientProvider>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </ThemeProvider>
    );
}
