import {ScrollView, StyleSheet, View} from "react-native";
import TopBar from "@/components/ui/TopBar";
import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import ReminderTabs from "@/screens/reminders/components/ReminderTabs";
import {Reminder, ReminderType} from "@/types/reminder";
import React, {useEffect, useState} from "react";
import ReminderCard from "@/screens/reminders/components/ReminderCard";
import {router} from "expo-router";
import {CalendarBlankIcon, ClockIcon, PlusIcon} from "phosphor-react-native";
import AlertStrip from "@/components/ui/AlertStrip";
import SharedButton from "@/components/ui/SharedButton";
import SectionLabel from "@/components/ui/SectionLabel";
import {sharedStyles} from "@/constants/sharedStyles";
import {useRemindersDB} from "@/screens/reminders/hooks/useRemindersDB";
import EmptyState from "@/components/ui/EmptyState";
import {useReminderTabs} from "@/screens/reminders/hooks/useReminderTabs";

export default function ReminderListScreen() {
    const {getReminders} = useRemindersDB();
    const {getReminderTabs} = useReminderTabs();
    const [todayReminders, setTodayReminders] = useState<Reminder[]>([]);
    const [upcomingReminders, setUpcomingReminders] = useState<Reminder[]>([]);
    const [activeTab, setActiveTab] = useState<ReminderType>();

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]; // "2026-03-03"
        getReminderTabs().then(tabs => {
            setActiveTab(activeTab ?? tabs[0]);
        })

        getReminders().then(reminders => {
            setTodayReminders(reminders.filter(r =>
                r.typeId === activeTab?.id &&
                r.date === today
            ));
            setUpcomingReminders(reminders.filter(r =>
                r.typeId === activeTab?.id &&
                r.date > today
            ));
        })
    }, [activeTab]);

    return (
        <View style={sharedStyles.container}>
            <TopBar title="Reminders"/>

            <ScrollView
                style={sharedStyles.scroll}
                contentContainerStyle={sharedStyles.scrollContent}
                showsVerticalScrollIndicator={false}>
                <AlertStrip left={{
                    icon: 'warning',
                    iconColor: colors.urgent,
                    iconBg: colors.urgentLight,
                    label: 'Reminders today',
                    value: todayReminders.length.toString(),
                }} right={{
                    icon: 'bell',
                    iconColor: colors.warning,
                    iconBg: colors.warningLight,
                    label: 'Upcoming reminders',
                    value: upcomingReminders.length.toString(),
                }}/>

                {/* Pass activeTab and setter down to the tabs component */}
                {activeTab && (
                    <ReminderTabs
                        activeTab={activeTab}
                        onChange={setActiveTab}
                    />
                )}

                {/* Map over filtered - only shows reminders matching active tab */}
                <View style={styles.dailyReminders}>
                    {/* Section label */}
                    <SectionLabel icon={<ClockIcon size={13} color={colors.textMuted} weight="fill"/>} label={'Today'}/>
                    {todayReminders.length === 0
                        ? <EmptyState message={'Nothing due today'}/>
                        : todayReminders.map(reminder => (
                            <ReminderCard
                                key={reminder.id}
                                title={reminder.title}
                                time={reminder.time ?? reminder.date}
                                iconColor={reminder.prioritized ? colors.primary : colors.info}
                                iconBg={reminder.prioritized ? colors.primaryLight : colors.infoLight}
                                priority={reminder.prioritized}
                                tasks={reminder.tasks}
                                onPress={() => router.push({
                                    pathname: '/reminders/[id]',
                                    params: {id: reminder.id},
                                })}
                            />
                        ))}
                </View>

                {/* Map over filtered - only shows reminders matching active tab */}
                <View style={styles.dailyReminders}>
                    {/* Section label */}
                    <SectionLabel icon={<CalendarBlankIcon size={13} color={colors.textMuted} weight="fill"/>}
                                  label={'Upcoming'}/>

                    {upcomingReminders.length === 0
                        ? <EmptyState message={'Nothing upcoming'}/>
                        : upcomingReminders.map(reminder => (
                            <ReminderCard
                                key={reminder.id}
                                title={reminder.title}
                                time={reminder.time ?? reminder.date}
                                iconColor={reminder.prioritized ? colors.primary : colors.info}
                                iconBg={reminder.prioritized ? colors.primaryLight : colors.infoLight}
                                priority={reminder.prioritized}
                                tasks={reminder.tasks}
                                onPress={() => router.push({
                                    pathname: '/reminders/[id]',
                                    params: {id: reminder.id},
                                })}
                            />
                        ))
                    }
                </View>
                <View style={sharedStyles.buttonContainer}>
                    <SharedButton icon={<PlusIcon size={12} color={'white'} weight={'bold'}/>}
                                  label={'Add new reminder'}
                                  customStyle={{alignSelf: 'stretch'}} onPress={() => router.push('/reminders/new')}/>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    dailyReminders: {
        gap: spacing[3]
    },
});