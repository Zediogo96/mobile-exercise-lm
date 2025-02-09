import Colors from '@/constants/Colors';
import useColorsFromTheme from '@/hooks/useColorsFromTheme';
import { HotelContact } from '@/types/hotel.types';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ContactsSectionProps = {
    contact: HotelContact;
};

type ContactRowProps = {
    iconName: string;
    iconType: 'FontAwesome5' | 'MaterialIcons';
    text: string;
    onPress: () => void;
    iconColor: string;
    colors: typeof Colors.light & typeof Colors.dark;
    styles: ReturnType<typeof makeStyles>;
};

const ContactRow: React.FC<ContactRowProps> = ({ iconName, iconType, text, onPress, iconColor, colors, styles }) => {
    const Icon = iconType === 'FontAwesome5' ? FontAwesome5 : MaterialIcons;

    return (
        <TouchableOpacity style={styles.row} onPress={onPress}>
            <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
                <Icon name={iconName} size={15} color={iconColor} />
            </View>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

const ContactsSection: React.FC<ContactsSectionProps> = ({ contact }) => {
    const { phoneNumber, email } = contact;

    const colors = useColorsFromTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    const handleEmailPress = () => Linking.openURL(`mailto:${email}`);
    const handlePhonePress = () => Linking.openURL(`tel:${phoneNumber}`);

    return (
        <View>
            <Text style={styles.title}>Contacts</Text>
            <View style={styles.card}>
                <ContactRow
                    iconName="phone-alt"
                    iconType="FontAwesome5"
                    text={phoneNumber}
                    onPress={handlePhonePress}
                    iconColor={colors.phoneIcon}
                    colors={colors}
                    styles={styles}
                />
                <ContactRow
                    iconName="email"
                    iconType="MaterialIcons"
                    text={email}
                    onPress={handleEmailPress}
                    iconColor={colors.emailIcon}
                    colors={colors}
                    styles={styles}
                />
            </View>
        </View>
    );
};

export default ContactsSection;

const makeStyles = (colors: typeof Colors.light & typeof Colors.dark) =>
    StyleSheet.create({
        title: {
            fontSize: 18,
            fontWeight: '600',
            marginVertical: 20,
            color: colors.textTitle,
        },
        card: {
            backgroundColor: colors.subCardBackground,
            borderRadius: 12,
            padding: 16,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            gap: 10,
        },
        text: {
            fontSize: 14,
            fontWeight: '400',
            color: colors.text,
        },
        iconContainer: {
            width: 30,
            height: 30,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
