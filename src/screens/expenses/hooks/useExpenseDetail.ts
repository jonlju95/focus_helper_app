import {router, useLocalSearchParams} from "expo-router";
import {useExpenseDB} from "@/screens/expenses/hooks/useExpenseDB";
import {useEffect, useState} from "react";
import {Expense} from "@/screens/expenses/types/expense";

export const useExpenseDetail = () => {
    const {id} = useLocalSearchParams<{ id: string }>();
    const {getExpense, deleteExpense} = useExpenseDB();
    const [expense, setExpense] = useState<Expense>();
    const [deleteVisible, setDeleteVisible] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        getExpense(id).then((expense) => {
            if (!expense) {
                return;
            }
            setExpense(expense);
        })
    }, [getExpense, id]);


    const onDelete = async () => {
        if (!expense) return;
        setDeleteVisible(false);
        await deleteExpense(expense.id);
        router.dismissAll();
        router.replace('/expenses');
    }

    return {
        expense,
        onDelete,
        deleteVisible,
        setDeleteVisible
    }
}