import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type RatingStarsProps = {
    count: number;
    total?: number;
};

const RatingStars = ({ count, total = 5 }: RatingStarsProps) => {
    const calculateFloat = (count / total) * 5;

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name={'star'} size={20} color="#FFD700" />
            <Text style={styles.rating}>({calculateFloat.toFixed(1)})</Text>
        </View>
    );
};

export default RatingStars;

const styles = StyleSheet.create({
    rating: {
        color: 'gray',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 5,
    },
});
