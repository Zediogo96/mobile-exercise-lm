import TabBarButton from '@/components/navigation/TabBarButton';
import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

const AnimatedTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const colors = useColorsFromTheme();

    const styles = useMemo(() => makeStyles(colors), [colors]);

    return (
        <View style={styles.tabbar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? (options.tabBarLabel as string)
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                if (['_sitemap', '+not-found'].includes(route.name)) return null;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TabBarButton
                        key={route.name}
                        style={styles.tabbarItem}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                        routeName={route.name}
                        color={isFocused ? colors.tabBarActiveColor : colors.tabBarInactiveColor}
                        label={label}
                    />
                );
            })}
        </View>
    );
};

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        tabbar: {
            position: 'absolute',
            bottom: 25,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

            marginHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 25,
            borderCurve: 'continuous',

            backgroundColor: colors.navbarBackground,
            boxShadow: `0px 1px 2px 2px ${colors.tabBarShadowColor}`,
        },
        tabbarItem: {
            flex: 1,
            alignItems: 'center',
        },
    });

export default AnimatedTabBar;
