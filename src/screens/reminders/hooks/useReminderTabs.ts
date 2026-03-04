import {ReminderType} from "@/types/reminder";
import {db} from "@/db/database";

export function useReminderTabs() {
    const getReminderTabs = async () => {
        return db.query.reminder_types.findMany().then(
            (reminder_types: ReminderType[]) => {
                return reminder_types;
            })
    }

    return {
        getReminderTabs,
    }
}