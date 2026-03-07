import {useCallback, useState} from 'react';
import {useFocusEffect} from 'expo-router';
import {useExpensesDB} from '@/screens/expenses/hooks/useExpensesDB';
import {useReminderDB} from '@/screens/reminders/hooks/useReminderDB';
import {Reminder} from '@/screens/reminders/types/reminder';
import {useActivitiesDB} from "@/screens/activities/hooks/useActivitiesDB";
import {useSetting} from "@/hooks/useSetting";

export const useOverview = () => {
    const {getTopThreeReminders, getFutureReminders} = useReminderDB();
    const {getFutureActivities} = useActivitiesDB();
    const {getRemainingBudget} = useExpensesDB();
    const {value: monthlyIncome} = useSetting('MONTHLY_INCOME');
    const {value: fixedExpenses} = useSetting('FIXED_EXPENSES');

    const [totalSpent, setTotalSpent] = useState(0);
    const [reminders, setReminders] = useState<Reminder[]>([]);

    const [futureReminders, setFutureReminders] = useState<number>(0);
    const [futureActivities, setFutureActivities] = useState<number>(0);

    useFocusEffect(
        useCallback(() => {
            getRemainingBudget().then(setTotalSpent);
            getTopThreeReminders().then(setReminders);
            getFutureReminders(new Date()).then(count => {
                setFutureReminders(count);
            })
            getFutureActivities(new Date()).then(count => {
                setFutureActivities(count);
            })
        }, [])
    );

    // Derived values — calculated here so screen doesn't need to
    const remainingBudget = Number(monthlyIncome) + (Number(fixedExpenses) * -1) + totalSpent;
    const budgetProgress = Number(monthlyIncome) > 0
        ? 1 - (totalSpent * -1) / (Number(monthlyIncome) - Number(fixedExpenses))
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
        futureReminders,
        futureActivities,
    };
};