import { TimeRange } from '@/types/hotel.types';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type CheckInOutDetailsProps = {
    checkIn: TimeRange;
    checkOut: TimeRange;
};

const CheckInOutDetails = ({ checkIn, checkOut }: CheckInOutDetailsProps) => {
    const renderDetail = (
        icon: keyof typeof FontAwesome.glyphMap,
        iconColor: `#${string}`,
        label: string,
        time: TimeRange
    ) => (
        <View style={s.column}>
            <View style={s.row}>
                <FontAwesome name={icon} size={20} color={iconColor} style={{ opacity: 0.8 }} />
                <Text style={s.label}>{label}</Text>
            </View>
            <Text style={s.time}>
                {time.from} - {time.to}
            </Text>
        </View>
    );

    return (
        <View style={s.card}>
            <View style={s.columnContainer}>{renderDetail('sign-in', '#2E7D32', 'Check-in', checkIn)}</View>

            <View style={s.separator} />

            <View style={s.columnContainer}>{renderDetail('sign-out', '#D32F2F', 'Check-out', checkOut)}</View>
        </View>
    );
};

export default CheckInOutDetails;

const s = StyleSheet.create({
    card: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    columnContainer: {
        flex: 1, // Ensures two equal columns
    },
    column: {
        alignItems: 'center',
        gap: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    separator: {
        width: 1,
        backgroundColor: '#BDBDBD',
        alignSelf: 'stretch', // Ensures full height
    },
    label: {
        fontSize: 14,
        opacity: 0.8,
        fontWeight: '500',
    },
    time: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
    },
});
