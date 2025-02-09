# Mobile Exercise - LM

## Requirements

To run this application, you will need the following:

-   **Node.js:** Version 18 or higher is recommended.

-   **npm:** Version 8 or higher is recommended. npm is typically installed with Node.js.

## Installation

1.  **Clone the repository:**

    ```bash
    # HTTPS
    git clone https://github.com/Zediogo96/mobile-exercise-lm.git

    # SSH
    git clone git@github.com:Zediogo96/mobile-exercise-lm.git

    cd mobile-exercise-lm
    ```

2.  **Install dependencies:**

    ```bash
    npm install

    # This command is required to patch third-party libraries
    npm run postinstall
    ```

3.  **Prebuild the project:**

    ```bash

    # This command generates the native iOS and Android project files.
    npx expo prebuild

    ```

4.  **Run the app on your device/emulator:**

    -   **Android:** Run `npm run android` to build and run the app on an Android emulator/device. This will use the generated Android project.
    -   **iOS:** Run `npm run ios` to build and run the app on the iOS simulator/device. This will use the generated iOS project.
    -   **Expo Go:** Not supported, as the app uses native modules that require building the project.

## Libraries Used

This project leverages the following libraries to enhance functionality and development efficiency:

**Core Framework & Navigation:**

-   **React Native:** The primary framework for building cross-platform mobile applications using JS / TS.
-   **Expo:** A platform that simplifies React Native development, providing tools and services for building, deploying, and updating apps.
-   **Expo Router:** A file-based routing library for React Native, simplifying navigation within the app.

**UI & Styling:**

-   **@expo/vector-icons:** Provides a wide range of vector icons for use in the app's UI.
-   **react-native-snap-carousel:** A carousel component for displaying a series of items in a visually engaging way.
-   **@gorhom/bottom-sheet:** Provides a bottom sheet component for displaying contextual information or actions. Used for implementing the filtering / sort options.
-   **react-native-skeleton-placeholder:** Displays skeleton loading placeholders while data is being fetched, improving the user experience.
-   **react-native-fast-image:** A performant image loading component for React Native, improving image loading speed and caching.
-   **expo-blur:** Provides blur effects for UI elements, enhancing visual appeal.

**Data Management & API:**

-   **Axios:** A promise-based HTTP client for making API requests to fetch hotel data.
-   **@tanstack/react-query:** A powerful data fetching and caching library, used to efficiently manage API data and reduce unnecessary requests, while providing a simple and intuitive API for loading, caching, error handling, and more.
-   **@react-native-async-storage/async-storage:** Provides a simple, asynchronous, persistent key-value storage system for React Native 
-   **Zustand:** A small, fast, and scalable bearbones state-management solution, used for managing global app state & also data persistence (bookmarks).

**Device Features & Enhancements:**

-   **react-native-gesture-handler:** Provides a declarative API for managing gestures in React Native, improving touch interactions.
-   **react-native-reanimated:** A powerful animation library for React Native, enabling smooth and performant animations.
-   **react-native-maps:** Provides a map component for displaying hotel locations.

## Library Issues & Patches

This project utilizes `patch-package` to address issues in third-party libraries:

-   **`react-native-snap-carousel`:**
    -   Fixed an issue related to event bubbling or incorrect event handling within the carousel. This ensures that touch events and other interactions are correctly propagated and processed by the carousel and its parent components.
-   **`@react-native-masked-view/masked-view`:**
    -   Resolved a rendering issue on Android devices when used in conjunction with `react-native-skeleton-placeholder`. The original implementation resulted in a pitch-black background instead of the expected masked content. The patch ensures correct rendering of the masked view, allowing for proper display of skeleton placeholders.

## Weird Quirks

### FastImageWrapper

```ts
const DEFAULT_IMAGES = [
    DefaultHotel1,
    DefaultHotel2,
    DefaultHotel3,
    DefaultHotel4,
    DefaultHotel5,
    DefaultHotel6,
    DefaultHotel7,
    DefaultHotel8,
];

type FastImageWrapperProps = FastImageProps & {
    source: Source;
    style?: ImageStyle | ImageStyle[];
};

const FastImageWrapper = forwardRef<typeof FastImage, FastImageWrapperProps>(({ source, style, ...props }, ref) => {
    const [validSource, setValidSource] = useState<Source>(source);

    const defaultImage = useMemo(() => {
        const index = Math.floor(Math.random() * DEFAULT_IMAGES.length);
        return DEFAULT_IMAGES[index];
    }, []);

    useEffect(() => {
        if (typeof source === 'object' && source.uri) {
            fetch(source.uri, { method: 'HEAD' })
                .then((res) => {
                    if (res.status === 404) {
                        setValidSource(defaultImage);
                    } else {
                        setValidSource(source);
                    }
                })
                .catch(() => setValidSource(defaultImage));
        }
    }, [source, defaultImage]);

    return <FastImage ref={ref as any} source={validSource} style={style} {...props} />;
});

export default FastImageWrapper;
```

Some images from the API were returning 404, so I created a wrapper for the `FastImage` component that checks if the image is valid, using a simple fetch request using the 'HEAD' method. If the image is not valid, it will display a random default image from the list of default images.

### BlurFallback

```ts
import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';

interface BlurFallbackProps {
    intensity?: number;
    tint?: 'light' | 'dark' | 'default';
    style?: ViewStyle | ViewStyle[];
    children?: React.ReactNode;
}

const BlurFallback: React.FC<BlurFallbackProps> = ({ intensity = 20, tint = 'default', style, children }) => {
    if (Platform.OS === 'ios') {
        return (
            <BlurView style={style} intensity={intensity} tint={tint}>
                {children}
            </BlurView>
        );
    }

    const baseColor = tint === 'dark' ? 'rgba(0, 0, 0, ' : 'rgba(255, 255, 255, ';
    const opacity = (intensity / 100) * 0.4; // Reduced opacity for layering

    return (
        <View style={style}>
            <View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: baseColor + (opacity * 0.8).toFixed(2) + ')',
                }}
            />
            <View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: baseColor + (opacity * 0.6).toFixed(2) + ')',
                    transform: [{ translateX: 1 }, { translateY: 1 }],
                }}
            />
            <View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: baseColor + (opacity * 0.4).toFixed(2) + ')',
                    transform: [{ translateX: -1 }, { translateY: -1 }],
                }}
            />
            <View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: baseColor + (opacity * 0.2).toFixed(2) + ')',
                    transform: [{ translateX: 2 }, { translateY: -2 }],
                }}
            />
            {children}
        </View>
    );
};

export default BlurFallback;
```

Due to time limitations, i was initially focused only on the iOS platform, experimenting with somethings I haven't done before, like Expo Router and a blur based design. I had the design completely based on the blur effect, but when I started to implement the Android version, I realized that the blur effect has a lot of problems (mostly in performance, rendering issues, compatibility with other libraries, e.g. using blur caused animations from react-native-screens to make pages completely blank or opaque).
So I created a fallback view that would be displayed on Android devices, using a simple background color and opacity to simulate the blur effect (using a layering technique to create the blur effect).

### Fake Timeout for API Requests

```ts
import { API_URL } from '@/constants/api-urls';
import { Hotel } from '@/types/hotel.types';
import axios from 'axios';

// simple fetch
export const fetchHotels = async ({
    shouldFakeLoadingTime = false,
    fakeLoadingTime = 2000,
}: {
    shouldFakeLoadingTime?: boolean;
    fakeLoadingTime?: number;
} = {}): Promise<Hotel[]> => {
    const response = await axios.get(API_URL);
    const data: Hotel[] = response.data;

    if (shouldFakeLoadingTime) {
        await new Promise((resolve) => setTimeout(resolve, fakeLoadingTime));
    }

    if (!data) {
        throw new Error('Failed to fetch hotels');
    }

    return data;
};

// tanstack/react-query
export const useMostPopularHotels = () => {
    return useQuery({
        queryKey: ['hotels', 'hottest'],
        queryFn: () => fetchHotels({ shouldFakeLoadingTime: true, fakeLoadingTime: 5500 }),
        staleTime: DEFAULT_CACHE_TIME,
        select: (hotels) => hotels.sort((a, b) => b.userRating - a.userRating).slice(0, 5),
    });
};
```

## Recordings - Features Showcase

### Home Screen

https://github.com/user-attachments/assets/f818bbc9-cc8f-4a58-a17c-7b3c7d9d900a

### Search

https://github.com/user-attachments/assets/9dca86b5-ae21-4c67-bd40-b1b44a1b78db

### Filter

https://github.com/user-attachments/assets/694d2a0c-baa0-4967-97fd-b44224fbd856

### Details

https://github.com/user-attachments/assets/fc5bbe38-d8bd-457b-b277-8d92aaa2c606

### Bookmarks

https://github.com/user-attachments/assets/4f7b7ea8-6835-4084-be7f-e17bceea7864

### Dark Mode

https://github.com/user-attachments/assets/67bb59dd-6b12-49b6-a5f4-cc3f82f69a4f

## Author

-   **José Diogo** - [Zediogo96](https://github.com/Zediogo96)
