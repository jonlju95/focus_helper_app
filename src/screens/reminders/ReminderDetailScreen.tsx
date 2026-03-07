import {Dimensions, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {router} from "expo-router";
import {ClockIcon, PenIcon, TrashIcon} from "phosphor-react-native";

import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import {sharedStyles} from "@/constants/sharedStyles";
import TopBar from "@/components/ui/TopBar";
import ProgressBar from "@/components/ui/ProgressBar";
import ToggleButton from "@/components/ui/sharedInputs/ToggleButton";
import SharedButton from "@/components/ui/SharedButton";
import SharedBadge from "@/components/ui/SharedBadge";
import ConfirmDialog from "@/components/ui/modals/ConfirmDialog";
import ReminderTable from "@/screens/reminders/components/ReminderTable";
import {useReminderDetail} from "@/screens/reminders/hooks/useReminderDetail";

const FIELD_WIDTH = (Dimensions.get('window').width - 78) / 2;

function ReminderDetailScreen() {
    const {
        reminder,
        deleteVisible,
        setDeleteVisible,
        deleteContext,
        progress,
        onTaskToggle,
        onPriorityToggle,
        onDelete,
        handleDeletePress,
    } = useReminderDetail();

    if (!reminder) return <View><Text>Reminder not found</Text></View>;

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
                                      label={'Delete'} onPress={handleDeletePress}/>
                    </View>
                </View>
            </ScrollView>
            <ConfirmDialog
                visible={deleteVisible}
                title={deleteContext === 'complete'
                    ? 'All tasks complete!'
                    : 'Delete reminder'
                }
                message={deleteContext === 'complete'
                    ? 'Do you want to delete this reminder?'
                    : 'This cannot be undone.'
                }
                confirmLabel="Delete"
                onCancel={() => setDeleteVisible(false)}
                onConfirm={onDelete}
            />
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