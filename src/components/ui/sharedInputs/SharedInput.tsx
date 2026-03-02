import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {sharedStyles} from "@/constants/sharedStyles";
import spacing from "@/constants/spacing";

interface InputProps {
    label?: string,
    showLabel?: boolean,
    value: string | undefined,
    onChangeText?: (value: string) => void,
    placeholder?: string,
    required?: boolean,
    customStyle?: any,
}

function SharedInput({
    label,
    showLabel = true,
    value,
    onChangeText,
    placeholder,
    required = false,
    customStyle,
}: InputProps) {
    const [focused, setFocused] = useState(false);

    return (
        <View>
            <View style={[styles.header, sharedStyles.row]}>
                {showLabel && (
                    <Text style={typography.styles.label}>{label}</Text>
                )}
                {required && (
                    <Text style={typography.styles.label}>*</Text>
                )}
            </View>
            <TextInput value={value} placeholder={placeholder}
                       onChangeText={onChangeText}
                       onFocus={() => setFocused(true)}
                       onBlur={() => setFocused(false)}
                       style={[typography.styles.inputText, sharedStyles.row, sharedStyles.border,
                           styles.inputField, focused && styles.inputFocused, customStyle]}
                       placeholderTextColor={'#C8C0B4'}
                       multiline={true}/>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        gap: 2,
        marginBottom: spacing[1],
    },

    inputField: {
        alignSelf: 'stretch',
        textAlignVertical: 'top',

        paddingHorizontal: spacing[2],
        paddingVertical: spacing[3],

        backgroundColor: colors.bgInput,

        borderRadius: spacing[3],
        borderWidth: 1.5,
    },

    inputFocused: {
        borderColor: colors.primary,
        backgroundColor: colors.bgCard,
    },
})

export default SharedInput;
