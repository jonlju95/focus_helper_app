import {Activity} from "@/types/activity";
import {activities, categories} from "@/db/schema";
import {db} from "@/db/database";

const mapActivity = (a: typeof activities.$inferSelect & {
    category: typeof categories.$inferSelect | null;
}): Activity => ({
    id: a.id,
    title: a.title,
    date: a.date,
    time: a.time,
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

    }

    const addActivity = async (activity: Activity) => {

    }

    const updateActivity = async (activity: Activity) => {

    }

    const deleteActivity = async (id: string) => {

    }

    const togglePriority = async (activityId: string, prioritized: boolean) => {

    }

    return {
        getActivities,
        getActivity,
        addActivity,
        updateActivity,
        deleteActivity,
        togglePriority,
    }
}