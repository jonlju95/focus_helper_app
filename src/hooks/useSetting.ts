import {db} from "@/db/database";
import {useCallback, useEffect, useState} from "react";
import {user_settings} from "@/db/schema";
import {eq} from "drizzle-orm";

export function useSetting(key: string, defaultValue: string = '') {
    const [value, setValue] = useState(defaultValue);

    const load = useCallback(() => {
        const result = db
            .select()
            .from(user_settings)
            .where(eq(user_settings.key, key))
            .get();
        if (result) setValue(result.value);
    }, [key]);

    useEffect(() => {
        load();
    }, [load]);

    const save = useCallback(async (newValue: string) => {
        await db.insert(user_settings)
            .values({key, value: newValue})
            .onConflictDoUpdate({
                target: user_settings.key,
                set: {value: newValue}
            });
        setValue(newValue);
    }, [key]);

    return {value, setValue, save, refetch: load};
}