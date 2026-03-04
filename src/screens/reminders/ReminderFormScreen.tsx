import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from "react-native";
import TopBar from "@/components/ui/TopBar";
import {router} from "expo-router";
import SharedInput from "@/components/ui/sharedInputs/SharedInput";
import SharedButton from "@/components/ui/SharedButton";
import SharedOptionPicker, {Option} from "@/components/ui/sharedInputs/SharedOptionPicker";
import SharedDatePicker from "@/components/ui/sharedInputs/SharedDatePicker";
import spacing from "@/constants/spacing";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {sharedStyles} from "@/constants/sharedStyles";
import {Controller} from "react-hook-form";
import ToggleButton from "@/components/ui/sharedInputs/ToggleButton";
import ReminderTable from "@/screens/reminders/components/ReminderTable";
import {useReminderTabs} from "@/screens/reminders/hooks/useReminderTabs";
import {useReminderForm} from "@/screens/reminders/hooks/useReminderForm";

const FIELD_WIDTH = (Dimensions.get('window').width - 78) / 2;

function ReminderFormScreen() {
    const {
        control, handleSubmit, fields, errors,
        isDisabled, isEditing, addTask, deleteTask, onSubmit
    } = useReminderForm();

    const {getReminderTabs} = useReminderTabs();
    const [options, setOptions] = useState<Option[]>([]);

    useEffect(() => {
        getReminderTabs().then((tabs) => {
            let options: Option[] = [];
            tabs.forEach((tab) => {
                options.push({
                    label: tab.name,
                    value: tab.id,
                });
            })
            setOptions(options);
        });
    }, []);

    return (
        <View style={sharedStyles.container}>
            <TopBar title={isEditing ? 'Edit reminder' : 'New reminder'} showBack={true}
                    onBack={() => router.back()}/>
            <KeyboardAwareScrollView
                style={sharedStyles.scroll}
                contentContainerStyle={sharedStyles.scrollContent}
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}>
                <View style={[sharedStyles.card, {gap: spacing[3]}]}>
                    <Controller control={control} name={'title'} rules={{required: 'Title is required '}}
                                render={({field: {value, onChange}}) => (
                                    <SharedInput label={'Title'} value={value} required={true} placeholder={'Title'}
                                                 onChangeText={onChange}/>
                                )}/>
                    <View style={[sharedStyles.row, styles.dateTypeRow]}>
                        <View style={{flex: 1}}>
                            <Controller control={control} name={'date'} render={({field: {value, onChange}}) => (
                                <SharedDatePicker label={'Date'} value={value} onChange={onChange}/>
                            )}/>
                        </View>
                        <View style={{flex: 1}}>
                            <Controller control={control} name={'time'} render={({field: {value, onChange}}) => (
                                <SharedDatePicker mode={'time'} label={'Time'} value={value} onChange={onChange}/>
                            )}/>
                        </View>
                    </View>
                    <View style={[sharedStyles.row, styles.dateTypeRow]}>
                        <View style={{width: FIELD_WIDTH}}>
                            <Controller control={control} name={'typeId'} render={({field: {value, onChange}}) => (
                                <SharedOptionPicker label={'Type'} options={options} value={value}
                                                    onChange={onChange}/>
                            )}/>
                        </View>
                        <View style={{width: FIELD_WIDTH}}>
                            <Controller control={control} name={'prioritized'} render={({field: {value, onChange}}) => (
                                <ToggleButton value={value} onChange={onChange} showLabel={true} label={'Prioritized'}/>
                            )}/>
                        </View>
                    </View>

                </View>
                <ReminderTable tasks={fields} isEditing={true} onAddTask={addTask}
                               onDeleteTask={deleteTask}/>
                <View style={[sharedStyles.row, {justifyContent: 'flex-end'}]}>
                    <SharedButton label={'Save'} onPress={handleSubmit(onSubmit)} disabled={isDisabled}/>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    dateTypeRow: {
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        gap: spacing[3],
    },
})
export default ReminderFormScreen;