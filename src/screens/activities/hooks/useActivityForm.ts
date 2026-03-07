import {router, useLocalSearchParams} from "expo-router";
import {useActivitiesDB} from "@/screens/activities/hooks/useActivitiesDB";
import {useEffect, useState} from "react";
import {Activity} from "@/types/activity";
import {useForm, useWatch} from "react-hook-form";
import {parseTime} from "@/utils/dateTimeUtils";
import * as Crypto from 'expo-crypto';

interface ActivityFormData {
    title: string;
    date: Date;
    time?: Date;
    prioritized: boolean;
    description?: string;
    categoryId?: string;
}

export function useActivitiesForm() {
    const { id, from } = useLocalSearchParams<{ id?: string, from?: string }>();
    const {getActivity, addActivity, updateActivity} = useActivitiesDB();

    const [activity, setActivity] = useState<Activity>();

    const {control, handleSubmit, reset, formState: {errors, isSubmitting}} =
        useForm<ActivityFormData>({
            defaultValues: {
                title: '',
                date: new Date(),
                time: new Date(),
                prioritized: false,
                description: '',
                categoryId: '613ba763-81ae-4e96-bd6c-4fdc7d299e77' // Default to appointment
            }
        });

    const titleValue = useWatch({control, name: 'title'});

    useEffect(() => {
        if (!id) return;

        getActivity(id).then((a) => {
            if (!a) return;

            setActivity(a);
            reset({
                title: a.title,
                date: new Date(a.date),
                time: a.time ? parseTime(a.time) : new Date(),
                prioritized: a.prioritized,
                description: a.description,
                categoryId: a.categoryId,
            });
        });
    }, [id]);

    const onSubmit = async (data: ActivityFormData) => {
        const activityToSave: Activity = {
            id: activity?.id ?? Crypto.randomUUID(),
            title: data.title,
            date: data.date.toLocaleDateString(),
            time: data.time?.toLocaleTimeString().substring(0, 5),
            prioritized: data.prioritized,
            description: data.description,
            categoryId: data.categoryId,
        };

        if (activity?.id) {
            await updateActivity(activityToSave);
        } else {
            await addActivity(activityToSave);
        }

        if (from === 'overview') {
            router.dismissAll();
        } else {
            router.dismissAll();
            router.push('/activities');
            router.replace({
                pathname: '/activities/[id]',
                params: {id: activityToSave.id}
            });
        }
    }

    const isDisabled =
        !titleValue?.trim() ||
        isSubmitting;

    return {
        control,
        handleSubmit,
        errors,
        isDisabled,
        isEditing: !!activity?.id,
        onSubmit,
    }
}