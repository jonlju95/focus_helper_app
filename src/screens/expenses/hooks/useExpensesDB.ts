import {Expense} from "@/types/expense";
import {db} from "@/db/database";
import {categories, expenses} from "@/db/schema";
import {and, desc, eq, gte, lte, sum} from "drizzle-orm";
import colors from "@/constants/colors";

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

const getMonthRange = () => {
    const now = new Date();
    const first = new Date(now.getFullYear(), now.getMonth(), 1);
    const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return {
        from: first.toISOString().split('T')[0],  // "2026-03-01"
        to: last.toISOString().split('T')[0],   // "2026-03-31"
    };
};

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
        await db.insert(expenses).values({
            ...expense,
            category_id: expense.categoryId
        });

        return expense;
    }

    const updateExpense = async (expense: Expense) => {
        await db.update(expenses)
            .set({
                title: expense.title,
                date: expense.date,
                amount: expense.amount,
                location: expense.location,
                description: expense.description,
                category_id: expense.categoryId ?? null,
            })
            .where(eq(expenses.id, expense.id));

        return expense;
    }

    const deleteExpense = async (id: string) => {
        await db.delete(expenses).where(eq(expenses.id, id));
    }

    const getMonthlySpending = async () => {
        const {from, to} = getMonthRange();

        const result = await db
            .select({
                categoryId: expenses.category_id,
                categoryName: categories.name,
                colorBg: categories.colorBg,
                colorText: categories.colorText,
                total: sum(expenses.amount),
            })
            .from(expenses)
            .leftJoin(categories, eq(expenses.category_id, categories.id))
            .where(
                and(
                    gte(expenses.date, from),
                    lte(expenses.date, to)
                )
            )
            .groupBy(expenses.category_id)
            .orderBy(({total}) => desc(total));

        return result.map(r => ({
            categoryId: r.categoryId ?? 'uncategorized',
            categoryName: r.categoryName ?? 'Uncategorized',
            colorBg: r.colorBg ?? colors.bgInput,
            colorText: r.colorText ?? colors.textMuted,
            total: Number(r.total ?? 0),
        }));
    }

    const getRemainingBudget = async () => {
        const {from, to} = getMonthRange();

        const result = await db
            .select({total: sum(expenses.amount)})
            .from(expenses)
            .where(
                and(
                    gte(expenses.date, from),
                    lte(expenses.date, to)
                )
            );

        return Number(result[0].total ?? 0);
    }

    return {
        getExpenses,
        getExpense,
        addExpense,
        updateExpense,
        deleteExpense,
        getMonthlySpending,
        getRemainingBudget
    }
}