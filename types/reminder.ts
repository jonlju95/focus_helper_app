export type ReminderType = 'reminder' | 'shopping' | 'note';

export interface Task {
    id: string;
    label: string;
    completed: boolean;
}

export interface Reminder {
    id: string;
    title: string;
    date: string;
    time?: string;
    type: ReminderType;
    prioritized: boolean;
    tasks: Task[];
}