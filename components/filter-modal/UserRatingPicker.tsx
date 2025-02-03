import { useFilterStore } from '@/services/zustand/hotelFilterStore';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface RatingOption {
    score: string;
    label: string;
    backgroundColor: string;
    // Use a numeric value if you need to compare further
    value: number;
}

const ratingOptions: RatingOption[] = [
    {
        score: '90+',
        label: 'Excellent',
        backgroundColor: '#28a745', // Vibrant green
        value: 90,
    },
    {
        score: '81+',
        label: 'Very Good',
        backgroundColor: '#4caf50', // Less vibrant green
        value: 81,
    },
    {
        score: '75+',
        label: 'Good',
        backgroundColor: '#cddc39', // Greenish yellow
        value: 75,
    },
    {
        score: '60+',
        label: 'Pleasant',
        backgroundColor: '#ffeb3b', // Warm yellow
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
        <View style={styles.container}>
            <Text style={styles.title}>User Rating</Text>
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
    );
};

export default UserRating;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 30,
        backgroundColor: '#fff',
        borderRadius: 10,
        // Subtle shadow for elevation
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 2.84,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        marginBottom: 40,
        fontWeight: 'bold',
        color: '#000',
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
        marginRight: 12,
    },
    scoreText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    ratingLabel: {
        fontSize: 16,
        color: 'gray',
        fontWeight: '600',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1.5,
        borderColor: '#666',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxInner: {
        width: 14,
        height: 14,
        borderRadius: 2,
        backgroundColor: 'black',
    },
});
