const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const common = {
    tabBarActiveColor: 'black',
    tabBarInactiveColor: '#bbb',
    tabBarTextColor: '#fff',

    background: '#F5F5F5',
    cardBackground: '#FFFFFF',
    textDark: '#1A1A1A',
    textGrey: '#717171',
    border: '#E0E0E0',
    dotInactive: 'rgba(0, 0, 0, 0.2)',
    dotActive: '#000',
};

export default {
    light: {
        ...common,
        text: '#000',
        background: '#f9f9f9',
        tint: tintColorLight,
        tabIconDefault: '#ccc',
        tabIconSelected: tintColorLight,
    },
    dark: {
        ...common,
        text: '#fff',
        background: '#000',
        tint: tintColorDark,
        tabIconDefault: '#ccc',
        tabIconSelected: tintColorDark,
    },
};
