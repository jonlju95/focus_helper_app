import {useActivitiesDB} from "@/screens/activities/hooks/useActivitiesDB";
import {useCallback, useState} from "react";
import {Activity} from "@/screens/activities/types/activity";
import {useFocusEffect} from "expo-router";
import {formatSelectedDate} from "@/utils/dateTimeUtils";

export const useActivityList = () => {
    const {getActivities, getFutureActivities} = useActivitiesDB();

    const [allActivities, setAllActivities] = useState<Activity[]>([]);
    const [selectedDay, setSelectedDay] = useState<string>(new Date().toISOString().split('T')[0])
    const [markedDates, setMarkedDates] = useState<string[]>([]);
    const [futureActivities, setFutureActivities] = useState<number>(0);

    const onChangeSelectedDay = (date: Date) => {
        setSelectedDay(date.toISOString().split('T')[0])
    }

    useFocusEffect(
        useCallback(() => {
            getActivities().then((activities) => {
                setAllActivities(activities.filter(a => a.date === selectedDay));
                setMarkedDates(activities.map(a => a.date));
            })
            getFutureActivities(new Date()).then((count) => {
                setFutureActivities(count);
            })
        }, [getActivities, getFutureActivities, selectedDay])
    )

    const getLabel = () => {
        if (selectedDay === new Date().toISOString().split('T')[0]) {
            return 'Today · ' + allActivities.length + ' ' + (allActivities.length === 1 ? 'activity' : 'activities');
        }
        return formatSelectedDate(selectedDay) + ' · ' + allActivities.length + ' ' + (allActivities.length === 1 ? 'activity' : 'activities');
    }

    return {
        allActivities,
        selectedDay,
        markedDates,
        futureActivities,
        onChangeSelectedDay,
        getLabel,
    }
}