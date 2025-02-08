import { Tabs } from 'expo-router';
import React from 'react';

import AnimatedTabBar from '@/components/navigation/AnimatedTabBar';

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
