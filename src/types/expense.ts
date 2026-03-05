import {Category} from "@/types/category";

export interface Expense {
    id: string;
    title: string;
    date: string;
    amount: number;
    location?: string;
    description?: string;
    categoryId?: string;
    category?: Category;
}

export type MonthlySpending = {
    categoryId:   string;
    categoryName: string;
    colorBg:      string;
    colorText:    string;
    total:        number;
};