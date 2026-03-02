import {Expense} from "@/types/expense";

export const MOCK_EXPENSES: Expense[] = [
    {
        id: '1',
        title: 'Grocery run',
        date: '2026-02-25',
        amount: '-649',
        type: 'groceries',
        location: 'ICA Maxi',
        description: 'Weekly groceries: fruits, vegetables, dairy, bread and a few extras.'
    },{
        id: '2',
        title: 'Coffee & pastry',
        date: '2026-02-25',
        amount: '-89',
        type: 'food&drink'
    },{
        id: '3',
        title: 'Bus card top-up',
        date: '2026-02-24',
        amount: '-300',
        type: 'transport'
    },{
        id: '4',
        title: 'Gym membership',
        date: '2026-02-23',
        amount: '-399',
        type: 'health'
    },{
        id: '5',
        title: 'Streaming services',
        date: '2026-02-22',
        amount: '-219',
        type: 'subscriptions'
    },{
        id: '6',
        title: 'Pharmacy',
        date: '2026-02-21',
        amount: '-248',
        type: 'health'
    },{
        id: '7',
        title: 'Lunch out',
        date: '2026-02-20',
        amount: '-135',
        type: 'food&drink'
    },{
        id: '8',
        title: 'Hardware store',
        date: '2026-02-19',
        amount: '-359',
        type: 'home'
    },
]