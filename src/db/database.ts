import { openDatabaseSync }  from 'expo-sqlite';
import { drizzle }           from 'drizzle-orm/expo-sqlite';
import * as schema           from './schema';
import * as relations        from './relations';

export const DATABASE_NAME = 'focus_helper';

export const expoDb = openDatabaseSync(DATABASE_NAME);
expoDb.execSync('PRAGMA foreign_keys = ON;');

export const db = drizzle(expoDb, {
    schema: { ...schema, ...relations }
});