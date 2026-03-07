import {useCategory} from "@/hooks/useCategory";
import {useEffect, useState} from "react";
import {Category} from "@/types/category";
import {db} from "@/db/database";
import * as Crypto from 'expo-crypto';
import {categories} from "@/db/schema";
import {ColorPair} from "@/components/ui/ColorPalettePicker";
import {eq} from "drizzle-orm";

export const useSidebarCategories = () => {
    const {getActivityCategories, getExpenseCategories, getCustomCategories} = useCategory();

    const [activityCategories, setActivityCategories] = useState<Category[]>([]);
    const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);
    const [customCategories, setCustomCategories] = useState<Category[]>([]);

    useEffect(() => {
        getActivityCategories().then(categories => {
            setActivityCategories(categories.filter(c => !c.is_custom))
        });
        getExpenseCategories().then(categories => {
            setExpenseCategories(categories.filter(c => !c.is_custom))
        });
        getCustomCategories().then(setCustomCategories);
    }, [getActivityCategories, getCustomCategories, getExpenseCategories]);

    const addCategory = async (name: string, colorPair: ColorPair, type: 'EXPENSE' | 'ACTIVITY') => {
        await db.insert(categories).values({
            id: Crypto.randomUUID(),
            name,
            colorBg: colorPair.color_bg,
            colorText: colorPair.color_text,
            entityType: type as string,
            is_custom: true,
        });
    };

    const deleteCategory = async (id: string) => {
        await db.delete(categories).where(eq(categories.id, id));
    }

    return {
        activityCategories,
        expenseCategories,
        customCategories,
        addCategory,
        deleteCategory
    }
}