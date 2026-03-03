import {useState} from 'react';
import {Reminder} from '@/types/reminder';
import {openDatabaseSync} from "expo-sqlite";
import {drizzle} from "drizzle-orm/expo-sqlite/driver";
import {DATABASE_NAME} from "@/app/(tabs)/_layout";
import * as schema from '../../../db/schema';
import * as relations from '../../../db/relations';
import {reminders, tasks} from '@/db/schema';

const expoDb = openDatabaseSync(DATABASE_NAME);
const db = drizzle(expoDb, {
    schema: {...schema, ...relations}
});

export function useRemindersDB() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const getReminders = async () => {
        let reminders: Reminder[] = [];
        await db.query.reminders.findMany({
            with: {
                tasks: true,
                type: true,
            },
            orderBy: (reminders, {asc}) => [asc(reminders.date), asc(reminders.time), asc(reminders.prioritized)],
        }).then(result => {
            reminders = result.map(r => ({
                id: r.id,
                title: r.title,
                date: r.date,
                time: r.time ?? undefined,
                prioritized: r.prioritized,
                typeId: r.type?.id,
                tasks: r.tasks.map(t => ({
                    id: t.id,
                    label: t.label,
                    completed: t.completed,
                })),
            }));
        })
        return reminders;
    }

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
        await db.transaction(async (tx) => {
            await tx.insert(reminders).values(reminder);
            await tx.insert(tasks).values(
                reminder.tasks.map((task, index) => ({
                    ...task,
                    reminder_id: reminder.id,
                    sort_order: index,
                })));
        });

        return reminder;
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
        loading,
        error,
        getReminders,
        getReminder,
        addReminder,
        updateReminder,
        deleteReminder,
        toggleTask,
    };
}