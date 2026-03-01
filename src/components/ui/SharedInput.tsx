import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import colors from "@/constants/colors";

interface InputProps {
    label?: string;
    showLabel?: boolean;
    value: string;
    onChangeText?: (value: string) => void;
    placeholder?: string;
    required?: boolean;
}

function SharedInput({label, showLabel = true, value, onChangeText, placeholder, required = false}: InputProps) {
    const [focused, setFocused] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.InputHeader}>
                {showLabel && (
                    <Text style={styles.inputLabel}>{label}</Text>
                )}
                {required && (
                    <Text style={styles.inputLabel}>*</Text>
                )}
            </View>
            <TextInput value={value} placeholder={placeholder}
                       onChangeText={onChangeText}
                       onFocus={() => setFocused(true)}
                       onBlur={() => setFocused(false)}
                       style={[styles.inputField, focused && styles.inputFocused]}
                       placeholderTextColor={'#C8C0B4'}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 2
    },
    InputHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2
    },
    inputLabel: {
        // Colors
        color: colors.primary,

        // Fonts
        fontSize: 11,
        fontFamily: 'Nunito_800',
    },
    inputField: {
        // Positioning
        alignSelf: 'stretch',

        // Size
        paddingHorizontal: 12,
        paddingVertical: 12,

        // Colors
        backgroundColor: colors.bgInput,
        color: colors.textPrimary,

        // Fonts
        fontSize: 14,
        fontFamily: 'Nunito_600',

        // Border
        borderRadius: 12,
        borderColor: colors.border,
        borderWidth: 1.5,
    },
    inputFocused: {
        borderColor: colors.primary,
        backgroundColor: colors.bgCard,
    },
})

export default SharedInput;


// Positioning
// Size
// Colors
// Fonts
// Border