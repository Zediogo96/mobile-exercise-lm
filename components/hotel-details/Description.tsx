import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import { Hotel } from '@/types/hotel.types';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

type DescriptionProps = {
    hotel: Hotel;
};

const Description = ({ hotel }: DescriptionProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    const fullText = `Located in the heart of downtown, the ${hotel.name} offers modern accommodations with easy access to major attractions.  Each room features a flat-screen TV, air conditioning, and a private bathroom with complimentary toiletries.  Guests can enjoy free Wi-Fi throughout the property.  Our on-site restaurant serves a variety of international dishes, and the bar offers a wide selection of cocktails and beverages.  A 24-hour front desk is available to assist with any needs.  Popular points of interest near the hotel include the Museum of Modern Art, Central Park, and Times Square.  This is our guests' favorite part of ${hotel.location.city}, according to independent reviews. We speak your language!`;

    return (
        <View>
            <Text style={styles.title}>Description</Text>
            <Animated.View
                layout={LinearTransition}
                style={{
                    ...styles.card,
                }}
            >
                <Animated.Text
                    ellipsizeMode={isExpanded ? 'tail' : 'clip'}
                    layout={LinearTransition.duration(200)}
                    style={{ ...styles.text, height: isExpanded ? 'auto' : 100, overflow: 'hidden' }}
                >
                    {fullText}
                    {!isExpanded && '...'}
                </Animated.Text>

                <Animated.Text
                    layout={LinearTransition}
                    onPress={() => setIsExpanded((prev) => !prev)}
                    style={{
                        ...styles.readMore,
                        marginTop: isExpanded ? 10 : 0,
                    }}
                >
                    {isExpanded ? ' Read Less' : ' Read More'}
                </Animated.Text>
            </Animated.View>
        </View>
    );
};

export default Description;

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        title: {
            fontSize: 18,
            fontWeight: '600',
            marginVertical: 20,
            color: colors.textTitle,
        },
        card: {
            padding: 16,
        },
        text: {
            fontSize: 14,
            color: colors.textSecondary,
            fontWeight: '400',
            letterSpacing: 0.5,
        },
        readMore: {
            fontWeight: '500',
            color: colors.readMoreButton,
        },
    });
