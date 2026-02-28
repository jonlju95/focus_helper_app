import {Task} from '@/types/reminder';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CheckSquareIcon, ListChecksIcon, SquareIcon} from 'phosphor-react-native';
import colors from '@/constants/colors';

interface ReminderTableProps {
    tasks?: Task[];
    onToggle?: (id: string) => void;
}

function ReminderTable({tasks, onToggle}: ReminderTableProps) {
    if (!tasks || tasks.length === 0) return null;

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.tableHeader}>
                <View style={styles.tableHeaderLeft}>
                    <ListChecksIcon size={14} color="#fff" weight="bold"/>
                    <Text style={styles.tableHeaderText}>Task / Description</Text>
                </View>
                <Text style={styles.tableHeaderText}>Done</Text>
            </View>

            {/* Rows */}
            {tasks.map((task, index) => (
                <View
                    key={task.id}
                    style={[
                        styles.tableRow,
                        index === tasks.length - 1 && styles.tableRowLast,
                        task.completed && styles.tableRowCompleted,
                    ]}
                >
                    <Text style={[
                        styles.taskLabel,
                        task.completed && styles.taskLabelCompleted,
                    ]}>
                        {task.label}
                    </Text>

                    <Pressable
                        onPress={() => onToggle?.(task.id)}
                        hitSlop={8}
                    >
                        {task.completed
                            ? <CheckSquareIcon size={20} color={colors.primary} weight="fill"/>
                            : <SquareIcon size={20} color={colors.textMuted} weight="regular"/>
                        }
                    </Pressable>
                </View>
            ))}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        borderRadius: 16,
        overflow: 'hidden',
    },

    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.textPrimary,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
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
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f0ea',
    },

    tableRowLast: {
        borderBottomWidth: 0,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
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
});

export default ReminderTable;