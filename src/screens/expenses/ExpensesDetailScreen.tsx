import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import TopBar from "@/components/ui/TopBar";
import {router, useLocalSearchParams} from "expo-router";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import SharedButton from "@/components/ui/SharedButton";
import spacing from "@/constants/spacing";
import React from "react";
import {MOCK_EXPENSES} from "@/screens/expenses/data/expenses";
import {ClockIcon, FileTextIcon, MapPinIcon, PenIcon, ReceiptIcon} from "phosphor-react-native";
import {capitalise} from "@/utils/formatLabel";
import {CATEGORY_COLORS} from "@/types/categoryColors";
import {LinearGradient} from "expo-linear-gradient";

function ExpensesDetailScreen() {
    const {id} = useLocalSearchParams<{ id: string }>();

    const foundExpense = MOCK_EXPENSES.find(e => e.id === id);
    const [expense, setExpense] = React.useState(foundExpense);

    if (!expense) return <View><Text>Expense not found</Text></View>

    const typeColor = CATEGORY_COLORS[expense.type];

    return (
        <View style={styles.container}>
            <TopBar title={expense.title} showBack={true} onBack={() => router.back()} onMenu={() => {
            }}/>

            <ScrollView contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderText}>{expense.title}</Text>
                        <Pressable style={styles.editButton} onPress={() => {
                            router.push({
                                pathname: `/activities/new`,
                                params: {id: expense.id}
                            })
                        }}>
                            <PenIcon size={14} color={colors.primary} weight={'bold'}/>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </Pressable>
                    </View>
                    <View style={styles.cardMeta}>
                        <ClockIcon size={11} color={colors.textMuted} weight={'fill'}/>
                        <Text style={styles.cardMetaText}>{expense.date}</Text>
                        <View style={[styles.cardMetaType, {backgroundColor: typeColor.bg}]}>
                            <Text style={[styles.cardMetaTypeText, {color: typeColor.text}]}>
                                {capitalise(expense.type)}
                            </Text>
                        </View>
                    </View>
                    <LinearGradient
                        colors={[colors.primary, colors.primaryDark]}
                        start={{x: 0.3, y: 1}}
                        end={{x: 0.5, y: 0}}
                        style={styles.cardAmountBody}>
                        <Text style={styles.cardAmountLabel}>Amount paid</Text>
                        <View style={styles.cardAmountTitle}>
                            <Text style={styles.cardAmountTitleText}>{expense.amount}</Text>
                            <Text style={styles.cardAmountSubtitle}>kr</Text>
                        </View>
                        <ReceiptIcon style={{ position: 'absolute', right: spacing[4], top: '50%'}} size={36} color={'rgba(255,255,255,0.2)'} weight={'fill'}/>
                    </LinearGradient>
                    {expense.location && (
                        <View>
                            <View style={styles.cardLabel}>
                                <MapPinIcon size={14} color={colors.primary} weight={'fill'}/>
                                <Text style={[typography.styles.sectionLabel, {color: colors.primary}]}>Location</Text>
                            </View>
                            <Text style={typography.styles.bodyText}>{expense.location}</Text>
                        </View>
                    )}
                    {expense.description && (
                        <View>
                            <View style={styles.cardLabel}>
                                <FileTextIcon size={14} color={colors.primary} weight={'fill'}/>
                                <Text
                                    style={[typography.styles.sectionLabel, {color: colors.primary}]}>Description</Text>
                            </View>
                            <Text style={typography.styles.bodyText}>{expense.description}</Text>
                        </View>
                    )}
                </View>
                <View style={styles.buttonContainer}>
                    <SharedButton label={'Confirm'}/>
                </View>
            </ScrollView>
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
    scrollContent: {
        paddingBottom: spacing[4],
        gap: spacing[4],
    },
    card: {
        padding: spacing[4],
        backgroundColor: colors.bgCard,
        borderRadius: spacing[4],
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardHeaderText: {
        color: colors.textPrimary,
        fontSize: 22,
        fontFamily: "Nunito_900",
        textOverflow: "ellipsis",
        flexShrink: 1
    },
    editButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: colors.primaryLight,
        paddingHorizontal: spacing[4],
        paddingVertical: 8,
        borderRadius: 12
    },
    editButtonText: {
        fontSize: 13,
        fontFamily: "Nunito_800",
        color: colors.primary
    },
    cardMeta: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: 4,
        marginTop: 4,
        marginBottom: 8,
    },
    cardMetaText: {
        fontSize: typography.sizes.md,
        fontFamily: `${typography.fonts.body}_600`,
        color: colors.textMuted,
    },
    cardMetaType: {
        paddingHorizontal: spacing[2],
        paddingVertical: 2,
        borderRadius: spacing[4],
        backgroundColor: colors.primaryLight,
    },
    cardMetaTypeText: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_600`,
        color: colors.primary,
    },
    cardLabel: {
        flexDirection: "row",
        gap: 6,
        alignItems: "center",
        marginTop: 16,
        marginBottom: 8,
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
        padding: spacing[4],
        borderRadius: spacing[4],
        marginVertical: spacing[2],

        elevation: 4,
        shadowColor: 'rgba(196,98,45)',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.28,
        shadowRadius: 24,
    },
    cardAmountLabel: {
        fontSize: 11,
        fontFamily: `${typography.fonts.heading}_800`,
        textTransform: "uppercase",
        letterSpacing: 0.8,
        color: 'rgba(255,255,255,0.7)',
    },
    cardAmountTitle: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 2
    },
    cardAmountTitleText: {
        fontSize: 32,
        fontFamily: `${typography.fonts.heading}_900`,
        color: 'white'
    },
    cardAmountSubtitle: {
        fontSize: 16,
        fontFamily: `${typography.fonts.heading}_600`,
        color: 'rgba(255,255,255,0.6)',
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-end",
    },
    priorityToggleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing[3]
    },
})

export default ExpensesDetailScreen;