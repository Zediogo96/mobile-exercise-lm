import { useFilterStore } from '@/services/zustand/hotelFilterStore';
import { FontAwesome } from '@expo/vector-icons';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

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

const StarsPicker = () => {
    const { starRating, setStarRating } = useFilterStore();

    // Renders 5 stars using black for filled and a light gray for unfilled stars.
    const renderStars = useCallback((count = 0) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= count) {
                // Filled star in yellow
                stars.push(<FontAwesome key={i} color="#FFD700" size={20} name="star" />);
            } else {
                // Unfilled star in light gray
                stars.push(<FontAwesome key={i} color="#CCC" size={20} name="star" />);
            }
        }
        return stars;
    }, []);

    const checkSelected = (rating: number) => {
        if (starRating.includes(rating)) {
            setStarRating(starRating.filter((r) => r !== rating));
        } else {
            setStarRating([...starRating, rating]);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rate Your Experience</Text>
            {[5, 4, 3, 2, 1].map((stars, index) => (
                <View key={index} style={styles.ratingRow}>
                    <View style={styles.starsContainer}>{renderStars(stars)}</View>
                    <AnimatedCheckbox selected={starRating.includes(stars)} onPress={() => checkSelected(stars)} />
                </View>
            ))}
        </View>
    );
};

export default StarsPicker;

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        width: '100%',
        padding: 30,
        backgroundColor: '#fff',
        borderRadius: 10,
        // Subtle shadows for elevation
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
    starsContainer: {
        flexDirection: 'row',
        marginRight: 12,
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
