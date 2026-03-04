import {useCallback, useState} from 'react';
import {ScrollView, View} from "react-native";
import TopBar from "@/components/ui/TopBar";
import colors from "@/constants/colors";
import AlertStrip from "@/components/ui/AlertStrip";
import ActivityCalendar from "@/screens/activities/components/ActivityCalendar";
import {CalendarBlankIcon, PlusIcon} from "phosphor-react-native";
import {router, useFocusEffect} from "expo-router";
import ActivityCard from "@/screens/activities/components/ActivityCard";
import SharedButton from "@/components/ui/SharedButton";
import {formatSelectedDate} from "@/utils/dateTimeUtils";
import {sharedStyles} from "@/constants/sharedStyles";
import SectionLabel from "@/components/ui/SectionLabel";
import {useActivitiesDB} from "@/screens/activities/hooks/useActivitiesDB";
import {Activity} from "@/types/activity";

function ActivitiesListScreen() {
    const {getActivities, getFutureActivities} = useActivitiesDB();

    const [allActivities, setAllActivities] = useState<Activity[]>([]);
    const [selectedDay, setSelectedDay] = useState<string>(new Date().toISOString().split('T')[0])
    const [markedDates, setMarkedDates] = useState<string[]>([]);
    const [futureActivities, setFutureActivities] = useState<number>(0);

    const onChangeSelectedDay = (date: Date) => {
        setSelectedDay(date.toISOString().split('T')[0])
    }

    useFocusEffect(
        useCallback(() => {
            getActivities().then((activities) => {
                setAllActivities(activities.filter(a => a.date === selectedDay));
                setMarkedDates(activities.map(a => a.date));
            })
            getFutureActivities(new Date()).then((count) => {
                setFutureActivities(count);
            })
        }, [selectedDay])
    )

    const getLabel = () => {
        if (selectedDay === new Date().toISOString().split('T')[0]) {
            return 'Today · ' + allActivities.length + ' ' + (allActivities.length === 1 ? 'activity' : 'activities');
        }
        return formatSelectedDate(selectedDay) + ' · ' + allActivities.length + ' ' + (allActivities.length === 1 ? 'activity' : 'activities');
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
                    value: allActivities.length.toString(),
                }} right={{
                    icon: 'bell',
                    iconColor: colors.warning,
                    iconBg: colors.warningLight,
                    label: 'Upcoming activities',
                    value: futureActivities.toString(),
                }}/>

                <ActivityCalendar markedDates={markedDates} onDaySelect={onChangeSelectedDay}/>

                <View style={sharedStyles.section}>
                    {/* Section label */}
                    <SectionLabel icon={<CalendarBlankIcon size={13} color={colors.textMuted} weight="fill"/>}
                                  label={getLabel()}/>

                    {allActivities.map(activity => (
                        <ActivityCard
                            key={activity.id}
                            title={activity.title}
                            time={activity.time ?? activity.date}
                            priority={activity.prioritized}
                            category={activity.category}
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