import {useEffect, useState} from "react";
import {LayoutAnimation} from "react-native";
import {router, useLocalSearchParams} from "expo-router";

import {Reminder} from "@/screens/reminders/types/reminder";
import {useReminderDB} from "@/screens/reminders/hooks/useReminderDB";

export const useReminderDetail = () => {
    const {id} = useLocalSearchParams<{ id: string }>();
    const {getReminder, deleteReminder, toggleTask, togglePriority} = useReminderDB();

    const [reminder, setReminder] = useState<Reminder>();
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [deleteContext, setDeleteContext] = useState<'delete' | 'complete'>('delete');

    const progress = reminder && reminder.tasks.length > 0
        ? reminder.tasks.filter(t => t.completed).length / reminder.tasks.length
        : 0;

    useEffect(() => {
        if (!id) return;
        getReminder(id).then(r => {
            if (r) setReminder(r);
        });
    }, [id, getReminder]);

    const onTaskToggle = async (taskId: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const result = await toggleTask(taskId);
        if (!result || !reminder) return;

        const updatedTasks = reminder.tasks.map(t =>
            t.id === result.taskId ? {...t, completed: result.completed} : t
        );

        setReminder(prev => prev ? {...prev, tasks: updatedTasks} : prev);

        if (updatedTasks.every(t => t.completed)) {
            setDeleteContext('complete');
            setDeleteVisible(true);
        }
    };

    const onPriorityToggle = async (priority: boolean) => {
        if (!reminder) return;
        const result = await togglePriority(reminder.id, priority);
        if (!result) return;
        setReminder(prev => prev ? {...prev, prioritized: result.prioritized} : prev);
    };

    const onDelete = async () => {
        if (!reminder) return;
        setDeleteVisible(false);
        await deleteReminder(reminder.id);
        router.dismissAll();
        router.replace('/reminders');
    };

    const handleDeletePress = () => {
        setDeleteContext('delete');
        setDeleteVisible(true);
    };

    return {
        reminder,
        deleteVisible,
        setDeleteVisible,
        deleteContext,
        progress,
        onTaskToggle,
        onPriorityToggle,
        onDelete,
        handleDeletePress,
    };
};