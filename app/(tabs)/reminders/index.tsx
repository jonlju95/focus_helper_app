import {ScrollView, StyleSheet, Text, View} from "react-native";
import TopBar from "@/components/ui/TopBar";
import colors from "@/constants/colors";
import ReminderTabs from "@/components/reminders/ReminderTabs";
import {ReminderType} from "@/types/reminder";
import React, {useState} from "react";
import ReminderCard from "@/components/reminders/ReminderCard";
import {router} from "expo-router";
import {CalendarBlankIcon, ClockIcon, PlusIcon} from "phosphor-react-native";
import AlertStrip from "@/components/ui/AlertStrip";
import { MOCK_REMINDERS } from "@/data/reminders";
import SharedButton from "@/components/ui/SharedButton";


export default function RemindersScreen() {
    const [activeTab, setActiveTab] = useState<ReminderType>('reminder');

    const filtered = MOCK_REMINDERS.filter(r => r.type === activeTab);

    return (
        <View style={styles.container}>
            <TopBar title="Reminders" onMenu={() => {
            }}/>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
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
                    <View style={styles.sectionLabel}>
                        <ClockIcon size={13} color={colors.textMuted} weight="fill"/>
                        <Text style={styles.sectionLabelText}>Today</Text>
                    </View>
                    {filtered.map(reminder => (
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
                    <View style={styles.sectionLabel}>
                        <CalendarBlankIcon size={13} color={colors.textMuted} weight="fill"/>
                        <Text style={styles.sectionLabelText}>Upcoming</Text>
                    </View>
                    {filtered.map(reminder => (
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
                <View style={styles.buttonContainer}>
                    <SharedButton icon={<PlusIcon size={12} color={'white'} weight={'bold'}/>} label={'Add new reminder'}
                                  customStyle={{alignSelf: 'stretch'}} onPress={() => router.push('/reminders/new')}/>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 16,
        gap: 16,
    },
    dailyReminders: {
        marginHorizontal: 16,
        gap: 12
    },
    sectionLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    sectionLabelText: {
        fontSize: 11,
        fontFamily: 'Nunito_800',
        color: colors.textMuted,
        letterSpacing: 1.2,
        textTransform: 'uppercase',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 60
    }
});