import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {router} from 'expo-router';
import {
    CalendarBlankIcon,
    CircleIcon,
    CoinsIcon,
    FunnelIcon,
    PlusIcon,
    ReceiptIcon,
    TrendDownIcon,
} from 'phosphor-react-native';

import TopBar from '@/components/ui/TopBar';
import AlertStrip from '@/components/ui/AlertStrip';
import StatCard from '@/components/ui/StatCard';
import ProgressBar from '@/components/ui/ProgressBar';
import SharedButton from '@/components/ui/SharedButton';
import SectionLabel from '@/components/ui/SectionLabel';
import EmptyState from '@/components/ui/EmptyState';
import RangeFilterModal from '@/components/ui/modals/RangeFilterModal';
import ExpenseCard from '@/screens/expenses/components/ExpenseCard';

import {sharedStyles} from '@/constants/sharedStyles';
import colors from '@/constants/colors';
import spacing from '@/constants/spacing';
import typography from '@/constants/typography';

import {Expense} from '@/screens/expenses/types/expense';
import {useExpenseList} from '@/screens/expenses/hooks/useExpenseList';
import {formatCurrency} from "@/utils/formatNumber";

interface CategoryCardItemProps {
    color: string;
    title: string;
    amount: number;
    progress: number;
}

function CategoryCardItem({color, title, amount, progress}: CategoryCardItemProps) {
    return (
        <View style={[sharedStyles.row, {justifyContent: 'space-between'}]}>
            <View style={[sharedStyles.row, {gap: spacing[2]}]}>
                <CircleIcon size={10} color={color} weight="fill"/>
                <Text style={styles.categoryTitle}>{title}</Text>
            </View>
            <View style={[sharedStyles.row, {gap: spacing[4]}]}>
                <View style={{width: 80}}>
                    <ProgressBar progress={progress} color={color}/>
                </View>
                <Text style={[typography.styles.cardTitle, styles.categoryAmount]}>
                    {amount} kr
                </Text>
            </View>
        </View>
    );
}

function ExpensesListScreen() {
    const {
        monthlyIncome, fixedExpenses,
        pastExpenses, todayExpenses,
        monthlySpending, totalSpent, categoryTotal,
        filterRange, filterVisible,
        setFilterRange, setFilterVisible,
        filterLabel
    } = useExpenseList();

    const renderCard = (expense: Expense) => (
        <ExpenseCard
            key={expense.id}
            title={expense.title}
            date={expense.date}
            amount={formatCurrency(expense.amount)}
            category={expense.category}
            onPress={() => router.push({
                pathname: '/expenses/[id]',
                params: {id: expense.id},
            })}
        />
    );

    return (
        <View style={sharedStyles.container}>
            <TopBar title="Expenses"/>

            <ScrollView
                style={sharedStyles.scroll}
                contentContainerStyle={sharedStyles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Info strip */}
                <AlertStrip
                    left={{
                        icon: 'coin', iconColor: colors.success, iconBg: colors.successLight,
                        label: 'Monthly income', value: `${formatCurrency(Number(monthlyIncome))} kr`, stacked: true,
                    }}
                    right={{
                        icon: 'receipt', iconColor: colors.urgent, iconBg: colors.urgentLight,
                        label: 'Fixed expenses', value: `${formatCurrency(Number(fixedExpenses))} kr`, stacked: true,
                    }}
                />

                {/* Stat cards */}
                <View style={[sharedStyles.row, {gap: spacing[3]}]}>
                    <StatCard
                        icon={<TrendDownIcon size={11} color="rgba(255,255,255,0.5)" weight="bold"/>}
                        label="Spent this month"
                        amount={formatCurrency(totalSpent)}
                        currency="kr"
                        variant="dark"
                    />
                    <StatCard
                        icon={<CoinsIcon size={11} color={colors.textMuted} weight="bold"/>}
                        label="Remaining budget"
                        amount={formatCurrency((Number(monthlyIncome)) - (Number(fixedExpenses)) + (totalSpent))}
                        currency="kr"
                        variant="light"
                        progress={Number(monthlyIncome) === 0 ? 0 : 1 - (totalSpent * -1) / (Number(monthlyIncome) - Number(fixedExpenses))}
                    />
                </View>

                {/* Category breakdown */}
                <View style={[sharedStyles.card, {gap: spacing[3]}]}>
                    <View style={[sharedStyles.row, {gap: spacing[1]}]}>
                        <ReceiptIcon size={16} color={colors.textPrimary} weight="fill"/>
                        <Text style={typography.styles.cardTitle}>Categories</Text>
                    </View>
                    <View style={{gap: spacing[3]}}>
                        {monthlySpending.length === 0
                            ? <EmptyState message="No spending this month"/>
                            : monthlySpending.map(item => (
                                <CategoryCardItem
                                    key={item.categoryId}
                                    color={item.colorText}
                                    title={item.categoryName}
                                    amount={item.total}
                                    progress={categoryTotal !== 0 ? item.total / categoryTotal : 0}
                                />
                            ))
                        }
                    </View>
                </View>

                {/* Past expenses */}
                <View style={sharedStyles.section}>
                    <View style={[sharedStyles.row, styles.sectionHeader]}>
                        <SectionLabel
                            icon={<CalendarBlankIcon size={13} color={colors.textMuted} weight="fill"/>}
                            label="Past expenses"
                        />
                        <Pressable style={styles.filterButton} onPress={() => setFilterVisible(true)}>
                            <FunnelIcon size={14} color={colors.textMuted} weight="fill"/>
                            <Text style={styles.filterButtonText}>{filterLabel}</Text>
                        </Pressable>
                    </View>

                    {pastExpenses.length === 0
                        ? <EmptyState message="No past expenses"/>
                        : pastExpenses.map(renderCard)
                    }
                </View>

                <RangeFilterModal
                    visible={filterVisible}
                    value={filterRange}
                    onChange={setFilterRange}
                    onClose={() => setFilterVisible(false)}
                />

                {/* Today */}
                <View style={sharedStyles.section}>
                    <SectionLabel
                        icon={<CalendarBlankIcon size={13} color={colors.textMuted} weight="fill"/>}
                        label="Today"
                    />
                    {todayExpenses.length === 0
                        ? <EmptyState message="No expenses today"/>
                        : todayExpenses.map(renderCard)
                    }
                </View>

                {/* Add expense button */}
                <View style={sharedStyles.buttonContainer}>
                    <SharedButton
                        icon={<PlusIcon size={12} color="white" weight="bold"/>}
                        label="Add new expense"
                        customStyle={{alignSelf: 'stretch'}}
                        onPress={() => router.navigate(`/expenses/new?from=expenses`)}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    categoryTitle: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_700`,
        color: colors.textSecondary,
    },
    categoryAmount: {
        minWidth: 64,
        textAlign: 'right',
        fontSize: 13,
    },
    sectionHeader: {
        justifyContent: 'space-between',
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[1],
    },
    filterButtonText: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_600`,
        color: colors.textMuted,
    },
});

export default ExpensesListScreen;