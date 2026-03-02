import colors from "@/constants/colors";
import {ReactNode} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import {sharedStyles} from "@/constants/sharedStyles";

interface ButtonProps {
    icon: ReactNode,
    iconBg: string,
    label: string,
}

function QuickAddButton({icon, iconBg, label}: ButtonProps) {
    return (
        <Pressable
            style={({pressed}) => [
                sharedStyles.border,
                styles.btnBody,
                pressed && styles.btnBodyPressed
            ]}>
            <View style={[styles.iconWrapper, {backgroundColor: iconBg}]}>
                {icon}
            </View>
            <Text style={[typography.styles.label, {color: colors.textSecondary}]}>{label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    btnBody: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing[2],
        backgroundColor: colors.bgInput,
        borderRadius: spacing[4],
        paddingHorizontal: spacing[2],
        paddingVertical: spacing[3],
        minWidth: '30%',
        flex: 1
    },

    btnBodyPressed: {
        backgroundColor: colors.bgMuted,
        borderColor: colors.borderWarm,
    },

    iconWrapper: {
        width: 42,
        height: 42,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: spacing[3],
        gap: spacing[3]
    },

    buttonContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacing[3]
    },
    buttonLabel: {
        fontSize: 12,
        fontFamily: 'Nunito_800',
        color: colors.textSecondary,
    },
});

export default QuickAddButton;