import React, {useState} from 'react';
import {ScrollView, View} from "react-native";
import TopBar from "@/components/ui/TopBar";
import colors from "@/constants/colors";
import AlertStrip from "@/components/ui/AlertStrip";
import ActivityCalendar from "@/screens/activities/components/ActivityCalendar";
import {CalendarBlankIcon, PlusIcon} from "phosphor-react-native";
import {router} from "expo-router";
import {MOCK_ACTIVITIES} from "@/screens/activities/data/activities";
import ActivityCard from "@/screens/activities/components/ActivityCard";
import SharedButton from "@/components/ui/SharedButton";
import {formatSelectedDate} from "@/utils/dateTimeUtils";
import {sharedStyles} from "@/constants/sharedStyles";
import SectionLabel from "@/components/ui/SectionLabel";

function ActivitiesListScreen() {
    const [selectedDay, setSelectedDay] = useState<string>(new Date().toISOString().split('T')[0])

    const markedDates = MOCK_ACTIVITIES.map(a => a.date);
    const filtered = MOCK_ACTIVITIES.filter(a => a.date === selectedDay);

    const onChangeSelectedDay = (date: Date) => {
        setSelectedDay(date.toISOString().split('T')[0])
    }

    return (
        <View style={sharedStyles.container}>
            <TopBar title="Activities"/>

            <ScrollView
                style={sharedStyles.scroll}
                contentContainerStyle={sharedStyles.scrollContent}
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


                <View style={sharedStyles.section}>
                    {/* Section label */}
                    <SectionLabel icon={<CalendarBlankIcon size={13} color={colors.textMuted} weight="fill"/>}
                                  label={`${formatSelectedDate(selectedDay)}  ·  ${filtered.length} ${filtered.length === 1 ? 'activity' : 'activities'}`}/>
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
                <View style={sharedStyles.buttonContainer}>
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

export default ActivitiesListScreen;