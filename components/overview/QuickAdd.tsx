import {Pressable, StyleSheet, Text, View} from "react-native";
import colors from "@/constants/colors";
import {ReactNode} from "react";
import {BellIcon, CalendarBlankIcon, ShoppingCartIcon} from "phosphor-react-native";

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
            <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
    )
}

function QuickAdd() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quick add</Text>
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
        padding: 16,
        marginHorizontal: 16,
        gap: 12,
        backgroundColor: colors.bgCard,
        borderRadius: 16,
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
        borderRadius: 12,
        gap: 12
    },

    buttonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: colors.bgInput,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: colors.border,
        borderRadius: 16,
        paddingHorizontal: 6,
        paddingVertical: 12,
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
        gap: 12
    },
    buttonLabel: {
        fontSize: 12,
        fontFamily: 'Nunito_800',
        color: colors.textSecondary,
    },
});

export default QuickAdd;