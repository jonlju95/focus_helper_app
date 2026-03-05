import {Dimensions, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import TopBar from "@/components/ui/TopBar";
import {router, useLocalSearchParams} from "expo-router";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import SharedButton from "@/components/ui/SharedButton";
import spacing from "@/constants/spacing";
import React, {useEffect, useState} from "react";
import {ClockIcon, FileTextIcon, MapPinIcon, PenIcon, ReceiptIcon, TrashIcon} from "phosphor-react-native";
import {capitalise} from "@/utils/formatLabel";
import {LinearGradient} from "expo-linear-gradient";
import {Expense} from "@/types/expense";
import {useExpensesDB} from "@/screens/expenses/hooks/useExpensesDB";
import ConfirmDialog from "@/components/ui/modals/ConfirmDialog";
import {sharedStyles} from "@/constants/sharedStyles";
import SharedBadge from "@/components/ui/SharedBadge";

const FIELD_WIDTH = (Dimensions.get('window').width - 78) / 2;

function ExpensesDetailScreen() {
    const {id} = useLocalSearchParams<{ id: string }>();
    const {getExpense, deleteExpense} = useExpensesDB();
    const [expense, setExpense] = useState<Expense>();
    const [deleteVisible, setDeleteVisible] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        getExpense(id).then((expense) => {
            if (!expense) {
                return;
            }
            setExpense(expense);
        })
    }, []);

    if (!expense) return <View><Text>Expense not found</Text></View>

    const onDelete = async () => {
        setDeleteVisible(false);
        await deleteExpense(expense.id);
        router.dismissAll();
        router.replace('/activities');
    }

    return (
        <View style={sharedStyles.container}>
            <TopBar title={expense.title} showBack={true} onBack={() => router.back()}/>

            <ScrollView style={sharedStyles.scroll}
                        contentContainerStyle={sharedStyles.scrollContent}
                        showsVerticalScrollIndicator={false}>
                <View style={sharedStyles.card}>
                    <View style={[sharedStyles.row, {justifyContent: "space-between"}]}>
                        <Text style={[typography.styles.cardTitle, {fontSize: 22,}]}>{expense.title}</Text>
                        <Pressable style={[sharedStyles.row, styles.editButton]} onPress={() => {
                            router.push({
                                pathname: `/expenses/new`,
                                params: {id: expense.id}
                            })
                        }}>
                            <PenIcon size={14} color={colors.primary} weight={'bold'}/>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </Pressable>
                    </View>
                    <View style={[sharedStyles.row, styles.cardMeta]}>
                        <ClockIcon size={11} color={colors.textMuted} weight={'fill'}/>
                        <Text style={typography.styles.metaText}>{expense.date}</Text>
                        <SharedBadge title={capitalise(expense.category?.name as string)}
                                     color={expense.category?.colorText}
                                     bgColor={expense.category?.colorBg}/>
                    </View>
                    <LinearGradient
                        colors={[colors.primary, colors.primaryDark]}
                        start={{x: 0.3, y: 1}}
                        end={{x: 0.5, y: 0}}
                        style={[sharedStyles.card, styles.cardAmountBody]}>
                        <Text style={[typography.styles.sectionLabel, styles.cardAmountLabel]}>Amount paid</Text>
                        <View style={styles.cardAmountTitle}>
                            <Text style={typography.styles.heroAmount}>{expense.amount}</Text>
                            <Text style={styles.cardAmountSubtitle}>kr</Text>
                        </View>
                        <ReceiptIcon style={{position: 'absolute', right: spacing[4], top: '50%'}} size={36}
                                     color={'rgba(255,255,255,0.2)'} weight={'fill'}/>
                    </LinearGradient>
                    {expense.location && (
                        <View>
                            <View style={[sharedStyles.row, styles.cardLabel]}>
                                <MapPinIcon size={14} color={colors.primary} weight={'fill'}/>
                                <Text style={[typography.styles.sectionLabel, {color: colors.primary}]}>Location</Text>
                            </View>
                            <Text style={typography.styles.bodyText}>{expense.location}</Text>
                        </View>
                    )}
                    {expense.description && (
                        <View>
                            <View style={[sharedStyles.row, styles.cardLabel]}>
                                <FileTextIcon size={14} color={colors.primary} weight={'fill'}/>
                                <Text
                                    style={[typography.styles.sectionLabel, {color: colors.primary}]}>Description</Text>
                            </View>
                            <Text style={typography.styles.bodyText}>{expense.description}</Text>
                        </View>
                    )}
                </View>
                <View style={[sharedStyles.row, {justifyContent: 'flex-end'}]}>
                    <SharedButton icon={<TrashIcon size={16} color={'#FFF'} weight={'bold'}/>}
                                  label={'Delete'} onPress={() => setDeleteVisible(true)}/>
                    <ConfirmDialog
                        visible={deleteVisible}
                        title="Delete expense?"
                        message="This cannot be undone"
                        confirmLabel="Delete"
                        onCancel={() => setDeleteVisible(false)}
                        onConfirm={onDelete}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    editButton: {
        gap: spacing[1],
        backgroundColor: colors.primaryLight,
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[2],
        borderRadius: spacing[3],
    },

    editButtonText: {
        fontSize: 13,
        fontFamily: "Nunito_800",
        color: colors.primary
    },

    cardMeta: {
        alignSelf: "flex-start",
        gap: spacing[1],
        marginTop: spacing[1],
        marginBottom: spacing[2],
    },

    cardLabel: {
        gap: spacing[1],
        marginTop: spacing[4],
        marginBottom: spacing[2],
    },

    tag: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 2,
        borderRadius: 20,
        backgroundColor: colors.primaryLight,
    },
    cardAmountBody: {
        marginVertical: spacing[2],

        elevation: 4,
        shadowColor: 'rgba(196,98,45)',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.28,
        shadowRadius: 24,
    },

    cardAmountLabel: {
        letterSpacing: 0.8,
        color: 'rgba(255,255,255,0.7)',
    },

    cardAmountTitle: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 2
    },

    cardAmountSubtitle: {
        fontSize: 16,
        fontFamily: `Nunito_600`,
        color: 'rgba(255,255,255,0.6)',
    },
})

export default ExpensesDetailScreen;