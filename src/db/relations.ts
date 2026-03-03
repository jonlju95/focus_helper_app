import {relations} from 'drizzle-orm';
import {reminder_types, reminders, tasks} from './schema';

export const remindersRelations = relations(reminders, ({one, many}) => ({
    // A reminder belongs to one type
    type: one(reminder_types, {
        fields: [reminders.type_id],
        references: [reminder_types.id],
    }),
    // A reminder has many tasks
    tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({one}) => ({
    // A task belongs to one reminder
    reminder: one(reminders, {
        fields: [tasks.reminder_id],
        references: [reminders.id],
    }),
}));