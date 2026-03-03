export interface ReminderType {
    id: string;
    name: string;
}

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
    typeId?: string;
    prioritized: boolean;
    tasks: Task[];
}