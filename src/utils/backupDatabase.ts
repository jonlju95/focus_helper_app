import { File, Paths } from 'expo-file-system/next';
import { DATABASE_NAME } from '@/db/database';

export const backupDatabase = async (): Promise<void> => {
    const src    = new File(Paths.document, 'SQLite', DATABASE_NAME);
    const timestamp = new Date().toISOString().split('T')[0];
    const backup    = new File(Paths.document, 'SQLite', `${DATABASE_NAME}_backup_${timestamp}`);

    if (!backup.exists) {
        src.copy(backup);
    }
};