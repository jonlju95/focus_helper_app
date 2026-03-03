import {openDatabaseSync} from "expo-sqlite";
import {DATABASE_NAME} from "@/app/(tabs)/_layout";
import {drizzle} from "drizzle-orm/expo-sqlite/driver";
import * as schema from "@/db/schema";
import * as relations from "@/db/relations";
import {ReminderType} from "@/types/reminder";

const expoDb = openDatabaseSync(DATABASE_NAME);
const db = drizzle(expoDb, {
    schema: {...schema, ...relations}
});

export function useReminderTabs() {

    // useEffect(() => {
    //     db.query.reminder_types.findMany().then((reminder_types: ReminderType[]) => {
    //         setReminderTabs(reminder_types);
    //     })
    // }, [])
    // return {reminderTabs};

    const getReminderTabs = async () => {
        let tabs: ReminderType[] = [];
        await db.query.reminder_types.findMany().then(
            (reminder_types: ReminderType[]) => {
                tabs = reminder_types;
            })
        return tabs;
    }

    return {
        getReminderTabs,
    }
}