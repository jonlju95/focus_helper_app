import {ActivityTypes} from "@/types/activityTypes";

export interface Activity {
    id: string;
    title: string;
    date: string;    // "2026-03-01"
    time?: string;    // "14:00"
    type: ActivityTypes;
    prioritized: boolean;
    description?: string;
}