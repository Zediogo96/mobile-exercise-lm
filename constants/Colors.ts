const common = {
    tabBarTextColor: '#fff',
    border: '#E0E0E0',
    dotInactive: 'rgba(0, 0, 0, 0.2)',
    dotActive: '#007AFF', // iOS Blue
    // most popular carousel
    mostPopularCarouselTitle: '#fff',
};

export default {
    light: {
        ...common,
        text: '#333333', // Dark Gray

        tabIconDefault: '#A0A4A8', // Medium Gray

        textTitle: '#222222', // Very Dark Gray for Titles
        textSecondary: '#666666', // Medium-Dark Gray for Secondary Text
        textGrey: '#777777', // Medium Gray
        textLightGray: '#999999', // Light Gray Text
        filterButton: '#444444', // Dark Gray Filter Button
        searchBarHomeColor: '#FAFAFA', // Very Light Gray Search Bar
        textDark: '#333333', // Dark Gray
        shadow: 'rgba(50, 50, 50, 0.08)', // Warmer Shadow

        // background
        background: '#F6F4F1', // Light Gray Background
        cardBackground: '#FAFAFA', // Very Light Gray Card Background
        subCardBackground: '#FFFFFF', // White Card Background

        // navbar
        navbarBackground: '#FFFFFF',
        tabBarActiveColor: 'black',
        tabBarInactiveColor: '#bbb',
        tabBarShadowColor: 'rgba(0, 0, 0, 0.1)',

        // bookmarks
        bookmarkCardBackground: '#fff',

        // filter
        filterHeaderBackground: '#fff',
        filterBackground: 'transparent',
        filterHeaderSeparator: '#ccc',
        filterActionButton: '#000',

        // skeleton
        skeletonHighlight: '#d6d6d6', // Light Gray Highlight
        skeletonBackground: '#f0f0f0', // Very Light Gray Background
        skeletonTitleBackground: '#e0e0e0', // Slightly Darker Light Gray
    },
    dark: {
        ...common,
        text: '#E0E0E0', // Light Gray

        tabIconDefault: '#A0A4A8', // Medium Gray

        textTitle: '#FFFFFF', // White for Titles
        textSecondary: '#BDBDBD', // Medium Light Gray for Secondary Text
        textGrey: '#AAAAAA', // Medium Gray
        textLightGray: '#777777', // Light Gray Text
        filterButton: '#555555', // Medium Gray Filter Button
        searchBarHomeColor: '#333333', // Dark Gray Search Bar
        textDark: '#F0F0F0', // Very Light Gray
        shadow: 'rgba(0, 0, 0, 0.3)', // More Pronounced Shadow

        // background
        background: '#1A1A1A', // Dark Gray Background
        cardBackground: '#252525', // Darker Gray Card Background
        subCardBackground: '#333333', // Darker Gray Card Background

        // navbar
        navbarBackground: '#444444',
        tabBarActiveColor: '#fff',
        tabBarInactiveColor: '#bbb',
        tabBarShadowColor: 'rgba(0, 0, 0, 0.1)',

        // bookmarks
        bookmarkCardBackground: '#333333',

        // filter
        filterHeaderBackground: '#111111',
        filterBackground: '#333333',
        filterHeaderSeparator: '#333333',
        filterActionButton: '#111111',

        // skeleton
        skeletonHighlight: '#444444', // Dark Gray Highlight
        skeletonBackground: '#333333', // Darker Gray Background
        skeletonTitleBackground: '#282828', // Slightly Lighter Dark Gray
    },
};
