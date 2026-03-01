import {Pressable, StyleSheet, Text, View} from "react-native";
import colors from "@/constants/colors";
import {ReactNode} from "react";
import {BellIcon, CalendarBlankIcon, ShoppingCartIcon} from "phosphor-react-native";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";

interface ButtonProps {
    icon: ReactNode,
    iconBg: string,
    label: string,
}

function QuickAddButton({icon, iconBg, label}: ButtonProps) {
    return (
        <Pressable
            style={({pressed}) => [
                styles.buttonWrapper,
                pressed && styles.buttonWrapperPressed
            ]}>
            <View style={[styles.iconWrapper, {backgroundColor: iconBg}]}>
                {icon}
            </View>
            <Text style={[typography.styles.label, {color: colors.textSecondary}]}>{label}</Text>
        </Pressable>
    )
}

function QuickAddSection() {
    return (
        <View style={styles.container}>
            <Text style={typography.styles.cardTitle}>Quick add</Text>
            <View style={styles.buttonContent}>
                <QuickAddButton
                    icon={<BellIcon size={20} color={colors.primary} weight={'fill'}/>}
                    iconBg={colors.primaryLight}
                    label={'Reminder'}
                />
                <QuickAddButton
                    icon={<CalendarBlankIcon size={20} color={colors.info} weight={'fill'}/>}
                    iconBg={colors.infoLight}
                    label={'Activity'}
                />
                <QuickAddButton
                    icon={<ShoppingCartIcon size={20} color={colors.success} weight={'fill'}/>}
                    iconBg={colors.successLight}
                    label={'Expense'}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: spacing[4],
        gap: spacing[3],
        backgroundColor: colors.bgCard,
        borderRadius: spacing[4],
    },

    title: {
        fontSize: 15,
        fontFamily: 'Nunito_800',
        color: colors.textPrimary,
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

    buttonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing[2],
        backgroundColor: colors.bgInput,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: colors.border,
        borderRadius: spacing[4],
        paddingHorizontal: spacing[2],
        paddingVertical: spacing[3],
        flex: 1
    },

    buttonWrapperPressed: {
        backgroundColor: colors.bgMuted,
        borderColor: colors.borderWarm,
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

export default QuickAddSection;