import React, {useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import TopBar from "@/components/ui/TopBar";
import {router, useLocalSearchParams} from "expo-router";
import {MOCK_REMINDERS} from "@/screens/reminders/data/reminders";
import {Reminder} from "@/types/reminder";
import SharedInput from "@/components/ui/sharedInputs/SharedInput";
import ReminderTable from "@/screens/reminders/components/ReminderTable";
import ToggleButton from "@/components/ui/sharedInputs/ToggleButton";
import SharedButton from "@/components/ui/SharedButton";
import SharedOptionPicker, {Option} from "@/components/ui/sharedInputs/SharedOptionPicker";
import SharedDatePicker from "@/components/ui/sharedInputs/SharedDatePicker";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {sharedStyles} from "@/constants/sharedStyles";

function ReminderFormScreen() {
    const {id} = useLocalSearchParams<{ id?: string }>();

    const existing = id ? MOCK_REMINDERS.find(r => r.id === id) : undefined;

    const [reminder, setReminder] = useState<Reminder>(existing ?? {
        id: Date.now().toString(),  // temporary id for now
        title: '',
        date: new Date().toISOString(),
        time: '',
        type: 'reminder',
        prioritized: false,
        tasks: [],
    });

    const isEditing = !!existing;

    const options: Option[] = [
        {label: 'Reminder', value: 'reminder'},
        {label: 'Shopping', value: 'shopping'},
        {label: 'Notes', value: 'notes'},
    ]

    const [selectedOption, setSelectedOption] = useState<Option>(options.filter(o => o.value === reminder.type)[0]);
    const [selectedDate, setSelectedDate] = useState<Date>(existing ? new Date(reminder.date) : new Date(Date.now()));

    const addTask = (label: string) => {
        setReminder(prev => ({
            ...prev,
            tasks: [
                ...prev.tasks,
                {
                    id: Date.now().toString(),
                    label: label,
                    completed: false,
                }
            ],
        }));
    };

    const deleteTask = (taskId: string) => {
        setReminder(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                tasks: prev.tasks.filter(task => task.id !== taskId),
            };
        });
    };

    const togglePriority = (priority: boolean) => {
        setReminder(prev => {
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

    const updateField = <K extends keyof Reminder>(key: K, value: Reminder[K]) => {
        setReminder(prev => ({...prev, [key]: value}));
    };

    return (
        <View style={sharedStyles.container}>
            <TopBar title={isEditing ? 'Edit reminder' : 'New reminder'} showBack={true} onBack={() => router.back()}/>
            <KeyboardAwareScrollView
                style={sharedStyles.scroll}
                contentContainerStyle={sharedStyles.scrollContent}
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}>
                <View style={[sharedStyles.card, {gap: spacing[3]}]}>
                    <SharedInput label={'Title'} value={reminder.title} required={true} placeholder={'Title'}
                                 onChangeText={text => updateField('title', text)}/>
                    <View style={[sharedStyles.row, styles.dateTypeRow]}>
                        <View style={{flex: 1}}>
                            <SharedDatePicker label={'Date'} value={selectedDate} onChange={changeSelectedDate}/>
                        </View>
                        <View style={{flex: 1}}>
                            <SharedOptionPicker label={'Type'} options={options} value={selectedOption?.value}
                                                onChange={changeSelectedOption}/>
                        </View>
                    </View>

                </View>
                <View style={{marginHorizontal: 0, marginVertical: 16}}>
                    <ReminderTable tasks={reminder.tasks} isEditing={true} onAddTask={addTask}
                                   onDeleteTask={deleteTask}/>
                </View>
                <View style={[sharedStyles.row, {justifyContent: 'space-between'}]}>
                    <View style={[sharedStyles.row, {gap: spacing[3]}]}>
                        <Text style={typography.styles.cardTitle}>Prioritized</Text>
                        <ToggleButton value={reminder.prioritized} onChange={togglePriority}/>
                    </View>
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
export default ReminderFormScreen;