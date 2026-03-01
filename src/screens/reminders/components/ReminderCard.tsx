import {Pressable, StyleSheet, Text, View} from "react-native";
import {ArrowRightIcon, BellIcon, ClockIcon, DotOutlineIcon, StarIcon} from "phosphor-react-native";
import colors from "@/constants/colors";
import {Task} from "@/types/reminder";
import ProgressBar from "@/components/ui/ProgressBar";

interface CardProps {
    iconColor: string,
    iconBg: string,
    title: string,
    time: string,
    priority?: boolean,
    tasks: Task[],
    onPress?: () => void
}

function ReminderCard({iconColor, iconBg, title, time, priority, tasks, onPress}: CardProps) {
    return (
        <Pressable style={({pressed}) => [
            styles.container,
            priority && styles.priorityCard,
            pressed && styles.pressed,
        ]}
                   onPress={onPress}>
            <View style={[styles.iconContainer, {backgroundColor: iconBg}]}>
                <BellIcon color={iconColor} size={18} weight={'fill'}/>
            </View>
            <View style={styles.cardLabel}>
                <Text style={styles.cardTitle}>{title}</Text>
                <View style={styles.cardLabelTime}>
                    <ClockIcon color={colors.textMuted} size={11} weight={'fill'}/>
                    <Text style={styles.cardLabelText}>{time}</Text>
                    {priority && (
                        <>
                            <DotOutlineIcon size={11} color={colors.primary} weight={'fill'}/>
                            <StarIcon color={colors.primary} size={11} weight={'fill'}/>
                            <Text style={[styles.cardLabelText, styles.cardLabelPriority]}>Priority</Text>
                        </>
                    )}
                </View>

                <View>
                    <ProgressBar progress={tasks.filter(t => t.completed).length / tasks.length} height={4}/>
                    <Text style={styles.cardTasks}>{tasks.filter(t => t.completed).length}/{tasks.length} tasks
                        done</Text>
                </View>
            </View>
            <View>
                <ArrowRightIcon size={14} color={colors.textMuted} weight={'bold'}/>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        backgroundColor: colors.bgCard,
        borderRadius: 16,
        elevation: 1,
        shadowColor:   '#000',
        shadowOffset:  { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius:  10,
    },
    pressed: {
        opacity: 0.85,
    },
    priorityCard: {
        backgroundColor: '#FFFBF7',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: colors.borderWarm,
    },
    iconContainer: {
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardLabel: {
        flex: 1
    },
    cardTitle: {
        fontSize: 15,
        fontFamily: "Nunito_800",
        color: colors.textPrimary,
        marginBottom: 2
    },
    cardLabelTime: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 8
    },
    cardLabelText: {
        fontSize: 12,
        fontFamily: "Nunito_600",
        color: colors.textMuted
    },
    cardLabelPriority: {
        color: colors.primary,
    },
    progressTrack: {
        height: 4,
        backgroundColor: '#f0ebe4',
        borderRadius: 4,
        overflow: 'hidden',
        marginTop: 8,
        marginBottom: 4,
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 4,
    },
    cardTasks: {
        fontSize: 11,
        fontFamily: "Nunito_600",
        color: colors.textMuted,
        marginTop: 4
    }
})

export default ReminderCard;