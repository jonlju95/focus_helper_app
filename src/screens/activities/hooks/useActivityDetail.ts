import {router, useLocalSearchParams} from "expo-router";
import {useActivitiesDB} from "@/screens/activities/hooks/useActivitiesDB";
import {useEffect, useState} from "react";
import {Activity} from "@/screens/activities/types/activity";

export const useActivityDetail = () => {
    const {id} = useLocalSearchParams<{ id: string }>();
    const {getActivity, deleteActivity, togglePriority} = useActivitiesDB();
    const [activity, setActivity] = useState<Activity>();
    const [deleteVisible, setDeleteVisible] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        getActivity(id).then((a) => {
            if (a) {
                setActivity(a);
            }
        })
    }, [id, getActivity]);


    const onPriorityToggle = async (priority: boolean) => {
        if (!activity) return;
        const result = await togglePriority(activity.id, priority);
        if (!result) {
            return;
        }

        setActivity(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                prioritized: result.prioritized,
            };
        });
    }

    const onDelete = async () => {
        if (!activity) return;
        setDeleteVisible(false);
        await deleteActivity(activity.id);
        router.dismissAll();
        router.replace('/activities');
    }

    return {
        activity,
        onPriorityToggle,
        onDelete,
        deleteVisible,
        setDeleteVisible,
    }
}