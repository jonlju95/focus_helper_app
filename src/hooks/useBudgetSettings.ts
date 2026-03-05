import {db} from "@/db/database";

export const useBudgetSettings = () => {
    const getBudgetSettings = async () => {
        return db.query.budget_settings.findFirst()
            .then((result) => {
                let monthly_income = result?.monthly_income ?? 0;
                let fixed_expenses = result?.fixed_expenses ?? 0;
                return {monthly_income, fixed_expenses}
            })
    }

    return {
        getBudgetSettings,
    }
}