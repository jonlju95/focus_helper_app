import {StyleSheet, View} from "react-native";
import {router} from "expo-router";
import React from "react";
import SharedOptionPicker from "@/components/ui/sharedInputs/SharedOptionPicker";
import TopBar from "@/components/ui/TopBar";
import spacing from "@/constants/spacing";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import SharedInput from "@/components/ui/sharedInputs/SharedInput";
import SharedDatePicker from "@/components/ui/sharedInputs/SharedDatePicker";
import typography from "@/constants/typography";
import SharedButton from "@/components/ui/SharedButton";
import colors from "@/constants/colors";
import {useExpenseForm} from "@/screens/expenses/hooks/useExpenseForm";
import {sharedStyles} from "@/constants/sharedStyles";
import {Controller} from "react-hook-form";

function ExpensesFormScreen() {
    const {
        control,
        handleSubmit,
        isDisabled,
        isEditing,
        onSubmit,
        normalizeAmount,
        options
    } = useExpenseForm();

    return (
        <View style={sharedStyles.container}>
            <TopBar title={isEditing ? 'Edit expense' : 'New expense'} showBack={true} showMenu={false} onBack={() => router.back()}/>

            <KeyboardAwareScrollView
                style={sharedStyles.scroll}
                contentContainerStyle={sharedStyles.scrollContent}
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}>
                <View style={[sharedStyles.card, {gap: spacing[3]}]}>
                    <Controller control={control} name={'title'} rules={{required: 'Title is required '}}
                                render={({field: {value, onChange}}) => (
                                    <SharedInput label={'Title'} value={value} required={true}
                                                 placeholder={'e.g. Morning routine'}
                                                 onChangeText={onChange}/>
                                )}/>
                    <View style={styles.secondRow}>
                        <View style={{flex: 1}}>
                            <Controller control={control} name={'date'} render={({field: {value, onChange}}) => (
                                <SharedDatePicker label={'Date'} value={value} onChange={onChange}/>
                            )}/>
                        </View>
                        <View style={{flex: 1}}>
                            <Controller control={control} name={'amount'} rules={{
                                required: 'Amount is required',
                                validate: v => {
                                    const num = parseFloat(v.replace(',', '.'));
                                    if (isNaN(num)) return 'Enter a valid amount';
                                    if (num <= 0) return 'Amount must be greater than 0';
                                    return true;
                                }
                            }}
                                        render={({field: {value, onChange}}) => (
                                            <SharedInput label={'Amount (kr)'} value={value} required={true}
                                                         placeholder={'0'}
                                                         onChangeText={text => onChange(normalizeAmount(text))}
                                                         keyboardType={'decimal-pad'}
                                            />
                                        )}/>
                        </View>
                    </View>
                    <View style={styles.secondRow}>
                        <View style={{flex: 1}}>
                            <Controller control={control} name={'categoryId'} render={({field: {value, onChange}}) => (
                                <SharedOptionPicker label={'Category'} options={options} value={value}
                                                    onChange={onChange}/>
                            )}/>
                        </View>
                        <View style={{flex: 1}}>
                            <Controller control={control} name={'location'} render={({field: {value, onChange}}) => (
                                <SharedInput label={'Location'} value={value}
                                             placeholder={'e.g. Store'}
                                             onChangeText={onChange}/>
                            )}/>
                        </View>
                    </View>
                    <View>
                        <Controller control={control} name={'description'} render={({field: {value, onChange}}) => (
                            <SharedInput label={'Description'} value={value}
                                         placeholder={'Any notes about this expense?'}
                                         customStyle={{minHeight: 160}}
                                         multiline={true}
                                         onChangeText={onChange}/>
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
        justifyContent: "flex-end",
        marginTop: spacing[3]
    },
})

export default ExpensesFormScreen;