import {ScrollView, StyleSheet, Text, View} from "react-native";
import TopBar from "@/components/ui/TopBar";
import React from "react";
import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import AlertStrip from "@/components/ui/AlertStrip";
import {CalendarBlankIcon, CircleIcon, CoinsIcon, PlusIcon, ReceiptIcon, TrendDownIcon} from "phosphor-react-native";
import typography from "@/constants/typography";
import StatCard from "@/components/ui/StatCard";
import ProgressBar from "@/components/ui/ProgressBar";
import ExpenseCard from "@/screens/expenses/components/ExpenseCard";
import {MOCK_EXPENSES} from "@/screens/expenses/data/expenses";
import {router} from "expo-router";
import SharedButton from "@/components/ui/SharedButton";
import {sharedStyles} from "@/constants/sharedStyles";
import SectionLabel from "@/components/ui/SectionLabel";

interface CategoryCardItemProps {
    color: string;
    title: string;
    amount: number;
}

function CategoryCardItem({color, title, amount}: CategoryCardItemProps) {
    return (
        <View style={[sharedStyles.row, {justifyContent: 'space-between'}]}>
            <View style={[sharedStyles.row, {gap: spacing[2]}]}>
                <CircleIcon size={10} color={color} weight={'fill'}/>
                <Text style={styles.categoryCardItemTitle}>{title}</Text>
            </View>
            <View style={[sharedStyles.row, {gap: spacing[4]}]}>
                <View style={{width: 80}}>
                    <ProgressBar progress={0.62} color={color}/>
                </View>
                <Text style={[typography.styles.cardTitle, styles.categoryCardItemAmount]}>{amount} kr</Text>
            </View>
        </View>
    )
}

function ExpensesListScreen() {
    return (
        <View style={sharedStyles.container}>
            <TopBar title="Activities"/>
            <ScrollView style={sharedStyles.scroll}
                        contentContainerStyle={sharedStyles.scrollContent}
                        showsVerticalScrollIndicator={false}>
                <AlertStrip left={{
                    icon: 'coin',
                    iconColor: colors.success,
                    iconBg: colors.successLight,
                    label: 'Monthly income',
                    value: '19 245 kr',
                    stacked: true
                }} right={{
                    icon: 'receipt',
                    iconColor: colors.urgent,
                    iconBg: colors.urgentLight,
                    label: 'Fixed expenses',
                    value: '-8 830 kr',
                    stacked: true
                }}/>

                {/* Spending/budget cards */}
                <View style={sharedStyles.section}>
                    <View style={[sharedStyles.row, {gap: spacing[3], flex: 1}]}>
                        <StatCard icon={<TrendDownIcon size={11} color={'rgba(255,255,255,0.5)'} weight={'bold'}/>}
                                  label={'Spent this month'}
                                  amount={'-2 398'}
                                  currency={'kr'}
                                  variant={'dark'}/>

                        <StatCard icon={<CoinsIcon size={11} color={colors.textMuted} weight={'bold'}/>}
                                  label={'Remaining budget'}
                                  amount={'8 017'}
                                  currency={'kr'}
                                  variant={'light'}
                                  progress={(8017 / 19245)}/>
                    </View>
                </View>

                {/* Category spending */}
                <View style={[sharedStyles.card, {gap: spacing[3]}]}>
                    <View style={[sharedStyles.row, {gap: spacing[1]}]}>
                        <ReceiptIcon size={16} color={colors.textPrimary} weight={'fill'}/>
                        <Text style={typography.styles.cardTitle}>Categories</Text>
                    </View>
                    <View style={{gap: spacing[3]}}>
                        <CategoryCardItem color={colors.categories.groceries.text} title={'Groceries'} amount={649}/>
                        <CategoryCardItem color={colors.categories.health.text} title={'Health'} amount={647}/>
                        <CategoryCardItem color={colors.categories.home.text} title={'Home'} amount={359}/>
                        <CategoryCardItem color={colors.categories.transport.text} title={'Transport'} amount={300}/>
                    </View>
                </View>

                {/*    Expense list */}
                <View style={sharedStyles.section}>
                    {/* Label */}
                    <SectionLabel icon={<CalendarBlankIcon size={13} color={colors.textMuted} weight="fill"/>}
                                  label={'This month'}/>

                    <View style={{gap: spacing[3]}}>
                        {MOCK_EXPENSES.map(expense => (
                            <ExpenseCard key={expense.id}
                                         title={expense.title}
                                         date={expense.date}
                                         amount={expense.amount}
                                         type={expense.type}
                                         onPress={() => router.push({
                                             pathname: "/expenses/[id]",
                                             params: {id: expense.id}
                                         })}/>
                        ))}
                    </View>
                </View>

                {/* New expense button */}
                <View style={sharedStyles.buttonContainer}>
                    <SharedButton icon={<PlusIcon size={12} color={'white'} weight={'bold'}/>}
                                  label={'Add new expense'} customStyle={{alignSelf: 'stretch'}}
                                  onPress={() => router.push({
                                      pathname: `/expenses/new`,
                                      params: {date: new Date().toISOString()}
                                  })}/>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    budgetCardWrapper: {
        flexDirection: 'row',
        gap: spacing[3],
    },

    categoryCardItemTitle: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_700`,
        color: colors.textSecondary
    },

    categoryCardItemAmount: {
        minWidth: 64,
        textAlign: 'right',
        fontSize: 13,
    },

})

export default ExpensesListScreen;