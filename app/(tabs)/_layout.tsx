import { Tabs } from 'expo-router';
import React from 'react';

import AnimatedTabBar from '@/components/navigation/AnimatedTabBar';

// // You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
//     return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

export default function TabLayout() {
    return (
        <Tabs tabBar={(props) => <AnimatedTabBar {...props} />}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Explore',
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="two"
                options={{
                    title: 'Bookmarks',
                }}
            />
            <Tabs.Screen
                name="three"
                options={{
                    title: 'Deals',
                }}
            />
            <Tabs.Screen
                name="four"
                options={{
                    title: 'Profile',
                }}
            />
        </Tabs>
    );
}
