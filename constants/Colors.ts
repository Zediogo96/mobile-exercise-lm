const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

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
        tint: tintColorLight,
        tabIconDefault: '#A0A4A8', // Medium Gray
        tabIconSelected: tintColorLight,
        background: '#F7F7F7', // Light Gray Background
        cardBackground: '#FFFFFF', // White Card Background
        textTitle: '#222222', // Very Dark Gray for Titles
        textSecondary: '#666666', // Medium-Dark Gray for Secondary Text
        textGrey: '#777777', // Medium Gray
        textLightGray: '#999999', // Light Gray Text
        filterButton: '#444444', // Dark Gray Filter Button
        searchBarHomeColor: '#FAFAFA', // Very Light Gray Search Bar
        textDark: '#333333', // Dark Gray
        shadow: 'rgba(0, 0, 0, 0.08)', // Subtle Shadow

        // navbar
        navbarBackground: '#FFFFFF',
        tabBarActiveColor: 'black',
        tabBarInactiveColor: '#bbb',
        tabBarShadowColor: 'rgba(0, 0, 0, 0.1)',

        // bookmarks
        bookmarkCardBackground: '#fff',
    },
    dark: {
        ...common,
        text: '#E0E0E0', // Light Gray
        tint: tintColorDark,
        tabIconDefault: '#A0A4A8', // Medium Gray
        tabIconSelected: tintColorDark,
        background: '#1A1A1A', // Dark Gray Background
        cardBackground: '#252525', // Darker Gray Card Background
        textTitle: '#FFFFFF', // White for Titles
        textSecondary: '#BDBDBD', // Medium Light Gray for Secondary Text
        textGrey: '#AAAAAA', // Medium Gray
        textLightGray: '#777777', // Light Gray Text
        filterButton: '#555555', // Medium Gray Filter Button
        searchBarHomeColor: '#333333', // Dark Gray Search Bar
        textDark: '#F0F0F0', // Very Light Gray
        shadow: 'rgba(0, 0, 0, 0.3)', // More Pronounced Shadow

        // navbar
        navbarBackground: '#444444',
        tabBarActiveColor: '#fff',
        tabBarInactiveColor: '#bbb',
        tabBarShadowColor: 'rgba(0, 0, 0, 0.1)',

        // bookmarks
        bookmarkCardBackground: '#333333',
    },
};
