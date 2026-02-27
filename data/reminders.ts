import {Reminder} from "@/types/reminder";

export const MOCK_REMINDERS: Reminder[] = [
    {
        id: '1', title: 'Morning routine',
        date: '2024-10-20', time: '08:00',
        type: 'reminder', prioritized: false,
        tasks: [
            {id: '1', label: 'Take meds', completed: true},
            {id: '2', label: 'Make breakfast', completed: false},
        ],
    },
    {
        id: '2', title: 'Grocery run',
        date: '2024-10-20', time: '15:00',
        type: 'reminder', prioritized: true,
        tasks: [
            {id: '1', label: 'Milk', completed: true},
            {id: '2', label: 'Bread', completed: true},
            {id: '3', label: 'Eggs', completed: false},
        ],
    },
    {
        id: '3', title: 'Shopping list',
        date: '2024-10-21', time: '10:00',
        type: 'shopping', prioritized: false,
        tasks: [
            {id: '1', label: 'Shampoo', completed: false},
        ],
    },
];