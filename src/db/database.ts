import {openDatabaseSync} from 'expo-sqlite';
import {drizzle} from 'drizzle-orm/expo-sqlite';
import * as schema from './schema';
import * as relations from './relations';
import migrations from '../drizzle/migrations';

export const DATABASE_NAME = 'focus_helper.db';

export const expoDb = openDatabaseSync(DATABASE_NAME);
expoDb.execSync('PRAGMA foreign_keys = ON;');
// expoDb.execSync('DROP TABLE IF EXISTS __drizzle_migrations;');
// expoDb.execSync('DROP TABLE IF EXISTS greetings;');
// expoDb.execSync('DROP TABLE IF EXISTS tasks;');
// expoDb.execSync('DROP TABLE IF EXISTS reminders;');
// expoDb.execSync('DROP TABLE IF EXISTS expenses;');
// expoDb.execSync('DROP TABLE IF EXISTS activities;');
// expoDb.execSync('DROP TABLE IF EXISTS budget_settings;');
// expoDb.execSync('DROP TABLE IF EXISTS categories;');
// expoDb.execSync('DROP TABLE IF EXISTS reminder_types;');
// expoDb.execSync('DROP TABLE IF EXISTS user_settings;');

export const db = drizzle(expoDb, {
    schema: {...schema, ...relations}
});

export { migrations };