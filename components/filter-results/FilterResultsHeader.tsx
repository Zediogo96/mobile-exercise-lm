import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useRef } from 'react';
import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const IS_IOS = Platform.OS === 'ios';
const SEARCH_BAR_HEIGHT = IS_IOS ? 44 : 56;
const SEARCH_BAR_MARGIN = 10;

interface SearchBarProps {
    onSearch: (text: string) => void;
    onCancel?: () => void;
    placeholder?: string;
    headerTintColor?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    onCancel,
    placeholder = 'Search',
    headerTintColor = 'black',
}) => {
    const navigation = useNavigation();
    const searchInput = useRef<TextInput>(null);
    const isFocused = useSharedValue(false);
    const searchText = useSharedValue('');

    const containerWidth = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: withTiming(containerWidth.value - (isFocused.value ? 70 : 2 * SEARCH_BAR_MARGIN), {
                duration: 300,
                easing: Easing.ease,
            }),
        };
    });

    const onFocus = () => {
        isFocused.value = true;
    };

    const onBlur = () => {
        isFocused.value = false;
    };

    const onChangeText = (text: string) => {
        searchText.value = text;
        onSearch(text);
    };

    const onClear = () => {
        searchText.value = '';
        onSearch('');
        if (searchInput.current) {
            searchInput.current.clear();
        }
    };

    const onCancelPress = () => {
        onBlur();
        onClear();
        Keyboard.dismiss();
        if (onCancel) {
            onCancel();
        } else {
            navigation.goBack();
        }
    };

    return (
        <View
            style={styles.container}
            onLayout={(event) => {
                containerWidth.value = event.nativeEvent.layout.width;
            }}
        >
            <Animated.View style={[styles.searchBarContainer, animatedStyle]}>
                <FontAwesome name="search" size={18} color={headerTintColor} style={styles.searchIcon} />
                <TextInput
                    ref={searchInput}
                    style={[styles.searchInput, { color: headerTintColor }]}
                    placeholder={placeholder}
                    placeholderTextColor={headerTintColor}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChangeText={onChangeText}
                    clearButtonMode="while-editing"
                    returnKeyType="search"
                    onSubmitEditing={() => Keyboard.dismiss()}
                />
                {searchText.value.length > 0 && (
                    <TouchableOpacity onPress={onClear} style={styles.clearButton}>
                        <FontAwesome name="times-circle" size={18} color={headerTintColor} />
                    </TouchableOpacity>
                )}
            </Animated.View>
            {isFocused.value && (
                <TouchableOpacity onPress={onCancelPress} style={styles.cancelButton}>
                    <Text style={{ color: headerTintColor }}>Cancel</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: SEARCH_BAR_HEIGHT,
        marginTop: SEARCH_BAR_MARGIN,
        marginBottom: SEARCH_BAR_MARGIN,
        marginLeft: SEARCH_BAR_MARGIN,
        marginRight: SEARCH_BAR_MARGIN,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: IS_IOS ? 'rgba(255,255,255,0.3)' : '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: SEARCH_BAR_HEIGHT,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        height: SEARCH_BAR_HEIGHT,
    },
    clearButton: {
        padding: 5,
    },
    cancelButton: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: SEARCH_BAR_HEIGHT,
    },
});

export default SearchBar;
