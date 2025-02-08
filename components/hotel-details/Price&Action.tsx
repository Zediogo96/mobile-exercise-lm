// PriceAndAction.tsx
import { CURRENCY_SYMBOL_MAP } from '@/constants/currencies';
import { BlurView } from 'expo-blur';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface PriceSectionProps {
    hotelId: string;
    price: number;
    currency: string;
    bottomInset: number;
}

const PriceAndAction: React.FC<PriceSectionProps> = ({ price, currency, hotelId, bottomInset }) => {
    const currencySymbol = CURRENCY_SYMBOL_MAP[currency || 'USD'];

    return (
        <View style={styles.blurWrapper}>
            <BlurView
                intensity={100}
                tint="light"
                blurReductionFactor={0.5}
                experimentalBlurMethod="dimezisBlurView"
                style={[styles.blurContainer, { paddingBottom: Math.max(bottomInset, 16) }]}
            >
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
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 25,
        alignItems: 'flex-end',
        borderRadius: 25,
    },
    blurWrapper: {
        borderRadius: 25,
        overflow: 'hidden', // Ensures the blur effect is clipped
        position: 'absolute',
        width: '90%',
        height: 100,

        bottom: 20,
        left: '5%',
    },
    blurContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
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
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
    },
    textButton: {
        fontWeight: '500',
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
    },
});

export default PriceAndAction;
