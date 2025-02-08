import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const three = () => {
    const inset = useSafeAreaInsets();
    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);
    return (
        <View style={styles.container}>
            <Text style={[styles.title, { marginBottom: inset.top }]}> Deals Placeholder tab </Text>
        </View>
    );
};

export default three;

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
        title: { fontSize: 16, fontWeight: 'bold', color: colors.textTitle },
    });
