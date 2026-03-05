import {db} from "@/db/database";
import {Category} from "@/types/category";

export function useExpenseCategory() {
    const getExpenseCategories = async () => {
        return db.query.categories.findMany({
            where: (categories, {eq}) =>
                eq(categories.entityType, 'EXPENSE')
        }).then((c: Category[]) => {
            return c;
        })
    }

    return {
        getExpenseCategories,
    }
}