import {router, useLocalSearchParams} from "expo-router";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import TopBar from "@/components/ui/TopBar";
import colors from "@/constants/colors";
import {MOCK_REMINDERS} from "@/data/reminders";
import {ClockIcon, PenIcon, StarIcon} from "phosphor-react-native";

function ReminderDetail() {
    const {id} = useLocalSearchParams<{ id: string }>();

    const reminder = MOCK_REMINDERS.find(r => r.id === id);
    if (!reminder) {
        return <View><Text>Reminder not found</Text></View>
    }

    return (
        <View style={styles.container}>
            <TopBar title={reminder.title} showBack={true} onBack={() => router.back()} onMenu={() => {}}/>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>

                <View style={styles.editWrapper}>
                    <View style={styles.editWrapperTitle}>
                        <Text style={styles.editWrapperTitleText}>{reminder.title}</Text>
                        <Pressable style={styles.editButton}>
                            <PenIcon size={14} color={colors.primary} weight={'bold'}/>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </Pressable>
                    </View>
                    <View style={styles.timeLabel}>
                        <ClockIcon size={12} color={colors.textMuted} weight={'fill'} />
                        <Text style={styles.timeLabelText}>{reminder.time}</Text>
                    </View>
                    {reminder.prioritized && (
                        <View style={styles.prioritizedTag}>
                            <StarIcon size={11} color={colors.primary} weight={'fill'} />
                            <Text style={styles.prioritizedTagText}>Prioritized</Text>
                        </View>
                    )}
                </View>
                <View></View>
                <View></View>
                <View></View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgApp,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 16,
        gap: 16,
    },
    editWrapper: {
        marginHorizontal: 16,
        padding: 16,
        backgroundColor: colors.bgCard,
        borderRadius: 16
    },
    editWrapperTitle: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    editWrapperTitleText: {
        color: colors.textPrimary,
        fontSize: 22,
        fontFamily: "Nunito_900"
    },
    editButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: colors.primaryLight,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12
    },
    editButtonText: {
        fontSize: 13,
        fontFamily: "Nunito_800",
        color: colors.primary
    },
    timeLabel: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: 4,
        marginTop: 4,
        marginBottom: 8,
    },
    timeLabelText: {
        fontSize: 13,
        fontFamily: "Nunito_600",
        color: colors.textMuted,
    },
    prioritizedTag: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        backgroundColor: colors.primaryLight,
    },
    prioritizedTagText: {
        fontSize: 11,
        fontFamily: "Nunito_800",
        color: colors.primary,
    }
});

export default ReminderDetail;