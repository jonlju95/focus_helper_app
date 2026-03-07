// hooks/useSettingField.ts
import {useEffect, useState} from "react";
import {db} from "@/db/database";
import {eq} from "drizzle-orm";
import {user_settings} from "@/db/schema";

export function useSettingField(key: string, defaultValue: string = '') {
    const [value, setValue] = useState(defaultValue);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        // load from db on mount
        const result = db.select()
            .from(user_settings)
            .where(eq(user_settings.key, key))
            .get();
        if (result) setValue(result.value);
    }, [key]);

    const save = async (newValue: string) => {
        await db.insert(user_settings)
            .values({ key, value: newValue })
            .onConflictDoUpdate({
                target: user_settings.key,
                set: { value: newValue }
            });
        setValue(newValue);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return { value, setValue, save, saved };
}