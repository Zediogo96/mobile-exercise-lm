import { TimeRange } from '@/types/hotel.types';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type CheckInOutDetailsProps = {
    checkIn: TimeRange;
    checkOut: TimeRange;
};

const CheckInOutDetails = ({ checkIn, checkOut }: CheckInOutDetailsProps) => {
    return (
        <View style={s.checkInOutCard}>
            <View style={s.checkInOutRow}>
                <View style={s.iconContainer}>
                    <FontAwesome name="sign-in" size={20} color="#2E7D32" />
                </View>
                <View style={s.checkInOutTextContainer}>
                    <Text style={s.checkInOutLabel}>Check-in</Text>
                    <Text style={s.checkInOutTime}>
                        {checkIn.from} - {checkIn.to}
                    </Text>
                </View>
            </View>
            <View style={s.checkInOutRow}>
                <View style={s.iconContainer}>
                    <FontAwesome name="sign-out" size={20} color="#D32F2F" />
                </View>
                <View style={s.checkInOutTextContainer}>
                    <Text style={s.checkInOutLabel}>Check-out</Text>
                    <Text style={s.checkInOutTime}>
                        {checkOut.from} - {checkOut.to}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default CheckInOutDetails;

const s = StyleSheet.create({
    checkInOutCard: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
    },
    checkInOutContainer: {
        marginTop: 16,
    },
    checkInOutRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    checkInOutText: {
        fontSize: 16,
        color: '#666',
    },

    iconContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
        marginRight: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    checkInOutTextContainer: {
        flex: 1,
    },
    checkInOutLabel: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    checkInOutTime: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
    },
});
