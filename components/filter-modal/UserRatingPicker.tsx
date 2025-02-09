import AnimatedCheckbox from '@/components/UI/AnimatedCheckBox';
import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import { useFilterStore } from '@/services/zustand/hotelFilterStore';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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

const UserRating: React.FC = () => {
    const { userRating, setUserRating } = useFilterStore();

    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

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

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        container: {
            marginVertical: 20,

            width: '95%',
            alignSelf: 'center',
            padding: 30,
            backgroundColor: colors.cardBackground,
            borderRadius: 10,

            boxShadow: '0px 2px 1px rgba(218, 215, 215, 0.25)',
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.textTitle,
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

            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.35)',
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
    });
