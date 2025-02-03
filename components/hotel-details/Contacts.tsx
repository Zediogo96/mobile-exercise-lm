import { HotelContact } from '@/types/hotel.types';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ContactsSectionProps = {
    contact: HotelContact;
};

const ContactsSection: React.FC<ContactsSectionProps> = ({ contact }) => {
    const { phoneNumber, email } = contact;

    const handleEmailPress = () => Linking.openURL(`mailto:${email}`);
    const handlePhonePress = () => Linking.openURL(`tel:${phoneNumber}`);

    return (
        <View>
            <Text style={styles.title}>Contacts</Text>
            <View style={styles.card}>
                <TouchableOpacity style={styles.row} onPress={handlePhonePress}>
                    <FontAwesome5 name="phone-alt" size={15} />
                    <Text style={styles.text}>{phoneNumber}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.row} onPress={handleEmailPress}>
                    <MaterialIcons name="email" size={15} />
                    <Text style={styles.text}>{email}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ContactsSection;

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 20,
    },
    card: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        gap: 10, // Space between icon and text
    },
    text: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666',
    },
});
