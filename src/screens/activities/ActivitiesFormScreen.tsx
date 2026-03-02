import React, {useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import TopBar from "@/components/ui/TopBar";
import {router, useLocalSearchParams} from "expo-router";
import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import {MOCK_ACTIVITIES} from "@/screens/activities/data/activities";
import {Activity} from "@/types/activity";
import SharedInput from "@/components/ui/SharedInput";
import SharedDatePicker from "@/components/ui/SharedDatePicker";
import OptionPicker, {Option} from "@/components/ui/OptionPicker";
import typography from "@/constants/typography";
import ToggleButton from "@/components/ui/ToggleButton";
import SharedButton from "@/components/ui/SharedButton";
import {capitalise} from "@/utils/formatLabel";
import {ACTIVITY_COLORS} from "@/types/categoryColors";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

function ActivitiesFormScreen() {
    const {id} = useLocalSearchParams<{ id: string }>();
    const {date} = useLocalSearchParams<{ date: string }>();

    const existing = id ? MOCK_ACTIVITIES.find(a => a.id === id) : undefined;

    const [activity, setActivity] = React.useState<Activity>(existing ?? {
        id: Date.now().toString(),
        title: '',
        date: new Date(date).toISOString() ?? new Date().toISOString(),
        time: '',
        type: 'appointment',
        prioritized: false,
        description: '',
    });

    const typeColor = ACTIVITY_COLORS[activity.type];

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
            setSelectedOption(option);
        }
    }

    const changeSelectedDate = (date: Date) => {
        setSelectedDate(date);
    }

    const updateField = <K extends keyof Activity>(key: K, value: Activity[K]) => {
        setActivity(prev => ({...prev, [key]: value}));
    };

    const [selectedOption, setSelectedOption] = useState<Option>(options.filter(o => o.value === activity.type)[0]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(activity.date));

    return (
        <View style={styles.container}>
            <TopBar title={isEditing ? 'Edit activity' : 'New activity'} showBack={true} onBack={() => router.back()}
                    onMenu={() => {
                    }}/>

            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}
            >
                <View style={styles.wrapper}>
                    <SharedInput label={'Title'} value={activity.title} required={true}
                                 placeholder={'e.g. Morning routine'}
                                 onChangeText={text => updateField('title', text)}/>
                    <View style={styles.secondRow}>
                        <View style={{flex: 1}}>
                            <SharedDatePicker label={'Date'} value={selectedDate} onChange={changeSelectedDate}/>
                        </View>
                        <View style={{flex: 1}}>
                            <OptionPicker label={'Type'} options={options} value={selectedOption?.value}
                                          onChange={changeSelectedOption}/>
                        </View>
                    </View>
                    <View style={[styles.typeTag, {backgroundColor: typeColor.bg}]}>
                        <Text style={[styles.typeTagText, {color: typeColor.text}]}>
                            {capitalise(activity.type)}
                        </Text>
                    </View>
                    <View>
                        <SharedInput label={'Description'} value={activity.description} required={true}
                                     placeholder={'What do you need to remember about this activity?'}
                                     customStyle={{minHeight: 160}}
                                     onChangeText={text => updateField('description', text)}/>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.priorityContainer}>
                        <Text style={typography.styles.cardTitle}>Prioritized</Text>
                        <ToggleButton value={activity.prioritized} onChange={togglePriority}/>
                    </View>
                    <SharedButton label={'Save'}/>
                </View>
            </KeyboardAwareScrollView>
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
    wrapper: {
        padding: spacing[4],
        backgroundColor: colors.bgCard,
        borderRadius: spacing[4],
        flexDirection: 'column',
        gap: spacing[3]
    },
    secondRow: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        flex: 1,
        gap: spacing[3]
    },
    typeTag: {
        alignSelf: 'flex-start',
        paddingHorizontal: spacing[2],
        paddingVertical: 2,
        borderRadius: spacing[4],
        backgroundColor: colors.primaryLight,
    },
    typeTagText: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_600`,
        color: colors.primary,
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginTop: spacing[3]
    },
    priorityContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing[3],
    },
})

export default ActivitiesFormScreen;