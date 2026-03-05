import {Expense} from "@/types/expense";
import {db} from "@/db/database";
import {categories, expenses} from "@/db/schema";

const mapExpense = (e: typeof expenses.$inferSelect & {
    category: typeof categories.$inferSelect | null;
}): Expense => ({
    id: e.id,
    title: e.title,
    date: e.date,
    amount: e.amount,
    location: e.location ?? undefined,
    description: e.description ?? undefined,
    categoryId: e.category_id ?? undefined,
    category: e.category ?? undefined,
})

export function useExpensesDB() {

    const getExpenses = async () => {
        const result = await db.query.expenses.findMany({
            with: {
                category: true
            },
            orderBy: (expense, {asc}) => [
                asc(expense.date),
            ],
        });
        return result.map(mapExpense)
    }

    const getExpense = async (id: string) => {
        return db.query.expenses.findFirst({
            with: {
                category: true
            },
            where: (expenses, {eq}) => eq(expenses.id, id)
        }).then(e => {
            return e ? mapExpense(e) : null;
        });
    }

    const addExpense = async (expense: Expense) => {

    }

    const updateExpense = async (expense: Expense) => {

    }

    const deleteExpense = async (id: string) => {

    }

    return {
        getExpenses,
        getExpense,
        addExpense,
        updateExpense,
        deleteExpense,
    }
}