import {Category} from '@/types/category';
import {db} from "@/db/database";

export function useActivityCategory() {
    const getActivityCategories = async () => {
        return db.query.categories.findMany({
            where: (categories, {eq}) =>
                eq(categories.entityType, 'ACTIVITY')
        }).then((c: Category[]) => {
            return c;
        })
    }

    return {
        getActivityCategories,
    }
}