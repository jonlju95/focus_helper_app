import {ExpenseTypes} from "@/types/expenseTypes";

export interface Expense {
    id: string;
    title: string;
    date: string;
    amount: number;
    type: ExpenseTypes;
}