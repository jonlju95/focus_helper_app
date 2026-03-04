import React, {ReactNode} from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from "react-native";
import {CheckIcon} from "phosphor-react-native";
import colors from "@/constants/colors";
import {sharedStyles} from "@/constants/sharedStyles";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";

interface ButtonProps {
    icon?: ReactNode;
    showIcon?: boolean;
    label: string;
    onPress?: () => void,
    customStyle?: ViewStyle;
    disabled?: boolean;
}

function SharedButton({
    icon = <CheckIcon size={16} color={'#FFF'} weight={'bold'}/>,
    showIcon = true, label, onPress, customStyle, disabled = false,
}: ButtonProps) {
    return (
        <Pressable style={({pressed}) => [
            styles.btnBody,
            sharedStyles.row,
            pressed && styles.pressed,
            customStyle,
            disabled && styles.disabled,
        ]} onPress={onPress} disabled={disabled}>
            {showIcon && (icon)}
            <Text style={[typography.styles.btnText, disabled && styles.buttonLabelDisabled]}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    btnBody: {
        alignSelf: "flex-start",
        justifyContent: "center",
        gap: spacing[2],
        backgroundColor: colors.primary,
        borderRadius: spacing[4],
        paddingHorizontal: spacing[6],
        paddingVertical: spacing[3],

        elevation: spacing[1],
        shadowColor: '#C4622D',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: spacing[4],
    },
    pressed: {
        opacity: 0.85,
    },
    disabled: {
        backgroundColor: colors.border,
        opacity: 0.6,
        elevation: 0,
        shadowOpacity: 0,
    },
    buttonLabelDisabled: {
        color: colors.textMuted,
    },
})

export default SharedButton;