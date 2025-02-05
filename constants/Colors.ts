const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const common = {
    tabBarActiveColor: 'black',
    tabBarInactiveColor: '#bbb',
    tabBarTextColor: '#fff',
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
