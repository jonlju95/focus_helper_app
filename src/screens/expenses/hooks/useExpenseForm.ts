import {router, useLocalSearchParams} from "expo-router";
import {useExpensesDB} from "@/screens/expenses/hooks/useExpensesDB";
import {useEffect, useState} from "react";
import {Expense} from "@/types/expense";
import {useForm, useWatch} from "react-hook-form";
import * as Crypto from 'expo-crypto';

interface ExpenseFormData {
    title: string;
    date: Date;
    amount: string;
    categoryId?: string;
    location?: string;
    description?: string;
}

export function useExpenseForm() {
    const {id} = useLocalSearchParams<{ id?: string }>();
    const {getExpense, addExpense, updateExpense} = useExpensesDB();

    const [expense, setExpense] = useState<Expense>();

    const {control, handleSubmit, reset, formState: {errors, isSubmitting}} =
        useForm<ExpenseFormData>({
            defaultValues: {
                title: '',
                date: new Date(),
                amount: '',
                location: '',
                description: '',
                categoryId: 'abbdff99-e31e-440a-9ec8-f98942b4f893', // Default to groceries
            }
        });

    const titleValue = useWatch({control, name: 'title'});
    const amountValue = useWatch({control, name: 'amount'});

    useEffect(() => {
        if (!id) return;

        getExpense(id).then(e => {
            if (!e) return;

            setExpense(e);
            reset({
                title: e.title,
                date: new Date(e.date),
                amount: e.amount.toString(),
                location: e.location,
                description: e.description,
                categoryId: e.categoryId
            });
        });
    }, [id]);

    const onSubmit = async (data: ExpenseFormData) => {
        const expenseToSave: Expense = {
            id: expense?.id ?? Crypto.randomUUID(),
            title: data.title,
            date: data.date.toLocaleDateString(),
            amount: Number(data.amount),
            location: data.location,
            description: data.description,
            categoryId: data.categoryId
        };

        if (expense?.id) {
            await updateExpense(expenseToSave);
        } else {
            await addExpense(expenseToSave);
        }

        router.dismissAll();
        router.push('/expenses');
        router.replace({
            pathname: '/expenses/[id]',
            params: {id: expenseToSave.id}
        });
    }

    const isDisabled =
        !titleValue?.trim() ||
        !amountValue?.trim() ||
        Number(amountValue) === 0 ||
        isNaN(Number(amountValue)) ||
        isSubmitting;


    return {
        control,
        handleSubmit,
        errors,
        isDisabled,
        isEditing: !!expense?.id,
        onSubmit
    }
}
