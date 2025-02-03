import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const amenities: [keyof typeof Ionicons.glyphMap, `#${string}`, string][] = [
    ['wifi', '#007AFF', 'Wi-Fi'],
    ['cafe', '#6D4C41', 'Coffee'],
    ['restaurant', '#D32F2F', 'Restaurant'],
    ['tv', '#FF8F00', 'TV'],
    ['car', '#388E3C', 'Parking'],
    ['water', '#0288D1', 'Pool'],
];

const AmenitiesSection = () => {
    return (
        <View style={s.container}>
            <FlatList
                data={amenities}
                horizontal
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => {
                    const [icon, color, name] = item;
                    return (
                        <View style={s.amenity}>
                            <Ionicons name={icon} size={16} color={color} style={{ opacity: 0.8 }} />
                            <Text style={s.text}>{name}</Text>
                        </View>
                    );
                }}
                contentContainerStyle={s.list}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default AmenitiesSection;

const s = StyleSheet.create({
    container: {
        marginTop: 23,
    },
    list: {
        paddingHorizontal: 10,
    },
    amenity: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        gap: 8, // Adds space between icon & text
    },
    text: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666', // Greyish text color
    },
});
