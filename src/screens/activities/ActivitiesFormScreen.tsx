import {Dimensions, StyleSheet, View} from "react-native";
import {Controller} from "react-hook-form";
import {router} from "expo-router";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import spacing from "@/constants/spacing";
import {sharedStyles} from "@/constants/sharedStyles";
import TopBar from "@/components/ui/TopBar";
import SharedOptionPicker from "@/components/ui/sharedInputs/SharedOptionPicker";
import SharedInput from "@/components/ui/sharedInputs/SharedInput";
import SharedDatePicker from "@/components/ui/sharedInputs/SharedDatePicker";
import ToggleButton from "@/components/ui/sharedInputs/ToggleButton";
import SharedButton from "@/components/ui/SharedButton";
import {useActivitiesForm} from "@/screens/activities/hooks/useActivityForm";

const FIELD_WIDTH = (Dimensions.get('window').width - 78) / 2;

function ActivitiesFormScreen() {
    const {
        control,
        handleSubmit,
        isDisabled,
        isEditing,
        onSubmit,
        options
    } = useActivitiesForm();

    return (
        <View style={sharedStyles.container}>
            <TopBar title={isEditing ? 'Edit activity' : 'New activity'} showBack={true} onBack={() => router.back()}/>
            <KeyboardAwareScrollView
                style={sharedStyles.scroll}
                contentContainerStyle={sharedStyles.scrollContent}
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}>
                <View style={[sharedStyles.card, {gap: spacing[3]}]}>
                    <Controller control={control} name={'title'} render={({field: {value, onChange}}) => (
                        <SharedInput label={'Title'} value={value} required={true} placeholder={'e.g. Morning routine'}
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
                                <SharedDatePicker mode={'time'} label={'Time'} value={value || new Date()}
                                                  onChange={onChange}/>
                            )}/>
                        </View>
                    </View>
                    <View style={[sharedStyles.row, styles.dateTypeRow]}>
                        <View style={{width: FIELD_WIDTH}}>
                            <Controller control={control} name={'categoryId'} render={({field: {value, onChange}}) => (
                                <SharedOptionPicker label={'Category'} options={options} value={value}
                                                    onChange={onChange}/>
                            )}/>
                        </View>
                        <View style={{width: FIELD_WIDTH}}>
                            <Controller control={control} name={'prioritized'} render={({field: {value, onChange}}) => (
                                <ToggleButton value={value} onChange={onChange} showLabel={true} label={'Prioritized'}/>
                            )}/>
                        </View>
                    </View>
                    <View>
                        <Controller control={control} name={'description'} render={({field: {value, onChange}}) => (
                            <SharedInput label={'Description'} value={value}
                                         placeholder={'What do you need to remember about this activity?'}
                                         customStyle={{minHeight: 160}}
                                         onChangeText={onChange}
                                         multiline={true}/>
                        )}/>
                    </View>
                </View>
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
        gap: spacing[3]
    },
})

export default ActivitiesFormScreen;