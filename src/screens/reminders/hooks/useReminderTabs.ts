import {openDatabaseSync} from "expo-sqlite";
import {DATABASE_NAME} from "@/app/(tabs)/_layout";
import {drizzle} from "drizzle-orm/expo-sqlite/driver";
import * as schema from "@/db/schema";
import * as relations from "@/db/relations";
import {useEffect, useState} from "react";
import {ReminderType} from "@/types/reminder";

const expoDb = openDatabaseSync(DATABASE_NAME);
const db = drizzle(expoDb, {
    schema: {...schema, ...relations}
});

export function useReminderTabs()  {
    const [reminderTabs, setReminderTabs] = useState<ReminderType[]>([]);

    useEffect(() => {
        db.query.reminder_types.findMany().then((reminder_types: ReminderType[]) => {
            setReminderTabs(reminder_types);
        })
    }, [])

    return {reminderTabs};
}