import {useExpensesDB} from "@/screens/expenses/hooks/useExpensesDB";

export const useExpenseList = () => {
    const {getMonthlySpending, getRemainingBudget} = useExpensesDB();


}