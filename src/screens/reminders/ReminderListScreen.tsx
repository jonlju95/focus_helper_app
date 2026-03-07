import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {router} from 'expo-router';
import {CalendarBlankIcon, ClockIcon, FunnelIcon, PlusIcon} from 'phosphor-react-native';

import colors from '@/constants/colors';
import spacing from '@/constants/spacing';
import typography from '@/constants/typography';
import {sharedStyles} from '@/constants/sharedStyles';
import {Reminder} from '@/screens/reminders/types/reminder';
import AlertStrip from '@/components/ui/AlertStrip';
import EmptyState from '@/components/ui/EmptyState';
import RangeFilterModal from '@/components/ui/modals/RangeFilterModal';
import SectionLabel from '@/components/ui/SectionLabel';
import SharedButton from '@/components/ui/SharedButton';
import TopBar from '@/components/ui/TopBar';
import ReminderCard from '@/screens/reminders/components/ReminderCard';
import ReminderTabs from '@/screens/reminders/components/ReminderTabs';
import {useReminderList} from '@/screens/reminders/hooks/useReminderList';

export default function ReminderListScreen() {
    const {
        reminderTabs,
        activeTab, setActiveTab,
        filterVisible, setFilterVisible,
        filterRange, setFilterRange,
        pastReminders, todayReminders, upcomingReminders,
    } = useReminderList();

    const renderCard = (reminder: Reminder) => (
        <ReminderCard
            key={reminder.id}
            title={reminder.title}
            date={reminder.date}
            time={reminder.time ?? ''}
            iconColor={reminder.prioritized ? colors.primary : colors.info}
            iconBg={reminder.prioritized ? colors.primaryLight : colors.infoLight}
            priority={reminder.prioritized}
            tasks={reminder.tasks}
            onPress={() => router.push({pathname: '/reminders/[id]', params: {id: reminder.id}})}
            complete={reminder.tasks.filter(t => t.completed).length === reminder.tasks.length}
        />
    );

    return (
        <View style={sharedStyles.container}>
            <TopBar title="Reminders"/>
            <ScrollView
                style={sharedStyles.scroll}
                contentContainerStyle={sharedStyles.scrollContent}
                showsVerticalScrollIndicator={false}>

                <AlertStrip
                    left={{
                        icon: 'warning',
                        iconColor: colors.urgent,
                        iconBg: colors.urgentLight,
                        label: 'Reminders today',
                        value: todayReminders.length.toString(),
                    }}
                    right={{
                        icon: 'bell',
                        iconColor: colors.warning,
                        iconBg: colors.warningLight,
                        label: 'Upcoming reminders',
                        value: upcomingReminders.length.toString(),
                    }}
                />

                {activeTab && <ReminderTabs tabs={reminderTabs} activeTab={activeTab} onChange={setActiveTab}/>}

                <View style={styles.section}>
                    <View style={[sharedStyles.row, styles.sectionHeader]}>
                        <SectionLabel
                            icon={<ClockIcon size={13} color={colors.textMuted} weight="fill"/>}
                            label="Past reminders"
                        />
                        <Pressable style={styles.filterButton} onPress={() => setFilterVisible(true)}>
                            <FunnelIcon size={14} color={colors.textMuted} weight="fill"/>
                            <Text style={styles.filterButtonText}>
                                {filterRange === 'week' ? 'This week' :
                                    filterRange === 'month' ? 'This month' : 'All'}
                            </Text>
                        </Pressable>
                    </View>
                    {pastReminders.length === 0
                        ? <EmptyState message="No past reminders"/>
                        : pastReminders.map(renderCard)}
                </View>

                <RangeFilterModal
                    visible={filterVisible}
                    value={filterRange}
                    onChange={setFilterRange}
                    onClose={() => setFilterVisible(false)}
                />

                <View style={styles.section}>
                    <SectionLabel
                        icon={<ClockIcon size={13} color={colors.textMuted} weight="fill"/>}
                        label="Reminders today"
                    />
                    {todayReminders.length === 0
                        ? <EmptyState message="Nothing due today"/>
                        : todayReminders.map(renderCard)}
                </View>

                <View style={styles.section}>
                    <SectionLabel
                        icon={<CalendarBlankIcon size={13} color={colors.textMuted} weight="fill"/>}
                        label="Upcoming reminders"
                    />
                    {upcomingReminders.length === 0
                        ? <EmptyState message="Nothing upcoming"/>
                        : upcomingReminders.map(renderCard)}
                </View>

                <View style={sharedStyles.buttonContainer}>
                    <SharedButton
                        icon={<PlusIcon size={12} color="white" weight="bold"/>}
                        label="Add new reminder"
                        customStyle={{alignSelf: 'stretch'}}
                        onPress={() => router.navigate('/reminders/new?from=reminders')}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {gap: spacing[3]},
    sectionHeader: {justifyContent: 'space-between'},
    filterButton: {flexDirection: 'row', alignItems: 'center', gap: spacing[1]},
    filterButtonText: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_600`,
        color: colors.textMuted,
    },
});