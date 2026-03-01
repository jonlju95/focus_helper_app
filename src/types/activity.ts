import {Categories} from "@/types/categories";

export interface Activity {
    id:          string;
    title:       string;
    date:        string;    // "2026-03-01"
    time?:       string;    // "14:00"
    type:        Categories;
    prioritized: boolean;
    description?: string;
}