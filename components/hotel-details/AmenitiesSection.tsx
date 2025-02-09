import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
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
    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    return (
        <View style={styles.container}>
            <FlatList
                data={amenities}
                horizontal
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => {
                    const [icon, color, name] = item;
                    return (
                        <View style={styles.amenity}>
                            <Ionicons name={icon} size={16} color={color} style={{ opacity: 0.8 }} />
                            <Text style={styles.text}>{name}</Text>
                        </View>
                    );
                }}
                contentContainerStyle={styles.list}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default AmenitiesSection;

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
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
            gap: 8,
        },
        text: {
            fontSize: 14,
            fontWeight: '400',
            color: colors.textTitle,
        },
    });
