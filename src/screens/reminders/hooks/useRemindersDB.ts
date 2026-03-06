import {useState} from 'react';
import {Reminder} from '@/types/reminder';
import {reminder_types, reminders, tasks} from '@/db/schema';
import {and, count, eq, gt, lte} from "drizzle-orm";
import {db} from "@/db/database";

const mapReminder = (r: typeof reminders.$inferSelect & {
    tasks: typeof tasks.$inferSelect[];
    type: typeof reminder_types.$inferSelect | null;
}): Reminder => ({
    id: r.id,
    title: r.title,
    date: r.date,
    time: r.time ?? undefined,
    prioritized: r.prioritized ?? false,
    typeId: r.type_id ?? '',
    tasks: r.tasks.map(t => ({
        id: t.id,
        label: t.label ?? '',
        completed: t.completed ?? false,
        sort_order: t.sort_order ?? 0,
    })),
});

export function useRemindersDB() {
    const [loading] = useState(true);
    // const {error} = useMigrations(db, migrations);

    const getReminders = async () => {
        const result = await db.query.reminders.findMany({
            with: {tasks: true, type: true},
            orderBy: (reminders, {asc}) => [
                asc(reminders.date),
                asc(reminders.time),
                asc(reminders.prioritized)
            ],
        });
        return result.map(mapReminder);
    }

    const getReminder = async (id: string) => {
        return db.query.reminders.findFirst({
            with: {
                tasks: true,
                type: true,
            },
            where: (reminders, {eq}) => eq(reminders.id, id)
        }).then(r => {
            return r ? mapReminder(r) : null;
        })
    }

    const addReminder = async (reminder: Reminder) => {
        await db.transaction(async (tx) => {
            await tx.insert(reminders).values({
                ...reminder,
                type_id: reminder.typeId
            });
            await tx.insert(tasks).values(
                reminder.tasks.map((task, index) => ({
                    ...task,
                    reminder_id: reminder.id,
                    sort_order: index,
                })));
        });

        return reminder;
    };

    const updateReminder = async (reminder: Reminder) => {
        await db.transaction(async (tx) => {
            await tx.update(reminders)
                .set({
                    title: reminder.title,
                    date: reminder.date,
                    time: reminder.time ?? null,
                    prioritized: reminder.prioritized,
                    type_id: reminder.typeId ?? null,
                })
                .where(eq(reminders.id, reminder.id));

            // Delete existing tasks and re-insert
            await tx.delete(tasks)
                .where(eq(tasks.reminder_id, reminder.id));

            if (reminder.tasks.length > 0) {
                await tx.insert(tasks).values(
                    reminder.tasks.map((task, index) => ({
                        id: task.id,
                        label: task.label,
                        completed: task.completed,
                        sort_order: index,
                        reminder_id: reminder.id,
                    }))
                );
            }
        });

        return reminder;
    };

    const deleteReminder = async (id: string) => {
        await db.delete(reminders).where(eq(reminders.id, id));
    };

    const toggleTask = async (reminderId: string, taskId: string) => {
        const task = await db.query.tasks.findFirst({
            where: (tasks, {eq}) => eq(tasks.id, taskId),
        });

        if (!task) return;

        await db.update(tasks)
            .set({completed: !task.completed})
            .where(eq(tasks.id, taskId));

        return {reminderId, taskId, completed: !task.completed};
    };

    const togglePriority = async (reminderId: string, prioritized: boolean) => {
        await db.update(reminders)
            .set({prioritized: prioritized})
            .where(eq(reminders.id, reminderId))

        return {reminderId, prioritized};
    }

    const getTopThreeReminders = async () => {
        const result = await db.query.reminders.findMany({
            with: {tasks: true, type: true},
            orderBy: (reminders, {asc}) => [
                asc(reminders.date),
                asc(reminders.time)
            ],
            limit: 3,
        });
        return result.map(mapReminder);
    }

    const getFutureReminders = async (date: Date) => {
        const dateStr = date.toISOString().split('T')[0];
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)
            .toISOString().split('T')[0];

        const result = await db.select({count: count()})
            .from(reminders)
            .where(
                and(
                    gt(reminders.date, dateStr),
                    lte(reminders.date, monthEnd)
                )
            );

        return result[0].count;
    };

    return {
        loading,
        getReminders,
        getReminder,
        addReminder,
        updateReminder,
        deleteReminder,
        toggleTask,
        togglePriority,
        getTopThreeReminders,
        getFutureReminders
    };
}