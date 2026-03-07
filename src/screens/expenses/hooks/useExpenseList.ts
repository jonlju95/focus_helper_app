import {useCallback, useState} from 'react';
import {useFocusEffect} from 'expo-router';
import {useExpensesDB} from './useExpensesDB';
import {Expense, MonthlySpending} from '@/types/expense';
import {getRangeStart} from '@/utils/dateTimeUtils';
import {useSetting} from "@/hooks/useSetting";

export type FilterRange = 'week' | 'month' | 'all';

export function useExpenseList() {
    const {value: monthlyIncome} = useSetting('MONTHLY_INCOME');
    const {value: fixedExpenses} = useSetting('FIXED_EXPENSES');
    const {getExpenses, getMonthlySpending, getRemainingBudget} = useExpensesDB();

    const [allExpenses, setAllExpenses] = useState<Expense[]>([]);
    const [monthlySpending, setMonthlySpending] = useState<MonthlySpending[]>([]);
    const [totalSpent, setTotalSpent] = useState(0);
    const [filterRange, setFilterRange] = useState<FilterRange>('month');
    const [filterVisible, setFilterVisible] = useState(false);

    useFocusEffect(
        useCallback(() => {
            getExpenses().then(setAllExpenses);
            getMonthlySpending().then(setMonthlySpending);
            getRemainingBudget().then(setTotalSpent);
        }, [getExpenses, getMonthlySpending, getRemainingBudget])
    );

    const today = new Date().toISOString().split('T')[0];
    const rangeStart = getRangeStart(filterRange);

    const pastExpenses = allExpenses.filter(e =>
        e.date < today &&
        (rangeStart === null || e.date >= rangeStart)
    );

    const todayExpenses = allExpenses.filter(e => e.date === today);

    const categoryTotal = monthlySpending.reduce((sum, s) => sum + s.total, 0);

    return {
        monthlyIncome,
        fixedExpenses,
        pastExpenses,
        todayExpenses,
        monthlySpending,
        totalSpent,
        categoryTotal,
        filterRange,
        filterVisible,
        setFilterRange,
        setFilterVisible,
    };
}