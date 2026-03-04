import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import TopBar from "@/components/ui/TopBar";
import {router, useLocalSearchParams} from "expo-router";
import spacing from "@/constants/spacing";
import {MOCK_ACTIVITIES} from "@/screens/activities/data/activities";
import {Activity} from "@/types/activity";
import SharedInput from "@/components/ui/sharedInputs/SharedInput";
import SharedDatePicker from "@/components/ui/sharedInputs/SharedDatePicker";
import SharedOptionPicker, {Option} from "@/components/ui/sharedInputs/SharedOptionPicker";
import typography from "@/constants/typography";
import ToggleButton from "@/components/ui/sharedInputs/ToggleButton";
import SharedButton from "@/components/ui/SharedButton";
import {ACTIVITY_COLORS} from "@/types/categoryColors";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {ActivityTypes} from "@/types/activityTypes";
import {sharedStyles} from "@/constants/sharedStyles";
import SharedBadge from "@/components/ui/SharedBadge";
import {useActivityCategory} from "@/screens/activities/hooks/useActivityCategory";
import {Category} from "@/types/category";

function ActivitiesFormScreen() {
    const {id} = useLocalSearchParams<{ id: string }>();
    const {date} = useLocalSearchParams<{ date: string }>();

    const existing = id ? MOCK_ACTIVITIES.find(a => a.id === id) : undefined;

    const {getActivityCategories} = useActivityCategory();

    const [activityCategory, setActivityCategory] = useState<Category[]>([]);

    useEffect(() => {
        getActivityCategories().then(categories => {
            setActivityCategory(categories)
        })
    })

    const [activity, setActivity] = React.useState<Activity>(existing ?? {
        id: crypto.randomUUID(),
        title: '',
        date: new Date(date).toISOString() ?? new Date().toISOString(),
        time: '',
        type: activityCategory[0],
        prioritized: false,
        description: '',
    });



    // const typeColor = ACTIVITY_COLORS[activity.type.name];

    const isEditing = !!existing;

    const options: Option[] = [
        {label: 'Appointment', value: 'appointment'},
        {label: 'Meeting', value: 'meeting'},
        {label: 'Personal', value: 'personal'},
        {label: 'Errand', value: 'errand'},
        {label: 'Work', value: 'work'},
        {label: 'Note', value: 'note'},
    ]

    const togglePriority = (priority: boolean) => {
        setActivity(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                prioritized: priority
            };
        });
    }

    const changeSelectedOption = (optionValue: string) => {
        const option = options.find(option => option.value === optionValue);
        if (option) {
            // setSelectedOption(option);
            // setActivity(prev => ({...prev, type: option.value as ActivityTypes}))
        }
    }

    const changeSelectedDate = (date: Date) => {
        setSelectedDate(date);
        // setActivity(prev => ({...prev, date: new Date(date).toISOString()}));
    }

    const updateField = <K extends keyof Activity>(key: K, value: Activity[K]) => {
        setActivity(prev => ({...prev, [key]: value}));
    };

    // const [selectedOption, setSelectedOption] = useState<Option>(options.filter(o => o.value === activity.type)[0]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(activity.date));

    return (
        <View style={sharedStyles.container}>
            <TopBar title={isEditing ? 'Edit activity' : 'New activity'} showBack={true} onBack={() => router.back()}/>
            <KeyboardAwareScrollView
                style={sharedStyles.scroll}
                contentContainerStyle={sharedStyles.scrollContent}
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}>
                <View style={[sharedStyles.card, {gap: spacing[3]}]}>
                    {/*<SharedInput label={'Title'} value={activity.title} required={true}*/}
                    {/*             placeholder={'e.g. Morning routine'}*/}
                    {/*             onChangeText={text => updateField('title', text)}/>*/}
                    <View style={[sharedStyles.row, styles.dateTypeRow]}>
                        <View style={{flex: 1}}>
                            {/*<SharedDatePicker label={'Date'} value={selectedDate} onChange={changeSelectedDate}/>*/}
                        </View>
                        <View style={{flex: 1}}>
                            {/*<SharedOptionPicker label={'Type'} options={options} value={selectedOption?.value}*/}
                            {/*                    onChange={changeSelectedOption}/>*/}
                        </View>
                    </View>
                    <SharedBadge title={activity.type.name ?? 'Activities'} color={activity.type.colorText} bgColor={activity.type.colorBg}/>
                    <View>
                        {/*<SharedInput label={'Description'} value={activity.description} required={true}*/}
                        {/*             placeholder={'What do you need to remember about this activity?'}*/}
                        {/*             customStyle={{minHeight: 160}}*/}
                        {/*             onChangeText={text => updateField('description', text)}/>*/}
                    </View>
                </View>
                <View style={[sharedStyles.row, {justifyContent: 'space-between'}]}>
                    {/*<View style={[sharedStyles.row, {gap: spacing[3]}]}>*/}
                    {/*    <Text style={typography.styles.cardTitle}>Prioritized</Text>*/}
                    {/*    <ToggleButton value={activity.prioritized} onChange={togglePriority}/>*/}
                    {/*</View>*/}
                    <SharedButton label={'Save'}/>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    dateTypeRow: {
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        gap: spacing[3]
    },
})

export default ActivitiesFormScreen;