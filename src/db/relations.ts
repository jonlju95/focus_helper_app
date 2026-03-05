import {relations} from 'drizzle-orm';
import {activities, categories, expenses, reminder_types, reminders, tasks} from './schema';

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

export const activitiesRelations = relations(activities, ({one}) => ({
    category: one(categories, {
        fields: [activities.category_id],
        references: [categories.id],
    })
}));

export const expensesRelations = relations(expenses, ({one}) => ({
    category: one(categories, {
        fields: [expenses.category_id],
        references: [categories.id],
    })
}));