import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type RatingStarsProps = {
    count: number;
    total?: number;
    fontSize?: number;
};

const RatingStars = ({ count, total = 5, fontSize = 16 }: RatingStarsProps) => {
    const calculateFloat = (count / total) * 5;

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name={'star'} size={fontSize + 4} color="#FFD700" />
            <Text style={[styles.rating, { fontSize }]}>{calculateFloat.toFixed(1)}</Text>
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
