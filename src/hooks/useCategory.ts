import {db} from "@/db/database";
import {Category} from "@/types/category";

export const useCategory = () => {

    const getActivityCategories = async () => {
        return db.query.categories.findMany({
            where: (categories, {eq}) =>
                eq(categories.entityType, 'ACTIVITY')
        }).then((c: Category[]) => {
            return c;
        })
    }

    const getExpenseCategories = async () => {
        return db.query.categories.findMany({
            where: (categories, {eq}) =>
                eq(categories.entityType, 'EXPENSE')
        }).then((c: Category[]) => {
            return c;
        })
    }

    return {
        getActivityCategories,
        getExpenseCategories,
    }

}