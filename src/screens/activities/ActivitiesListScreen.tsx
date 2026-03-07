import {ScrollView, View} from "react-native";
import {RelativePathString, router} from "expo-router";
import {CalendarBlankIcon, PlusIcon} from "phosphor-react-native";

import colors from "@/constants/colors";
import {sharedStyles} from "@/constants/sharedStyles";
import TopBar from "@/components/ui/TopBar";
import AlertStrip from "@/components/ui/AlertStrip";
import SharedButton from "@/components/ui/SharedButton";
import SectionLabel from "@/components/ui/SectionLabel";
import ActivityCalendar from "@/screens/activities/components/ActivityCalendar";
import ActivityCard from "@/screens/activities/components/ActivityCard";
import {useActivityList} from "@/screens/activities/hooks/useActivityList";

function ActivitiesListScreen() {
    const {
        allActivities,
        selectedDay,
        markedDates,
        futureActivities,
        onChangeSelectedDay,
        getLabel
    } = useActivityList();

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
                                      pathname: `/activities/new?from=activities` as RelativePathString,
                                      params: {date: selectedDay}
                                  })}/>
                </View>
            </ScrollView>
        </View>
    );
}

export default ActivitiesListScreen;