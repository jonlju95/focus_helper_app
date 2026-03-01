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
            <View style={styles.labelWrapper}>
                {showLabel && (
                    <Text style={styles.labelText}>{label}</Text>
                )}
                {required && (
                    <Text style={styles.labelText}>*</Text>
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
    labelWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2
    },
    labelText: {
        fontSize: 11,
        fontFamily: 'Nunito_800',
        color: colors.primary
    },
    inputField: {
        alignSelf: 'stretch',
        backgroundColor: colors.bgInput,
        borderColor: colors.border,
        borderWidth: 1.5,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 14,
        fontFamily: 'Nunito_600',
        color: colors.textPrimary,
    },
    inputFocused: {
        borderColor: colors.primary,
        backgroundColor: colors.bgCard,
    },
})

export default SharedInput;