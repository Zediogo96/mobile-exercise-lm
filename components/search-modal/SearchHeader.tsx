import BlurFallbackView from '@/components/Helper/BlurFallbackView';
import AnimatedTextInput from '@/components/UI/animated-components/AnimatedTextInput';
import AnimatedTouchableOpacity from '@/components/UI/animated-components/AnimatedTouchableOpacity';
import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import { MaterialIcons } from '@expo/vector-icons'; // Import the icon from Expo

import { useRouter } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';

type SearchHeaderProps = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    hotelsCount: number;
};

export const SearchHeader = ({ searchQuery, setSearchQuery, hotelsCount }: SearchHeaderProps) => {
    const router = useRouter();

    const colors = useColorsFromTheme();

    const styles = useMemo(() => makeStyles(colors), [colors]);

    const handlePress = useCallback(() => {
        setSearchQuery('');
        router.back();
    }, []);

    return (
        <>
            <View
                style={[
                    styles.inputContainer,
                    { ...Platform.select({ android: { marginTop: 20 }, ios: { marginTop: 10 } }) },
                ]}
            >
                <MaterialIcons name="search" size={24} color={colors.textSecondary} style={styles.searchIcon} />
                <AnimatedTextInput
                    entering={FadeIn.delay(250)}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.input}
                    placeholder="Search for hotels, cities, or places"
                    placeholderTextColor={colors.textSecondary}
                />
                <AnimatedTouchableOpacity onPress={handlePress} entering={FadeIn.delay(500)}>
                    <MaterialIcons name="close" size={24} color="white" />
                </AnimatedTouchableOpacity>
            </View>

            <View style={styles.resultsContainer}>
                <Animated.Text entering={FadeIn.delay(250)} style={styles.sectionTitle}>
                    Filtered hotels
                </Animated.Text>
                <Animated.View entering={FadeInRight.delay(250)}>
                    <BlurFallbackView style={styles.blurView} intensity={35} tint="dark">
                        <MaterialIcons name="search" size={20} color="white" />
                        <Text style={styles.resultsText}>{hotelsCount || 0} results</Text>
                    </BlurFallbackView>
                </Animated.View>
            </View>

            <View style={styles.separator} />
        </>
    );
};

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            gap: 10,
        },
        input: {
            flex: 1,
            height: 50,
            backgroundColor: colors.searchBarHomeColor,
            color: colors.text,
            borderRadius: 10,
            paddingHorizontal: 15,
            paddingVertical: 10,
            paddingLeft: 40, // Add padding to account for the icon
            boxShadow: '0px 1px 4px  rgba(104, 104, 104, 0.35)',
        },
        searchIcon: {
            position: 'absolute',
            left: 10, // Adjust position as needed

            zIndex: 1, // Ensure it's above the input
        },

        resultsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 20,
            marginVertical: 20,
        },
        blurView: {
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 10,
            overflow: 'hidden',
        },
        resultsText: {
            color: 'white',
            width: 70,
            textAlign: 'center',
        },
        separator: {
            height: 1,
            width: '90%',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            marginHorizontal: 20,
            marginBottom: 20,
        },
        sectionTitle: {
            fontSize: 25,
            fontWeight: 'bold',
            color: 'white',
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
        },
    });
