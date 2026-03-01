import {Task} from '@/types/reminder';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CheckSquareIcon, ListChecksIcon, PlusIcon, SquareIcon, TrashIcon} from 'phosphor-react-native';
import colors from '@/constants/colors';
import SharedInput from "@/components/ui/SharedInput";
import {useState} from "react";
import spacing from "@/constants/spacing";

interface ReminderTableProps {
    tasks?: Task[];
    onToggle?: (id: string) => void;
    onAddTask?: (label: string) => void;
    onDeleteTask?: (id: string) => void;
    isEditing?: boolean;
}

function ReminderTable({tasks, onToggle, isEditing = false, onAddTask, onDeleteTask}: ReminderTableProps) {
    const [newTaskLabel, setNewTaskLabel] = useState('');

    const handleAdd = () => {
        if (!newTaskLabel.trim()) return;  // don't add empty tasks
        onAddTask?.(newTaskLabel.trim());
        setNewTaskLabel('');               // clear input after adding
    };

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.tableHeader}>
                <View style={styles.tableHeaderLeft}>
                    <ListChecksIcon size={14} color="#FFF" weight="bold"/>
                    <Text style={styles.tableHeaderText}>Task / Description</Text>
                </View>
                {!isEditing && (
                    <Text style={styles.tableHeaderText}>Done</Text>
                )}
            </View>

            {/* Rows */}
            {tasks?.map((task, index) => (
                <View
                    key={task.id}
                    style={[
                        styles.tableRow,
                        !isEditing && index === tasks.length - 1 && styles.tableRowLast,
                        task.completed && styles.tableRowCompleted,
                    ]}>
                    <Text style={[
                        styles.taskLabel,
                        task.completed && styles.taskLabelCompleted]}>
                        {task.label}
                    </Text>

                    <Pressable
                        onPress={() => isEditing ? onDeleteTask?.(task.id) : onToggle?.(task.id)}
                        hitSlop={8}
                    >
                        {isEditing
                            ? <TrashIcon size={20} color={colors.urgent} weight="bold"/>
                            : task.completed
                                ? <CheckSquareIcon size={20} color={colors.primary} weight="fill" />
                                : <SquareIcon size={20} color={colors.textMuted} weight="regular"/>}
                    </Pressable>
                </View>
            ))}

            {isEditing && (
                <View style={[styles.tableRow, styles.tableRowLast, {paddingHorizontal: 12}]}>
                    <View style={{flex: 1, marginRight: 8}}>
                        <SharedInput
                            value={newTaskLabel}
                            onChangeText={setNewTaskLabel}
                            showLabel={false} placeholder="Add a task"/>
                    </View>
                    <Pressable
                        style={styles.addButton}
                        onPress={handleAdd}>
                        <PlusIcon size={18} color="white" weight="bold"/>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: spacing[4],
        overflow: 'hidden',
    },

    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.textPrimary,
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[3],
        borderTopLeftRadius: spacing[4],
        borderTopRightRadius: spacing[4],
    },
    tableHeaderLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    tableHeaderText: {
        fontSize: 13,
        fontFamily: 'Nunito_700',
        color: '#ffffff',
    },

    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[3],
        borderBottomWidth: 1,
        borderBottomColor: '#f5f0ea',
    },

    tableRowLast: {
        borderBottomWidth: 0,
        borderBottomLeftRadius: spacing[4],
        borderBottomRightRadius: spacing[4],
    },

    tableRowCompleted: {
        backgroundColor: '#fafaf8',
    },

    taskLabel: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'Nunito_600',
        color: colors.textPrimary,
    },

    // Strikethrough for completed tasks
    taskLabelCompleted: {
        textDecorationLine: 'line-through',
        color: colors.textMuted,
    },
    addButton: {
        backgroundColor: colors.primary,
        padding: spacing[3],
        borderRadius: spacing[2],
        alignSelf: 'center',
    },
});

export default ReminderTable;