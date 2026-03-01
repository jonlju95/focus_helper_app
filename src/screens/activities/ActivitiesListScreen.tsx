import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import TopBar from "@/components/ui/TopBar";
import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import AlertStrip from "@/components/ui/AlertStrip";
import ActivityCalendar from "@/screens/activities/components/ActivityCalendar";
import {CalendarBlankIcon, PlusIcon} from "phosphor-react-native";
import typography from "@/constants/typography";
import {router} from "expo-router";
import {MOCK_ACTIVITIES} from "@/screens/activities/data/activities";
import ActivityCard from "@/screens/activities/components/ActivityCard";
import SharedButton from "@/components/ui/SharedButton";
import {formatSelectedDate} from "@/utils/formatDate";

function ActivitiesListScreen() {
    const [selectedDay, setSelectedDay] = useState<string>(new Date().toISOString().split('T')[0])

    const markedDates = MOCK_ACTIVITIES.map(a => a.date);
    const filtered = MOCK_ACTIVITIES.filter(a => a.date === selectedDay);

    const onChangeSelectedDay = (date: Date) => {
        setSelectedDay(date.toISOString().split('T')[0])
    }

    return (
        <View style={styles.container}>
            <TopBar title="Activities" onMenu={() => {
            }}/>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                <AlertStrip left={{
                    icon: 'warning',
                    iconColor: colors.urgent,
                    iconBg: colors.urgentLight,
                    label: 'Activities today',
                    value: '3',
                }} right={{
                    icon: 'bell',
                    iconColor: colors.warning,
                    iconBg: colors.warningLight,
                    label: 'Upcoming activities',
                    value: '3',
                }}/>
                <ActivityCalendar markedDates={markedDates} onDaySelect={onChangeSelectedDay}/>
                <View style={styles.dailyActivities}>
                    {/* Section label */}
                    <View style={styles.sectionLabel}>
                        <CalendarBlankIcon size={13} color={colors.textMuted} weight="fill"/>
                        <Text style={typography.styles.sectionLabel}>{`${formatSelectedDate(selectedDay)}  ·  ${filtered.length} ${filtered.length === 1 ? 'activity' : 'activities'}`}</Text>
                    </View>
                    {filtered.map(activity => (
                        <ActivityCard
                            key={activity.id}
                            title={activity.title}
                            time={activity.time ?? activity.date}
                            priority={activity.prioritized}
                            type={activity.type}
                            onPress={() => router.push({
                                pathname: '/activities/[id]',
                                params: {id: activity.id}
                            })}
                        />
                    ))}
                </View>
                <View style={styles.buttonContainer}>
                    <SharedButton icon={<PlusIcon size={12} color={'white'} weight={'bold'}/>}
                                  label={'Add new activity'} customStyle={{alignSelf: 'stretch'}}
                                  onPress={() => router.push({
                                      pathname: `/activities/new`,
                                      params: {date: selectedDay}
                                  })}/>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgApp,
        paddingHorizontal: spacing[4],
        gap: spacing[3]
    },
    scrollContent: {
        paddingBottom: spacing[4],
        gap: spacing[4],
    },
    dailyActivities: {
        gap: spacing[3]
    },
    sectionLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[1],
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: spacing[15]
    }
});

export default ActivitiesListScreen;