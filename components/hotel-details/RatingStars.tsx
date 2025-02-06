import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';

type RatingStarsProps = {
    count: number;
    total?: number;
    fontStyle?: TextStyle;
};

const RatingStars = ({ count, total = 5, fontStyle }: RatingStarsProps) => {
    const calculateFloat = (count / total) * 5;

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name={'star'} size={(fontStyle?.fontSize ?? 12) + 4} color="#FFD700" />
            <Text style={[styles.rating, fontStyle]}>{calculateFloat.toFixed(1)}</Text>
        </View>
    );
};

export default RatingStars;

const styles = StyleSheet.create({
    rating: {
        color: 'gray',
        fontWeight: '500',
        marginLeft: 5,
    },
});
