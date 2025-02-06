import { useFilterStore } from '@/services/zustand/hotelFilterStore';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface RatingOption {
    score: string;
    label: string;
    backgroundColor: string;

    value: number;
}

const ratingOptions: RatingOption[] = [
    {
        score: '90+',
        label: 'Excellent',
        backgroundColor: 'rgba(40, 167, 69, 0.8)', // Vibrant green with 80% opacity
        value: 90,
    },
    {
        score: '81+',
        label: 'Very Good',
        backgroundColor: 'rgba(76, 175, 80, 0.8)', // Less vibrant green with 80% opacity
        value: 81,
    },
    {
        score: '75+',
        label: 'Good',
        backgroundColor: 'rgba(205, 220, 57, 0.8)', // Greenish yellow with 80% opacity
        value: 75,
    },
    {
        score: '60+',
        label: 'Pleasant',
        backgroundColor: 'rgba(255, 235, 59, 0.8)', // Warm yellow with 80% opacity
        value: 60,
    },
];

interface AnimatedCheckboxProps {
    selected: boolean;
    onPress: () => void;
}

const AnimatedCheckbox: React.FC<AnimatedCheckboxProps> = ({ selected, onPress }) => {
    const scale = useSharedValue(selected ? 1 : 0);

    useEffect(() => {
        scale.value = withTiming(selected ? 1 : 0, { duration: 300 });
    }, [selected, scale]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <TouchableOpacity style={styles.checkbox} onPress={onPress}>
            <Animated.View style={[styles.checkboxInner, animatedStyle]} />
        </TouchableOpacity>
    );
};

const UserRating: React.FC = () => {
    const { userRating, setUserRating } = useFilterStore();
    // Assume userRating is an array of numeric rating values (or rating option values)
    // Allow multiple selection or override selection as needed

    const toggleRating = (value: number) => {
        if (userRating.includes(value)) {
            setUserRating(userRating.filter((r) => r !== value));
        } else {
            setUserRating([...userRating, value]);
        }
    };

    return (
        <>
            <Text style={styles.title}>User Rating</Text>
            <View style={styles.container}>
                {ratingOptions.map((option) => (
                    <View key={option.value} style={styles.ratingRow}>
                        <View style={styles.ratingInfo}>
                            <View style={[styles.scoreContainer, { backgroundColor: option.backgroundColor }]}>
                                <Text style={styles.scoreText}>{option.score}</Text>
                            </View>
                            <Text style={styles.ratingLabel}>{option.label}</Text>
                        </View>
                        <AnimatedCheckbox
                            selected={userRating.includes(option.value)}
                            onPress={() => toggleRating(option.value)}
                        />
                    </View>
                ))}
            </View>
        </>
    );
};

export default UserRating;

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,

        width: '95%',
        alignSelf: 'center',
        padding: 30,
        backgroundColor: '#fff',
        borderRadius: 10,
        // Subtle shadows for elevation
        shadowColor: '#666',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 2.84,
        elevation: 5,
    },
    title: {
        fontSize: 18,

        fontWeight: 'bold',
        color: '#666',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    ratingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scoreContainer: {
        width: 50,
        height: 25,
        borderRadius: 5,

        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,

        // shadow
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation: 5,
    },
    scoreText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    ratingLabel: {
        color: 'gray',
        fontWeight: '600',
    },
    checkbox: {
        width: 20,
        height: 20,

        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#fff',

        // shadow
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation: 5,
    },
    checkboxInner: {
        width: 14,
        height: 14,
        borderRadius: 4,
        backgroundColor: '#aaa',
    },
});
