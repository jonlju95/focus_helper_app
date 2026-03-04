import {Task} from '@/types/reminder';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CheckSquareIcon, ListChecksIcon, PlusIcon, SquareIcon, TrashIcon} from 'phosphor-react-native';
import colors from '@/constants/colors';
import SharedInput from "@/components/ui/sharedInputs/SharedInput";
import {useState} from "react";
import spacing from "@/constants/spacing";
import {sharedStyles} from "@/constants/sharedStyles";
import typography from "@/constants/typography";
import {useFieldArray} from "react-hook-form";
import control from "phosphor-react-native/src/defs/Control";

interface ReminderTableProps {
    tasks?: Task[];
    onToggle?: (id: string) => void;
    onAddTask?: (label: string) => void;
    onDeleteTask?: (index: number) => void;
    isEditing?: boolean;
}

function ReminderTable({tasks, onToggle, isEditing = false, onAddTask, onDeleteTask}: ReminderTableProps) {


    const [newTaskLabel, setNewTaskLabel] = useState('');

    const handleAdd = () => {
        if (!newTaskLabel.trim()) return;
        onAddTask?.(newTaskLabel.trim());
        setNewTaskLabel('');
    };

    return (
        <View style={[sharedStyles.card, styles.tableSection]}>

            {/* Header */}
            <View style={[sharedStyles.row, styles.tableHeader]}>
                <View style={[sharedStyles.row, styles.tableHeaderLeft]}>
                    <ListChecksIcon size={14} color="#FFF" weight="bold"/>
                    <Text style={typography.styles.tableHeader}>Task / Description</Text>
                </View>
                {!isEditing && (
                    <Text style={typography.styles.tableHeader}>Done</Text>
                )}
            </View>

            {/* Rows */}
            {tasks?.map((task, index) => (
                <View
                    key={task.id}
                    style={[
                        sharedStyles.row,
                        styles.tableRow,
                        !isEditing && index === tasks.length - 1 && styles.tableRowLast,
                        task.completed && styles.tableRowCompleted,
                    ]}>
                    <Text style={[
                        typography.styles.bodyText,
                        task.completed && styles.taskLabelCompleted]}>
                        {task.label}
                    </Text>

                    <Pressable
                        onPress={() => isEditing ? onDeleteTask?.(index) : onToggle?.(task.id)}
                        hitSlop={8}>
                        {isEditing
                            ? <TrashIcon size={20} color={colors.urgent} weight="bold"/>
                            : task.completed
                                ? <CheckSquareIcon size={20} color={colors.primary} weight="fill"/>
                                : <SquareIcon size={20} color={colors.textMuted} weight="regular"/>}
                    </Pressable>
                </View>
            ))}

            {isEditing && (
                <View style={[sharedStyles.row, styles.tableRow, styles.tableRowLast]}>
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
    tableSection: {
        padding: 0,
        overflow: 'hidden',
    },

    tableHeader: {
        justifyContent: 'space-between',
        backgroundColor: colors.textPrimary,
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[3],
    },

    tableHeaderLeft: {
        flex: 1,
        gap: spacing[2],
    },

    tableRow: {
        justifyContent: 'space-between',
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[3],
        borderBottomWidth: 1,
        borderBottomColor: '#f5f0ea',
    },

    tableRowLast: {
        borderBottomWidth: 0,
        borderBottomLeftRadius: spacing[4],
        borderBottomRightRadius: spacing[4],
        paddingHorizontal: spacing[3],
    },

    tableRowCompleted: {
        backgroundColor: '#fafaf8',
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