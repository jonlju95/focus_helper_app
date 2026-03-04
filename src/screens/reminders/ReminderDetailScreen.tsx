import {router, useLocalSearchParams} from "expo-router";
import {Dimensions, LayoutAnimation, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import TopBar from "@/components/ui/TopBar";
import colors from "@/constants/colors";
import {ClockIcon, PenIcon, TrashIcon} from "phosphor-react-native";
import ReminderTable from "@/screens/reminders/components/ReminderTable";
import {useEffect, useState} from "react";
import ProgressBar from "@/components/ui/ProgressBar";
import ToggleButton from "@/components/ui/sharedInputs/ToggleButton";
import SharedButton from "@/components/ui/SharedButton";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import {sharedStyles} from "@/constants/sharedStyles";
import SharedBadge from "@/components/ui/SharedBadge";
import {useRemindersDB} from "@/screens/reminders/hooks/useRemindersDB";
import {Reminder} from "@/types/reminder";

const FIELD_WIDTH = (Dimensions.get('window').width - 78) / 2;

function ReminderDetailScreen() {
    const {id} = useLocalSearchParams<{ id: string }>();
    const {getReminder, deleteReminder, toggleTask, togglePriority} = useRemindersDB();
    const [reminder, setReminder] = useState<Reminder>();

    const progress = reminder && reminder.tasks.length > 0
        ? reminder.tasks.filter(t => t.completed).length / reminder.tasks.length
        : 0;

    useEffect(() => {
        if (!id) {
            return;
        }
        getReminder(id).then(reminder => {
            if (!reminder) {
                return;
            }
            setReminder(reminder)
        })
    }, []);

    if (!reminder) return <View><Text>Reminder not found</Text></View>;

    const onTaskToggle = async (taskId: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const result = await toggleTask(reminder.id, taskId);
        if (!result) {
            return;
        }

        setReminder(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                tasks: prev.tasks.map(t =>
                    t.id === result.taskId
                        ? {...t, completed: result.completed}
                        : t
                ),
            };
        });
    };

    const onPriorityToggle = async (priority: boolean) => {
        const result = await togglePriority(reminder.id, priority);
        if (!result) {
            return;
        }

        setReminder(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                prioritized: result.prioritized,
            };
        });
    }

    const onDelete = async () => {
        if (reminder?.id) {
            await deleteReminder(reminder.id);
            router.dismissAll();
            router.replace('/reminders');
        }
    }

    return (
        <View style={sharedStyles.container}>
            <TopBar title={reminder.title} showBack={true} onBack={() => router.back()}/>

            <ScrollView style={sharedStyles.scroll}
                        contentContainerStyle={sharedStyles.scrollContent}
                        showsVerticalScrollIndicator={false}>
                <View style={sharedStyles.card}>
                    <View style={[sharedStyles.row, {justifyContent: 'space-between'}]}>
                        <Text style={typography.styles.detailTitle}>{reminder.title}</Text>
                        <Pressable style={[sharedStyles.row, styles.editButton]} onPress={() => {
                            router.push({
                                pathname: `/reminders/new`,
                                params: {id: reminder.id}
                            })
                        }}>
                            <PenIcon size={14} color={colors.primary} weight={'bold'}/>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </Pressable>
                    </View>
                    {reminder.time && (
                        <View style={[sharedStyles.row, styles.cardMeta]}>
                            <ClockIcon size={12} color={colors.textMuted} weight={'fill'}/>
                            <Text style={typography.styles.metaText}>{reminder.time}</Text>
                        </View>
                    )}
                    {reminder.prioritized && (
                        <SharedBadge title={'Prioritized'} prioritized={true}/>
                    )}
                </View>
                <View style={[sharedStyles.card, sharedStyles.row, {gap: spacing[3]}]}>
                    <View style={styles.progressCardBar}>
                        <Text style={[typography.styles.metaText, {fontSize: 12, marginBottom: 2}]}>Task progress</Text>
                        <ProgressBar progress={progress} color={colors.primary}/>
                    </View>
                    <View style={styles.progressCardAmount}>
                        <Text
                            style={[typography.styles.amount, {color: colors.primary}]}>{reminder.tasks.filter(t => t.completed).length}</Text>
                        <Text style={styles.incompleteTasksText}>/{reminder.tasks.length}</Text>
                    </View>
                </View>
                <View>
                    <ReminderTable tasks={reminder.tasks} onToggle={(id) => onTaskToggle(id)}/>
                </View>
                <View style={[sharedStyles.row, {justifyContent: 'space-between'}]}>
                    <View style={[sharedStyles.row, {gap: spacing[3], width: FIELD_WIDTH}]}>
                        <Text style={[typography.styles.cardTitle]}>Prioritized</Text>
                        <ToggleButton showLabel={false} value={reminder.prioritized ?? false}
                                      onChange={onPriorityToggle}/>
                    </View>
                    <View style={{justifyContent: 'flex-end'}}>
                        <SharedButton icon={<TrashIcon size={16} color={'#FFF'} weight={'bold'}/>}
                                      label={'Delete'} onPress={onDelete}/>
                    </View>
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

    progressCardBar: {
        flex: 1
    },

    progressCardAmount: {
        flexDirection: "row",
        alignItems: "baseline",
    },

    incompleteTasksText: {
        color: colors.textMuted,
        fontSize: 14,
        fontFamily: "Nunito_900",
    },
});

export default ReminderDetailScreen;