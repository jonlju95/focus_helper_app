import {db} from "@/db/database";
import {useCallback} from "react";
import {count} from "drizzle-orm";
import {categories} from "@/db/schema";

export const useCategory = () => {

    const getActivityCategories = useCallback(async () => {
        return db.query.categories.findMany({
            where: (categories, {eq}) =>
                eq(categories.entityType, 'ACTIVITY')
        });
    }, [])

    const getExpenseCategories = useCallback(async () => {
        return db.query.categories.findMany({
            where: (categories, {eq}) =>
                eq(categories.entityType, 'EXPENSE')
        });
    }, []);

    const getCustomCategories = useCallback(async () => {
        return db.query.categories.findMany({
            where: (categories, {eq}) =>
                eq(categories.is_custom, true)
        });
    }, []);

    const getCategoryTotal = useCallback(async () => {
        const result = await db.select({count: count()}).from(categories)

        return result[0].count;
    }, [])

    return {
        getActivityCategories,
        getExpenseCategories,
        getCustomCategories,
        getCategoryTotal,
    }

}