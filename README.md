## Requirements

To run this application, you will need the following:

-   **Node.js:** Version 18 or higher is recommended.

-   **npm:** Version 8 or higher is recommended. npm is typically installed with Node.js.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Zediogo96/lastminute.com.git
    cd [Your Repository Directory]
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install
    ```

3.  **Prebuild the project:**

    ```bash
    npx expo prebuild
    ```

    -   This command generates the **native iOS** and **Android** project files.
    -   This command is required before running the app on an emulator or device

4.  **Run the app on your device/emulator:**

    -   **Android:** Run `npm run android` to build and run the app on an Android emulator/device. This will use the generated Android project.
    -   **iOS:** Run `npm run ios` to build and run the app on the iOS simulator/device. This will use the generated iOS project.
    -   **Expo Go:** Not supported, as the app uses native modules that require building the project.

## Libraries Used

This project leverages the following libraries to enhance functionality and development efficiency:

**Core Framework & Navigation:**

-   **React Native:** The primary framework for building cross-platform mobile applications using JavaScript.
-   **Expo:** A platform that simplifies React Native development, providing tools and services for building, deploying, and updating apps. Specifically, Expo is used for managed workflow, providing over-the-air updates and access to device features.
-   **Expo Router:** A file-based routing library for React Native, simplifying navigation within the app.

**UI & Styling:**

-   **@expo/vector-icons:** Provides a wide range of vector icons for use in the app's UI.
-   **react-native-snap-carousel:** A carousel component for displaying a series of items in a visually engaging way.
-   **@gorhom/bottom-sheet:** Provides a bottom sheet component for displaying contextual information or actions. Used for implementing the filtering options.
-   **react-native-skeleton-placeholder:** Displays skeleton loading placeholders while data is being fetched, improving the user experience.
-   **react-native-fast-image:** A performant image loading component for React Native, improving image loading speed and caching.
-   **expo-blur:** Provides blur effects for UI elements, enhancing visual appeal.

**Data Management & API:**

-   **Axios:** A promise-based HTTP client for making API requests to fetch hotel data.
-   **@tanstack/react-query:** A powerful data fetching and caching library, used to efficiently manage API data and reduce unnecessary requests.
-   **@react-native-async-storage/async-storage:** Provides a simple, asynchronous, persistent key-value storage system for React Native.
-   **Zustand:** A small, fast, and scalable bearbones state-management solution, used for managing global app state & also data persistence.

**Device Features & Enhancements:**

-   **react-native-gesture-handler:** Provides a declarative API for managing gestures in React Native, improving touch interactions.
-   **react-native-reanimated:** A powerful animation library for React Native, enabling smooth and performant animations.
-   **react-native-maps:** Provides a map component for displaying hotel locations.
-   **expo-haptics:** Provides access to haptic feedback on devices, enhancing the user experience.

**Other:**

-   **react-native-web:** Enables running React Native components in a web browser for development and testing.

## Library Issues & Patches

This project utilizes `patch-package` to address issues in third-party libraries:

-   **`react-native-snap-carousel`:**
    -   Fixed an issue related to event bubbling or incorrect event handling within the carousel. This ensures that touch events and other interactions are correctly propagated and processed by the carousel and its parent components.
-   **`@react-native-masked-view/masked-view`:**
    -   Resolved a rendering issue on Android devices when used in conjunction with `react-native-skeleton-placeholder`. The original implementation resulted in a pitch-black background instead of the expected masked content. The patch ensures correct rendering of the masked view, allowing for proper display of skeleton placeholders.

## Recordings

### Home Screen

<video src="/recordings/home-page-light.mov" controls="controls" style="max-width: 730px;">
</video>
