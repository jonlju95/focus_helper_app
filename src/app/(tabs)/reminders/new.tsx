import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import TopBar from "@/components/ui/TopBar";
import {router, useLocalSearchParams} from "expo-router";
import {MOCK_REMINDERS} from "@/screens/reminders/data/reminders";
import {Reminder} from "@/types/reminder";
import SharedInput from "@/components/ui/SharedInput";
import colors from "@/constants/colors";
import ReminderTable from "@/screens/reminders/components/ReminderTable";
import ToggleButton from "@/components/ui/ToggleButton";
import SharedButton from "@/components/ui/SharedButton";
import OptionPicker, {Option} from "@/components/ui/OptionPicker";
import SharedDatePicker from "@/components/ui/SharedDatePicker";

function New() {
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
                    label,
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
        console.log(date)
        setSelectedDate(date);
    }

    return (
        <View style={styles.container}>
            <TopBar title={isEditing ? 'Edit reminder' : 'New reminder'} showBack={true} onBack={() => router.back()}
                    onMenu={() => {
                    }}/>
            <ScrollView style={styles.scroll}
                        contentContainerStyle={styles.scrollContent}>
                <View style={styles.wrapper}>
                    <SharedInput label={'Title'} value={reminder.title} required={true} placeholder={'Title'}/>
                    <View style={styles.secondRow}>
                        <View style={{flex: 1}}>
                            <SharedDatePicker label={'Date'} value={selectedDate} onChange={changeSelectedDate}/>
                        </View>
                        <View style={{flex: 1}}>
                            <OptionPicker label={'Type'} options={options} value={selectedOption?.value}
                                          onChange={changeSelectedOption}/>
                        </View>
                    </View>


                </View>
                <View style={{marginHorizontal: 0, marginVertical: 16}}>
                    <ReminderTable tasks={reminder.tasks} isEditing={true} onAddTask={addTask}
                                   onDeleteTask={deleteTask}/>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.priorityContainer}>
                        <Text style={styles.priorityContainerText}>Prioritized</Text>
                        <ToggleButton value={reminder.prioritized} onChange={togglePriority}/>
                    </View>
                    <SharedButton label={'Save'}/>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.bgApp,
    },
    scroll: {
        marginHorizontal: 16,

    },
    scrollContent: {
        paddingBottom: 16,
    },
    wrapper: {
        padding: 16,
        backgroundColor: colors.bgCard,
        borderRadius: 16,
        flexDirection: 'column',
        gap: 12
    },
    secondRow: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        flex: 1,
        gap: 12
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    priorityContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    priorityContainerText: {
        fontSize: 14,
        fontFamily: "Nunito_800",
        color: colors.textPrimary,
    }
})
export default New;