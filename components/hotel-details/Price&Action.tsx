// PriceAndAction.tsx
import BlurFallbackView from '@/components/Helper/BlurFallbackView';
import Colors from '@/constants/Colors';
import { CURRENCY_SYMBOL_MAP } from '@/constants/currencies';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';

import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PriceSectionProps {
    hotelId: string;
    price: number;
    currency: string;
    bottomInset: number;
}

const PriceAndAction: React.FC<PriceSectionProps> = ({ price, currency, hotelId, bottomInset }) => {
    const currencySymbol = CURRENCY_SYMBOL_MAP[currency || 'USD'];

    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    return (
        <View style={styles.blurWrapper}>
            <BlurFallbackView
                intensity={100}
                tint="light"
                blurReductionFactor={2}
                experimentalBlurMethod="dimezisBlurFallbackView"
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
                <TouchableOpacity style={styles.viewDealButton}>
                    <Text style={styles.textButton}>Book now</Text>
                </TouchableOpacity>
            </BlurFallbackView>
        </View>
    );
};

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
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
            color: 'black',
            fontWeight: '500',
            marginBottom: 10,
        },
        priceAmount: {
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.textTitle,
        },
        perNightText: {
            fontSize: 12,
            fontWeight: 'normal',
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
