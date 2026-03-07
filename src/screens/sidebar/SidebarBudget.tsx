import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import {CheckIcon, PenIcon, UserIcon} from "phosphor-react-native";
import colors from "@/constants/colors";
import SharedInput from "@/components/ui/sharedInputs/SharedInput";
import SharedButton from "@/components/ui/SharedButton";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import ProgressBar from "@/components/ui/ProgressBar";
import {useSetting} from "@/hooks/useSetting";
import {formatCurrency} from "@/utils/formatNumber";
import {useExpenseList} from "@/screens/expenses/hooks/useExpenseList";

interface SidebarBudgetProps {
    onBack?: () => void
}

function SidebarBudget({onBack}: SidebarBudgetProps) {
    const {value: monthlyIncome, setValue: setMonthlyIncome, save: saveMonthlyIncome} = useSetting('MONTHLY_INCOME');
    const {value: fixedExpenses, setValue: setFixedExpenses, save: saveFixedExpenses} = useSetting('FIXED_EXPENSES');
    const {totalSpent} = useExpenseList();

    const handleSave = async () => {
        await saveMonthlyIncome(monthlyIncome);
        await saveFixedExpenses(fixedExpenses);
        onBack?.();
    };

    return (
        <View style={styles.container}>
            <View style={styles.userIcon}>
                <UserIcon size={36} color={colors.primary} weight={'bold'}/>
                <Pressable style={styles.userEdit}>
                    <PenIcon size={11} color={colors.primaryLight} weight={'bold'}/>
                </Pressable>
            </View>
            <View style={styles.settingsCard}>
                <View style={[styles.settingsCardArea, {borderBottomWidth: 1, borderBottomColor: '#F5F0EA'}]}>
                    <SharedInput value={monthlyIncome} label={'Monthly income (kr)'} keyboardType={'decimal-pad'} onChangeText={setMonthlyIncome}
                                 customStyle={{fontSize: 18, fontFamily: `${typography.fonts.heading}_800`}}/>
                </View>
                <View style={[styles.settingsCardArea]}>
                    <SharedInput value={fixedExpenses} label={'Fixed monthly expenses (kr)'} keyboardType={'decimal-pad'} onChangeText={setFixedExpenses}
                                 customStyle={{fontSize: 18, fontFamily: `${typography.fonts.heading}_800`}}/>
                    <Text style={styles.settingsCardAreaLabel}>Rent, subscriptions, insurance, etc.</Text>
                </View>
            </View>
            <View style={styles.budgetCard}>
                <Text style={styles.budgetCardLabel}>Available for spending</Text>
                <Text style={styles.budgetCardHeader}>{formatCurrency(Number(monthlyIncome) - Number(fixedExpenses) + totalSpent)} kr</Text>
                <ProgressBar progress={totalSpent === 0 ? 1 : totalSpent / (Number(monthlyIncome) - Number(fixedExpenses))} color={colors.primary}/>
                <Text style={styles.budgetCardMeta}>{Math.round(totalSpent === 0 ? 0 : totalSpent / (Number(monthlyIncome) - Number(fixedExpenses))*100)}% spent this month</Text>
            </View>
            <View style={styles.buttonContainer}>
                <SharedButton icon={<CheckIcon size={12} color={'white'} weight={'bold'}/>} label={'Save changes'}
                              customStyle={{alignSelf: 'stretch'}} onPress={handleSave} />
            </View>
        </View>
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