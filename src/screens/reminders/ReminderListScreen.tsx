import {ScrollView, StyleSheet, View} from "react-native";
import TopBar from "@/components/ui/TopBar";
import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import ReminderTabs from "@/screens/reminders/components/ReminderTabs";
import {ReminderType} from "@/types/reminder";
import React, {useState} from "react";
import ReminderCard from "@/screens/reminders/components/ReminderCard";
import {router} from "expo-router";
import {CalendarBlankIcon, ClockIcon, PlusIcon} from "phosphor-react-native";
import AlertStrip from "@/components/ui/AlertStrip";
import SharedButton from "@/components/ui/SharedButton";
import SectionLabel from "@/components/ui/SectionLabel";
import {sharedStyles} from "@/constants/sharedStyles";
import {useReminders} from "@/screens/reminders/hooks/useReminders";

export default function ReminderListScreen() {
    const {reminders} = useReminders();
    const [activeTab, setActiveTab] = useState<ReminderType>({
        id: '22a9b3b6-ea54-4cd9-8497-69726fb07159',
        name: 'REMINDERS',
    });

    const today = new Date().toISOString().split('T')[0]; // "2026-03-03"

    const todayReminders = reminders.filter(r =>
        r.typeId === activeTab.id &&
        r.date === today
    );

    const upcomingReminders = reminders.filter(r =>
        r.typeId === activeTab.id &&
        r.date > today
    );

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
                    value: '3',
                }} right={{
                    icon: 'bell',
                    iconColor: colors.warning,
                    iconBg: colors.warningLight,
                    label: 'Upcoming reminders',
                    value: '2',
                }}/>

                {/* Pass activeTab and setter down to the tabs component */}
                <ReminderTabs
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />

                {/* Map over filtered - only shows reminders matching active tab */}
                <View style={styles.dailyReminders}>
                    {/* Section label */}
                    <SectionLabel icon={<ClockIcon size={13} color={colors.textMuted} weight="fill"/>} label={'Today'}/>
                    {todayReminders.map(reminder => (
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

                    {upcomingReminders.map(reminder => (
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