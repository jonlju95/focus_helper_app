import {useCallback, useState} from 'react';
import {RelativePathString, router, useFocusEffect} from 'expo-router';
import {useExpenseDB} from '@/screens/expenses/hooks/useExpenseDB';
import {useReminderDB} from '@/screens/reminders/hooks/useReminderDB';
import {Reminder} from '@/screens/reminders/types/reminder';
import {useActivityDB} from "@/screens/activities/hooks/useActivityDB";
import {useSetting} from "@/hooks/useSetting";
import {useUserSettings} from "@/context/UserSettingsContext";
import {useSidebarDB} from "@/screens/sidebar/hooks/useSidebarDB";

export const useOverview = () => {
    const {username, greetingId} = useUserSettings();

    const {getGreeting} = useSidebarDB();

    const {getTopThreeReminders, getFutureReminders} = useReminderDB();
    const {getFutureActivities} = useActivityDB();
    const {getRemainingBudget} = useExpenseDB();
    const {value: monthlyIncome} = useSetting('MONTHLY_INCOME');
    const {value: fixedExpenses} = useSetting('FIXED_EXPENSES');

    const [totalSpent, setTotalSpent] = useState(0);
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [greeting, setGreeting] = useState<string>('');

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

            if (!greetingId) return;
            getGreeting(greetingId).then(g => {
                setGreeting(g?.phrase ?? '');
            });
        }, [getFutureActivities, getFutureReminders, getGreeting, getRemainingBudget, getTopThreeReminders, greetingId])
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

    const onQuickAddPress = (route: string) => {
        router.navigate(`/${route}/new?from=overview` as RelativePathString);
    }

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
        username,
        greeting,
        onQuickAddPress,
    };
};