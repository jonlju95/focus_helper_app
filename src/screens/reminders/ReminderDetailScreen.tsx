import {router, useLocalSearchParams} from "expo-router";
import {LayoutAnimation, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import TopBar from "@/components/ui/TopBar";
import colors from "@/constants/colors";
import {MOCK_REMINDERS} from "@/screens/reminders/data/reminders";
import {ClockIcon, PenIcon, StarIcon} from "phosphor-react-native";
import ReminderTable from "@/screens/reminders/components/ReminderTable";
import {useState} from "react";
import ProgressBar from "@/components/ui/ProgressBar";
import ToggleButton from "@/components/ui/ToggleButton";
import SharedButton from "@/components/ui/SharedButton";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";

function ReminderDetailScreen() {
    const {id} = useLocalSearchParams<{ id: string }>();

    const foundReminder = MOCK_REMINDERS.find(r => r.id === id);
    const [reminder, setReminder] = useState(foundReminder);

    const progress = reminder && reminder.tasks.length > 0
        ? reminder.tasks.filter(t => t.completed).length / reminder.tasks.length
        : 0;

    if (!reminder) return <View><Text>Reminder not found</Text></View>;

    const toggleTask = (taskId: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setReminder(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                tasks: prev.tasks.map(task =>
                    task.id === taskId
                        ? {...task, completed: !task.completed}
                        : task
                ),
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

    return (
        <View style={styles.container}>
            <TopBar title={reminder.title} showBack={true} onBack={() => router.back()} onMenu={() => {
            }}/>

            <ScrollView contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderText}>{reminder.title}</Text>
                        <Pressable style={styles.editButton} onPress={() => {
                            router.push({
                                pathname: `/reminders/new`,
                                params: {id: reminder.id}
                            })
                        }}>
                            <PenIcon size={14} color={colors.primary} weight={'bold'}/>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </Pressable>
                    </View>
                    <View style={styles.cardMeta}>
                        <ClockIcon size={12} color={colors.textMuted} weight={'fill'}/>
                        <Text style={styles.cardMetaText}>{reminder.time}</Text>
                    </View>
                    {reminder.prioritized && (
                        <View style={styles.tag}>
                            <StarIcon size={11} color={colors.primary} weight={'fill'}/>
                            <Text style={styles.prioritizedTagText}>Prioritized</Text>
                        </View>
                    )}
                </View>
                <View style={styles.progressCard}>
                    <View style={styles.progressCardBar}>
                        <Text style={styles.progressCardText}>Task progress</Text>
                        <View style={styles.progressTrack}>
                            <ProgressBar
                                progress={progress}
                                showLabel
                                completed={reminder.tasks.filter(t => t.completed).length}
                                total={reminder.tasks.length}
                            />
                        </View>
                    </View>
                    <View style={styles.tasksTextContainer}>
                        <Text
                            style={[typography.styles.amount, {color: colors.primary}]}>{reminder.tasks.filter(t => t.completed).length}</Text>
                        <Text style={styles.incompleteTasksText}>/{reminder.tasks.length}</Text>
                    </View>
                </View>
                <View>
                    <ReminderTable tasks={reminder.tasks} onToggle={(id) => toggleTask(id)}/>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.priorityContainer}>
                        <Text style={typography.styles.cardTitle}>Prioritized</Text>
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
        borderRadius: spacing[4]
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardHeaderText: {
        color: colors.textPrimary,
        fontSize: 22,
        fontFamily: "Nunito_900"
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
    tag: {
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
    },
    progressCard: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: spacing[4],
        paddingVertical: 12,
        borderRadius: spacing[4],
        backgroundColor: colors.bgCard,
        gap: 12
    },
    progressCardBar: {
        flex: 1
    },
    progressCardText: {
        color: colors.textMuted,
        fontSize: 12,
        fontFamily: "Nunito_700",
    },
    progressTrack: {
        height: 6,
        backgroundColor: '#f0ebe4',
        borderRadius: spacing[4],
        overflow: 'hidden',
        marginTop: spacing[1],
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: spacing[1],
    },
    tasksTextContainer: {
        flexDirection: "row",
        alignItems: "baseline",
    },
    incompleteTasksText: {
        color: colors.textMuted,
        fontSize: 14,
        fontFamily: "Nunito_900",
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    priorityContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing[3]
    },
    priorityContainerText: {
        fontSize: 14,
        fontFamily: "Nunito_800",
        color: colors.textPrimary,
    }
});

export default ReminderDetailScreen;