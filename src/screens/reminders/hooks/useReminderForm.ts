import {useEffect, useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import {router, useLocalSearchParams} from 'expo-router';
import * as Crypto from 'expo-crypto';

import {Option} from "@/components/ui/sharedInputs/SharedOptionPicker";
import {Reminder, Task} from '@/screens/reminders/types/reminder';
import {parseTime} from "@/utils/dateTimeUtils";
import {useReminderDB} from './useReminderDB';

interface ReminderFormData {
    title: string;
    date: Date;
    time: Date;
    typeId: string;
    prioritized: boolean;
    tasks: Task[];
}

export function useReminderForm() {
    const {id, from} = useLocalSearchParams<{ id?: string, from?: string }>();
    const {getReminder, addReminder, updateReminder, getReminderTabs} = useReminderDB();

    const [reminder, setReminder] = useState<Reminder>();
    const [options, setOptions] = useState<Option[]>([]);

    const {control, handleSubmit, reset, formState: {errors, isSubmitting}} =
        useForm<ReminderFormData>({
            defaultValues: {
                title: '',
                date: new Date(),
                time: new Date(),
                typeId: '22a9b3b6-ea54-4cd9-8497-69726fb07159',
                prioritized: false,
                tasks: [],
            }
        });

    const {fields, append, remove} = useFieldArray({control, name: 'tasks'});

    useEffect(() => {
        getReminderTabs().then((tabs) => {
            let options: Option[] = [];
            tabs.forEach((tab) => {
                options.push({
                    label: tab.name,
                    value: tab.id,
                });
            })
            setOptions(options);
        })

        if (!id) return;
        getReminder(id).then(r => {
            if (!r) {
                return;
            }

            setReminder(r);
            reset({
                title: r.title,
                date: new Date(r.date),
                time: r.time ? parseTime(r.time) : new Date(),
                typeId: r.typeId,
                prioritized: r.prioritized,
                tasks: r.tasks,
            });
        });

    }, [getReminder, getReminderTabs, id, reset]);

    const addTask = (label: string) => {
        append({
            id: Crypto.randomUUID(),
            label,
            completed: false,
        });
    };

    const deleteTask = (index: number) => remove(index);

    const onSubmit = async (data: ReminderFormData) => {
        const reminderToSave: Reminder = {
            id: reminder?.id ?? Crypto.randomUUID(),
            title: data.title,
            date: data.date.toLocaleDateString(),
            time: data.time.toLocaleTimeString().substring(0, 5),
            typeId: data.typeId,
            prioritized: data.prioritized,
            tasks: data.tasks,
        };

        if (reminder?.id) {
            await updateReminder(reminderToSave);
        } else {
            await addReminder(reminderToSave);
        }

        if (from === 'overview') {
            router.dismissAll();
        } else {
            router.dismissAll();
            router.push('/reminders');
            router.replace({
                pathname: '/reminders/[id]',
                params: {id: reminderToSave.id}
            });
        }
    };

    const isDisabled = !!errors.title || fields.length === 0 || isSubmitting;

    return {
        control,
        handleSubmit,
        fields,
        errors,
        isDisabled,
        isEditing: !!reminder?.id,
        addTask,
        deleteTask,
        onSubmit,
        options
    };
}