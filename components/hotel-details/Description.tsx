import { StyleSheet, Text, View } from 'react-native';

const Description = () => {
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
    text: {
        fontSize: 14,
        color: '#666',
        fontWeight: '400',
        letterSpacing: 0.5,
    },
});
