import {useCallback, useState} from 'react';
import {useFocusEffect} from 'expo-router';
import {useExpensesDB} from '@/screens/expenses/hooks/useExpensesDB';
import {useBudgetSettings} from '@/hooks/useBudgetSettings';
import {useRemindersDB} from '@/screens/reminders/hooks/useRemindersDB';
import {Reminder} from '@/types/reminder';

export const useOverview = () => {
    const {getRemainingBudget} = useExpensesDB();
    const {getBudgetSettings} = useBudgetSettings();
    const {getTopThreeReminders} = useRemindersDB();

    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [fixedExpenses, setFixedExpenses] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);
    const [reminders, setReminders] = useState<Reminder[]>([]);

    useFocusEffect(
        useCallback(() => {
            getRemainingBudget().then(setTotalSpent);
            getBudgetSettings().then(r => {
                setMonthlyIncome(r.monthly_income);
                setFixedExpenses(r.fixed_expenses);
            });
            getTopThreeReminders().then(setReminders);
        }, [])
    );

    // Derived values — calculated here so screen doesn't need to
    const remainingBudget = monthlyIncome + fixedExpenses - totalSpent;
    const budgetProgress = monthlyIncome > 0
        ? remainingBudget / monthlyIncome
        : 0;

    // Hero item — most urgent thing to show
    const today = new Date().toISOString().split('T')[0];

    const heroReminder =
        reminders.find(r => r.date < today) ??           // overdue first
        reminders.find(r => r.date === today && r.prioritized) ??  // prioritized today
        reminders.find(r => r.date === today) ??          // any today
        reminders.find(r => r.date > today && r.prioritized) ??   // upcoming prioritized
        null;

    const heroLabel =
        !heroReminder ? null :
            heroReminder.date < today ? 'Overdue' :
                heroReminder.date === today ? 'Due today' :
                    'Upcoming';

    return {
        monthlyIncome,
        fixedExpenses,
        totalSpent,
        remainingBudget,
        budgetProgress,
        reminders,
        heroReminder,
        heroLabel,
    };
};