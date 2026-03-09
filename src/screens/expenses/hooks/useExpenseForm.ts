import {router, useLocalSearchParams} from "expo-router";
import {useExpenseDB} from "@/screens/expenses/hooks/useExpenseDB";
import {useEffect, useState} from "react";
import {Expense} from "@/screens/expenses/types/expense";
import {useForm, useWatch} from "react-hook-form";
import * as Crypto from 'expo-crypto';
import {useCategory} from "@/hooks/useCategory";
import {Option} from "@/components/ui/sharedInputs/SharedOptionPicker";

interface ExpenseFormData {
    title: string;
    date: Date;
    amount: string;
    categoryId?: string;
    location?: string;
    description?: string;
}

export function useExpenseForm() {
    const {id, from} = useLocalSearchParams<{ id?: string, from?: string }>();
    const {getExpense, addExpense, updateExpense} = useExpenseDB();
    const {getExpenseCategories} = useCategory();
    const [options, setOptions] = useState<Option[]>([]);


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
        getExpenseCategories().then(categories => {
            let options: Option[] = [];
            categories.forEach(category => {
                options.push({
                    label: category.name,
                    value: category.id,
                });
            })
            setOptions(options);
        });

        if (!id) return;

        getExpense(id).then(e => {
            if (!e) return;

            setExpense(e);
            reset({
                title: e.title,
                date: new Date(e.date),
                amount: (e.amount * -1).toString(),
                location: e.location,
                description: e.description,
                categoryId: e.categoryId
            });
        });
    }, [getExpense, getExpenseCategories, id, reset]);

    const onSubmit = async (data: ExpenseFormData) => {
        const expenseToSave: Expense = {
            id: expense?.id ?? Crypto.randomUUID(),
            title: data.title,
            date: data.date.toLocaleDateString(),
            amount: Number(data.amount) * -1,
            location: data.location,
            description: data.description,
            categoryId: data.categoryId
        };

        if (expense?.id) {
            await updateExpense(expenseToSave);
        } else {
            await addExpense(expenseToSave);
        }

        if (from === 'overview') {
            router.dismiss();
        } else {
            router.dismiss();
            setTimeout(() => {
                router.navigate('/expenses');
                router.push({
                    pathname: '/expenses/[id]',
                    params: {id: expenseToSave.id}
                });
            }, 0);

        }
    }

    const normalizeAmount = (value: string): string => {
        return value
            .replace(',', '.')
            .replace(/[^0-9.]/g, '');
    };

    const isDisabled =
        !titleValue?.trim() ||
        !amountValue?.trim() ||
        parseFloat(amountValue.replace(',', '.')) <= 0 ||
        isNaN(parseFloat(amountValue.replace(',', '.'))) ||
        isSubmitting;

    return {
        control,
        handleSubmit,
        errors,
        isDisabled,
        isEditing: !!expense?.id,
        onSubmit,
        normalizeAmount,
        options
    }
}
