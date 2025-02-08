import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import { TimeRange } from '@/types/hotel.types';
import { FontAwesome } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type CheckInOutDetailsProps = {
    checkIn: TimeRange;
    checkOut: TimeRange;
};

const CheckInOutDetails = ({ checkIn, checkOut }: CheckInOutDetailsProps) => {
    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    const renderDetail = (
        icon: keyof typeof FontAwesome.glyphMap,
        iconColor: `#${string}`,
        label: string,
        time: TimeRange
    ) => (
        <View style={styles.column}>
            <View style={styles.row}>
                <FontAwesome name={icon} size={20} color={iconColor} style={{ opacity: 0.8 }} />
                <Text style={styles.label}>{label}</Text>
            </View>
            <Text style={styles.time}>
                {time.from} - {time.to}
            </Text>
        </View>
    );

    return (
        <View style={styles.card}>
            <View style={styles.columnContainer}>{renderDetail('sign-in', '#2E7D32', 'Check-in', checkIn)}</View>

            <View style={styles.separator} />

            <View style={styles.columnContainer}>{renderDetail('sign-out', '#D32F2F', 'Check-out', checkOut)}</View>
        </View>
    );
};

export default CheckInOutDetails;

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        card: {
            backgroundColor: colors.subCardBackground,
            borderRadius: 12,
            padding: 16,
            marginTop: 16,
            flexDirection: 'row',
            alignItems: 'center',

            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        },
        columnContainer: {
            flex: 1,
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
            alignSelf: 'stretch',
        },
        label: {
            fontSize: 14,
            opacity: 0.8,
            fontWeight: '500',
            color: colors.textSecondary,
        },
        time: {
            fontSize: 16,
            color: colors.textTitle,
            fontWeight: '600',
        },
    });
