import {StyleSheet, Text, View} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import {MOCK_EXPENSES} from "@/screens/expenses/data/expenses";
import {Expense} from "@/types/expense";
import React, {useState} from "react";
import {CATEGORY_COLORS} from "@/types/categoryColors";
import OptionPicker, {Option} from "@/components/ui/OptionPicker";
import TopBar from "@/components/ui/TopBar";
import spacing from "@/constants/spacing";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import SharedInput from "@/components/ui/SharedInput";
import SharedDatePicker from "@/components/ui/SharedDatePicker";
import {capitalise} from "@/utils/formatLabel";
import typography from "@/constants/typography";
import SharedButton from "@/components/ui/SharedButton";
import colors from "@/constants/colors";

function ExpensesFormScreen() {
    const {id} = useLocalSearchParams<{ id: string }>();
    const {date} = useLocalSearchParams<{ date: string }>();

    const existing = id ? MOCK_EXPENSES.find(e => e.id === id) : undefined;

    const [expense, setExpense] = useState<Expense>(existing ?? {
        id: Date.now().toString(),
        title: '',
        date: new Date(date).toISOString() ?? new Date().toISOString(),
        type: 'groceries',
        amount: '0',
        location: '',
        description: '',
    });

    const typeColor = CATEGORY_COLORS[expense.type];

    const isEditing = !!existing;

    const options: Option[] = [
        {label: 'Groceries', value: 'groceries'},
        {label: 'Food&Drink', value: 'food&drink'},
        {label: 'Transport', value: 'transport'},
        {label: 'Health', value: 'health'},
        {label: 'Subscriptions', value: 'subscriptions'},
        {label: 'Home', value: 'home'},
        {label: 'Other', value: 'other'},
    ]

    const changeSelectedOption = (optionValue: string) => {
        const option = options.find(option => option.value === optionValue);
        if (option) {
            setSelectedOption(option);
        }
    }

    const changeSelectedDate = (date: Date) => {
        setSelectedDate(date);
    }

    const updateField = <K extends keyof Expense>(key: K, value: Expense[K]) => {
        setExpense(prev => ({...prev, [key]: value}));
    };

    const [selectedOption, setSelectedOption] = useState<Option>(options.filter(o => o.value === expense.type)[0]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(expense.date));

    return (
        <View style={styles.container}>
            <TopBar title={isEditing ? 'Edit expense' : 'New expense'} showBack={true} onBack={() => router.back()}
                    onMenu={() => {
                    }}/>

            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}
                extraScrollHeight={0}
            >
                <View style={styles.wrapper}>
                    <SharedInput label={'Title'} value={expense.title} required={true}
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
                            {capitalise(expense.type)}
                        </Text>
                    </View>
                    <View style={styles.secondRow}>
                        <View style={{flex: 1}}>
                            <SharedInput label={'Amount (kr)'} value={expense.amount.toString()} required={true}
                                         placeholder={'0'}
                                         onChangeText={text => updateField('amount', text)}/>
                        </View>
                        <View style={{flex: 1}}>
                            <SharedInput label={'Location'} value={expense.location}
                                         placeholder={'e.g. Store'}
                                         onChangeText={text => updateField('location', text)}/>
                        </View>
                    </View>
                    <View>
                        <SharedInput label={'Description'} value={expense.description}
                                     placeholder={'Any notes about this expense?'}
                                     customStyle={{minHeight: 160}}
                                     onChangeText={text => updateField('description', text)}/>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
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
        justifyContent: "flex-end",
        marginTop: spacing[3]
    },
})

export default ExpensesFormScreen;