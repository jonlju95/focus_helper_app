import {Activity} from "@/types/activity";
import {activities, categories} from "@/db/schema";
import {db} from "@/db/database";
import {count, eq, gt} from "drizzle-orm";

const mapActivity = (a: typeof activities.$inferSelect & {
    category: typeof categories.$inferSelect | null;
}): Activity => ({
    id: a.id,
    title: a.title,
    date: a.date,
    time: a.time ?? undefined,
    prioritized: a.prioritized ?? false,
    description: a.description ?? undefined,
    categoryId: a.category_id ?? undefined,
    category: a.category ?? undefined
});

export function useActivitiesDB() {
    const getActivities = async () => {
        const result = await db.query.activities.findMany({
            with: {
                category: true
            },
            orderBy: (activities, {asc}) => [
                asc(activities.date),
                asc(activities.time),
                asc(activities.prioritized),
            ],
        });
        return result.map(mapActivity);
    }

    const getActivity = async (id: string) => {
        return db.query.activities.findFirst({
            with: {
                category: true
            },
            where: (activities, {eq}) => eq(activities.id, id)
        }).then(a => {
            return a ? mapActivity(a) : null
        });
    }

    const getFutureActivities = async (date: Date) => {
        const dateStr = date.toISOString().split('T')[0];  // "2026-03-15"

        const result = await db.select({count: count()})
            .from(activities)
            .where(gt(activities.date, dateStr));

        return result[0].count;
    }

    const addActivity = async (activity: Activity) => {
        await db.insert(activities).values({
            ...activity,
            category_id: activity.categoryId
        });

        return activity;
    }

    const updateActivity = async (activity: Activity) => {
        await db.update(activities)
            .set({
                title: activity.title,
                date: activity.date,
                time: activity.time ?? null,
                prioritized: activity.prioritized,
                description: activity.description,
                category_id: activity.categoryId ?? null
            })
            .where(eq(activities.id, activity.id));

        return activity;
    }

    const deleteActivity = async (id: string) => {
        await db.delete(activities).where(eq(activities.id, id));
    }

    const togglePriority = async (activityId: string, prioritized: boolean) => {
        await db.update(activities)
            .set({prioritized: prioritized})
            .where(eq(activities.id, activityId))

        return {activityId, prioritized};
    }

    return {
        getActivities,
        getActivity,
        addActivity,
        updateActivity,
        deleteActivity,
        togglePriority,
        getFutureActivities
    }
}