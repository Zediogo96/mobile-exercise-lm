import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TopSection = () => {
    return (
        <View style={s.container}>
            <Text style={s.title}>Where would you like to go?</Text>
        </View>
    );
};

export default TopSection;

const s = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
    },
});
