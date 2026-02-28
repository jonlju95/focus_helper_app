import React, {ReactNode} from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from "react-native";
import {CheckIcon} from "phosphor-react-native";
import colors from "@/constants/colors";

interface ButtonProps {
    icon?: ReactNode;
    showIcon?: boolean;
    label: string;
    onPress?: () => void,
    customStyle?: ViewStyle;
}

function SharedButton({
    icon = <CheckIcon size={16} color={'#FFF'} weight={'bold'}/>,
    showIcon = true, label, onPress, customStyle
}: ButtonProps) {
    return (
        <Pressable style={({pressed}) => [
            styles.container,
            pressed && styles.pressed,
            customStyle
        ]} onPress={onPress}>
            {showIcon && (
                icon
            )}
            <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        justifyContent: "center",
        gap: 8,
        backgroundColor: colors.primary,
        borderRadius: 16,
        paddingHorizontal: 24,
        paddingVertical: 12,
        elevation: 8,
        shadowColor: '#C4622D',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 16,
    },
    pressed: {
        opacity: 0.85,
    },
    buttonLabel: {
        fontSize: 14,
        fontFamily: 'Nunito_800',
        color: 'white',
    }
})

export default SharedButton;