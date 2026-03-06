import {sqliteTable, text, integer, real} from "drizzle-orm/sqlite-core";

export const categories = sqliteTable('categories', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    colorBg: text('color_bg').notNull(),
    colorText: text('color_text').notNull(),
    entityType: text('entity_type').notNull().default('EXPENSE'),
    is_custom: integer({ mode: 'boolean' }).notNull().default(false),
});

export const reminder_types = sqliteTable('reminder_types', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
});

export const reminders = sqliteTable('reminders', {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    date: text('date').notNull(),
    time: text('time'),
    prioritized: integer({ mode: 'boolean'}).notNull().default(false),
    type_id: text('type_id').references(() => reminder_types.id, { onDelete: "set null" }),
});

export const tasks = sqliteTable('tasks', {
    id: text('id').primaryKey(),
    label: text('label').notNull(),
    completed: integer({ mode: 'boolean' }).default(false).notNull(),
    sort_order: integer('sort_order').default(0),
    reminder_id: text('reminder_id').references(() => reminders.id, { onDelete: 'cascade' }),
});

export const activities = sqliteTable('activities', {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    date: text('date').notNull(),
    time: text('time'),
    prioritized: integer({ mode: 'boolean' }).default(false),
    description: text('description'),
    category_id: text('category_id').references(() => categories.id, { onDelete: "set null" }),
});

export const expenses = sqliteTable('expenses', {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    amount: real('amount').notNull().default(0),
    date: text('date').notNull(),
    location: text('location'),
    description: text('description'),
    recurring: integer({ mode: 'boolean'}).default(false),
    category_id: text('category_id').references(() => categories.id, { onDelete: "set null" }),
});

export const budget_settings = sqliteTable('budget_settings', {
    id: text('id').primaryKey(),
    monthly_income: real('monthly_income').notNull().default(0),
    fixed_expenses: real('fixed_expenses').notNull().default(0),
});

export const greetings = sqliteTable('greetings', {
    id: text('id').primaryKey(),
    phrase: text('phrase').notNull(),
})

export const user_settings = sqliteTable('user_settings', {
    key: text('key').primaryKey(),
    value: text('value').notNull(),
})
