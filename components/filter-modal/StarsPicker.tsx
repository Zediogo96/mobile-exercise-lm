import AnimatedCheckbox from '@/components/UI/AnimatedCheckBox';
import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import { useFilterStore } from '@/services/zustand/hotelFilterStore';
import { Entypo } from '@expo/vector-icons';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const StarsPicker = () => {
    const { starRating, setStarRating } = useFilterStore();

    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    // Renders 5 stars using black for filled and a light gray for unfilled stars.
    const renderStars = useCallback((count = 0) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= count) {
                // Filled star in yellow
                stars.push(<Entypo key={i} color="#FFD700" size={16} name="star" />);
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
        <>
            <Text style={styles.title}> Stars </Text>
            <View style={styles.container}>
                {[5, 4, 3, 2, 1].map((stars, index) => (
                    <View key={index} style={styles.ratingRow}>
                        <View style={styles.starsContainer}>{renderStars(stars)}</View>
                        <AnimatedCheckbox selected={starRating.includes(stars)} onPress={() => checkSelected(stars)} />
                    </View>
                ))}
            </View>
        </>
    );
};

export default StarsPicker;

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
            marginTop: 20,
            fontWeight: 'bold',
            color: colors.textTitle,
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
    });
