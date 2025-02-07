import { MaterialIcons } from '@expo/vector-icons'; // Import the icon from Expo
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

type SearchHeaderProps = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    hotelsCount: number;
};

export const SearchHeader = ({ searchQuery, setSearchQuery, hotelsCount }: SearchHeaderProps) => {
    const router = useRouter();
    const inset = useSafeAreaInsets();

    const handlePress = useCallback(() => {
        setSearchQuery('');
        router.back();
    }, []);

    return (
        <>
            <View style={[styles.inputContainer, { ...Platform.select({ android: { paddingTop: 20 } }) }]}>
                <AnimatedTextInput
                    entering={FadeIn.delay(250)}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.input}
                    placeholder="Search for hotels, cities, or places"
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
                    <BlurView style={styles.blurView} intensity={35} tint="dark">
                        <MaterialIcons name="search" size={20} color="white" />
                        <Text style={styles.resultsText}>{hotelsCount || 0} results</Text>
                    </BlurView>
                </Animated.View>
            </View>

            <View style={styles.separator} />
        </>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        gap: 10,
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        // shadow
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        elevation: 5,
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
