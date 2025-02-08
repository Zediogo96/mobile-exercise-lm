import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Description = () => {
    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    return (
        <View>
            <Text style={styles.title}>Description</Text>
            <View style={styles.card}>
                <Text style={styles.text}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisl nec justo ultrices efficitur.
                    Nulla facilisi. Aenean nec nunc auctor, ultricies sapien vitae, ultricies sapien. Nullam in nunc at
                </Text>
            </View>
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
    });
