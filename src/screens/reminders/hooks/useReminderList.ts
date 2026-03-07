import {useCallback, useEffect, useState} from 'react';
import {useFocusEffect} from 'expo-router';

import {Reminder, ReminderType} from '@/screens/reminders/types/reminder';
import {getRangeStart} from '@/utils/dateTimeUtils';
import {useReminderDB} from '@/screens/reminders/hooks/useReminderDB';

export function useReminderList() {
    const {getReminders, getReminderTabs} = useReminderDB();

    const [allReminders, setAllReminders] = useState<Reminder[]>([]);
    const [reminderTabs, setReminderTabs] = useState<ReminderType[]>([]);
    const [activeTab, setActiveTab] = useState<ReminderType>();
    const [filterVisible, setFilterVisible] = useState(false);
    const [filterRange, setFilterRange] = useState<'week' | 'month' | 'all'>('month');

    const today = new Date().toISOString().split('T')[0];
    const rangeStart = getRangeStart(filterRange);

    useEffect(() => {
        getReminderTabs().then(tabs => {
            setReminderTabs(tabs);
            if (tabs.length > 0) setActiveTab(tabs[0] as ReminderType);
        });
    }, [getReminderTabs]);

    useFocusEffect(
        useCallback(() => {
            getReminders().then(setAllReminders);
        }, [getReminders])
    );

    const byType = allReminders.filter(r => r.typeId === activeTab?.id);

    const pastReminders = byType.filter(r =>
        r.date < today && (rangeStart === null || r.date >= rangeStart)
    );
    const todayReminders = byType.filter(r => r.date === today);
    const upcomingReminders = byType.filter(r => r.date > today);

    return {
        reminderTabs,
        activeTab,
        setActiveTab,
        filterVisible,
        setFilterVisible,
        filterRange,
        setFilterRange,
        pastReminders,
        todayReminders,
        upcomingReminders,
    };
}