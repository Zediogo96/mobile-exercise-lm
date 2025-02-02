// PriceSection.tsx
import { CURRENCY_SYMBOL_MAP } from '@/constants/currencies';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type PriceSectionProps = {
    hotelId: string;
    price: number;
    currency: string;
};

const PriceAndAction: React.FC<PriceSectionProps> = ({ price, currency, hotelId }) => {
    const currencySymbol = CURRENCY_SYMBOL_MAP[currency || 'USD'];

    return (
        <View style={styles.container}>
            {/* Left section */}
            <View>
                <Text style={styles.priceText}>Price</Text>
                <Text style={styles.priceAmount}>
                    {currencySymbol} {price}
                    <Text style={styles.perNightText}> / night</Text>
                </Text>
            </View>

            {/* Right section */}
            <Link
                href={{
                    pathname: '/book/[id]',
                    params: { id: hotelId },
                }}
                style={styles.viewDealButton}
            >
                <Text style={styles.textButton}>Book now</Text>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 25,
        alignItems: 'flex-end',
    },
    priceText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    priceAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    perNightText: {
        fontSize: 12,
        fontWeight: 'normal',
        color: '#666',
    },
    viewDealButton: {
        backgroundColor: '#000',
        paddingVertical: 12, // Add padding to top and bottom
        paddingHorizontal: 16, // Add padding to left and right
        borderRadius: 10,
    },
    textButton: {
        fontWeight: '500',
        color: '#fff',
        fontSize: 15, // Reduced font size
        textAlign: 'center', // Ensure text is centered if it wraps
    },
});

export default PriceAndAction;
