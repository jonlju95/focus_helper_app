// src/hooks/useReminders.ts
import {useEffect, useState} from 'react';
import {Reminder} from '@/types/reminder';
import {openDatabaseSync} from "expo-sqlite";
import {drizzle} from "drizzle-orm/expo-sqlite/driver";
import {DATABASE_NAME} from "@/app/(tabs)/_layout";
import * as schema from '../../../db/schema';
import * as relations from '../../../db/relations';

const expoDb = openDatabaseSync(DATABASE_NAME);
const db = drizzle(expoDb, {
    schema: {...schema, ...relations}
});

export function useReminders() {
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // ── Load all reminders on mount ──────────────────────────
    useEffect(() => {
        db.query.reminders.findMany({
            with: {
                tasks: true,
                type: true,
            },
            orderBy: (reminders, {asc}) => [asc(reminders.date), asc(reminders.time), asc(reminders.prioritized)],
        }).then(result => {
            const mapped: Reminder[] = result.map(r => ({
                id: r.id,
                title: r.title,
                date: r.date,
                time: r.time ?? undefined,
                prioritized: r.prioritized ?? false,
                typeId: r.type?.id,
                tasks: r.tasks.map(t => ({
                    id: t.id,
                    label: t.label ?? '',
                    completed: t.completed ?? false,
                })),
            }));
            setReminders(mapped);
        })
        // TODO: query reminders + their tasks from db
        // Hint: you'll need two queries — one for reminders,
        // one for tasks — then combine them
        // Set loading false when done, catch errors into setError
    }, []);

    const getReminder = async (id: string) => {
        return db.query.reminders.findFirst({
            with: {
                tasks: true,
                type: true,
            },
            where: (reminders, {eq}) => eq(reminders.id, id)
        });
    }

    // ── Add ───────────────────────────────────────────────────
    const addReminder = async (reminder: Reminder) => {
        // TODO: insert into reminders table
        // TODO: insert all tasks into tasks table
        // TODO: update local state — don't refetch everything,
        //       just append to existing array
    };

    // ── Update ────────────────────────────────────────────────
    const updateReminder = async (reminder: Reminder) => {
        // TODO: update reminders row
        // TODO: delete existing tasks and re-insert
        //       (simpler than diffing)
        // TODO: update local state
    };

    // ── Delete ────────────────────────────────────────────────
    const deleteReminder = async (id: string) => {
        // TODO: delete from reminders
        //       (tasks delete automatically via CASCADE)
        // TODO: update local state — filter out the deleted id
    };

    // ── Toggle a single task ──────────────────────────────────
    const toggleTask = async (reminderId: string, taskId: string) => {
        // TODO: flip completed on the task in db
        // TODO: update local state immutably
        // Hint: same spread pattern you already know from the UI work
    };

    return {
        reminders,
        loading,
        error,
        getReminder,
        addReminder,
        updateReminder,
        deleteReminder,
        toggleTask,
    };
}