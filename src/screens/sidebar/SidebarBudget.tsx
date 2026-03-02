import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import {CheckIcon, PenIcon, UserIcon} from "phosphor-react-native";
import colors from "@/constants/colors";
import SharedInput from "@/components/ui/sharedInputs/SharedInput";
import SharedButton from "@/components/ui/SharedButton";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import ProgressBar from "@/components/ui/ProgressBar";

interface SidebarBudgetProps {
    onBack?: () => void
}

function SidebarBudget({onBack}: SidebarBudgetProps) {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.userIcon}>
                    <UserIcon size={36} color={colors.primary} weight={'bold'}/>
                    <Pressable style={styles.userEdit}>
                        <PenIcon size={11} color={colors.primaryLight} weight={'bold'}/>
                    </Pressable>
                </View>
                <View style={styles.settingsCard}>
                    <View style={[styles.settingsCardArea, {borderBottomWidth: 1, borderBottomColor: '#F5F0EA'}]}>
                        <SharedInput value={'19 245'} label={'Monthly income (kr)'}
                                     customStyle={{fontSize: 18, fontFamily: `${typography.fonts.heading}_800`}}/>
                    </View>
                    <View style={[styles.settingsCardArea]}>
                        <SharedInput value={'8 830'} label={'Fixed monthly expenses (kr)'}
                                     customStyle={{fontSize: 18, fontFamily: `${typography.fonts.heading}_800`}}/>
                        <Text style={styles.settingsCardAreaLabel}>Rent, subscriptions, insurance, etc.</Text>
                    </View>
                </View>
                <View style={styles.budgetCard}>
                    <Text style={styles.budgetCardLabel}>Available for spending</Text>
                    <Text style={styles.budgetCardHeader}>10 415 kr</Text>
                    <ProgressBar progress={0.38} color={colors.primary}/>
                    <Text style={styles.budgetCardMeta}>38% spent this month</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <SharedButton icon={<CheckIcon size={12} color={'white'} weight={'bold'}/>} label={'Save changes'}
                                  customStyle={{alignSelf: 'stretch'}} onPress={onBack}/>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing[4],
        alignContent: "center",
        gap: spacing[4],
    },
    userIcon: {
        padding: spacing[4],
        backgroundColor: colors.primaryLight,
        alignSelf: 'center',
        borderRadius: spacing[4],
    },
    userEdit: {
        flex: 1,
        padding: spacing[1],
        backgroundColor: colors.primary,
        alignSelf: 'flex-start',
        borderRadius: spacing[2],
        position: "absolute",
        borderWidth: 1,
        borderColor: colors.primaryLight,
        right: -4,
        bottom: -4,
    },
    settingsCard: {
        backgroundColor: colors.bgCard,
        borderRadius: spacing[4],
    },
    settingsCardArea: {
        padding: spacing[4],
    },
    settingsCardAreaLabel: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_600`,
        color: colors.textMuted,
        marginTop: spacing[1],
    },
    budgetCard: {
        backgroundColor: colors.bgCard,
        borderRadius: spacing[4],
        padding: spacing[4],
        gap: spacing[2]
    },
    budgetCardLabel: {
        fontSize: 11,
        fontFamily: `${typography.fonts.heading}_700`,
        color: colors.textMuted,
    },
    budgetCardHeader: {
        fontSize: 28,
        fontFamily: `${typography.fonts.heading}_900`,
        color: colors.primary,
    },
    budgetCardMeta: {
        fontSize: 11,
        fontFamily: `${typography.fonts.heading}_600`,
        color: colors.textMuted,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default SidebarBudget;