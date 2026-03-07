import {Category} from "@/types/category";

export interface Activity {
    id: string;
    title: string;
    date: string;
    time?: string;
    prioritized: boolean;
    description?: string;
    categoryId?: string;
    category?: Category;
}