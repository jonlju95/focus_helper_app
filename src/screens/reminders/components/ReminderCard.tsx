import {Pressable, StyleSheet, Text, View} from "react-native";
import {ArrowRightIcon, BellIcon, ClockIcon, DotOutlineIcon, StarIcon} from "phosphor-react-native";

import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import {sharedStyles} from "@/constants/sharedStyles";
import {Task} from "@/screens/reminders/types/reminder";
import ProgressBar from "@/components/ui/ProgressBar";

interface CardProps {
    iconColor: string,
    iconBg: string,
    title: string,
    date: string,
    time: string,
    priority?: boolean,
    tasks: Task[],
    onPress?: () => void,
    complete: boolean
}

function ReminderCard({iconColor, iconBg, title, date, time, priority, tasks, onPress, complete}: CardProps) {
    return (
        <Pressable style={({pressed}) => [
            sharedStyles.card,
            sharedStyles.row,
            priority && styles.priorityCard,
            pressed && styles.pressed,
            {gap: spacing[3]}
        ]} onPress={onPress}>
            <View style={[styles.cardIcon, {backgroundColor: iconBg}]}>
                <BellIcon color={iconColor} size={18} weight={'fill'}/>
            </View>
            <View style={styles.cardLabel}>
                <Text
                    style={[typography.styles.cardTitle, {marginBottom: 2}, complete && styles.complete]}>{title}</Text>
                <View style={[sharedStyles.row, styles.cardLabelTime]}>
                    <ClockIcon color={colors.textMuted} size={11} weight={'fill'}/>
                    <Text style={[typography.styles.metaText, complete && styles.complete]}>{date}</Text>
                    <Text style={[typography.styles.metaText, complete && styles.complete]}>{time}</Text>
                    {priority && (
                        <>
                            <DotOutlineIcon size={11} color={colors.primary} weight={'fill'}/>
                            <StarIcon color={colors.primary} size={11} weight={'fill'}/>
                            <Text style={[typography.styles.metaText, {color: colors.primary}]}>Priority</Text>
                        </>
                    )}
                </View>

                <View>
                    <ProgressBar progress={tasks.filter(t => t.completed).length / tasks.length} height={4}/>
                    <Text style={[typography.styles.metaText, styles.cardTasks, complete && styles.complete]}>
                        {tasks.filter(t => t.completed).length}/{tasks.length} tasks done</Text>
                </View>
            </View>
            <ArrowRightIcon size={14} color={colors.textMuted} weight={'bold'}/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.85,
    },

    priorityCard: {
        backgroundColor: '#FFFBF7',
        borderWidth: 1.5,
        borderStyle: 'solid',
        borderColor: colors.borderWarm,
    },

    cardIcon: {
        padding: spacing[3],
        borderRadius: spacing[3],
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardLabel: {
        flex: 1
    },

    cardLabelTime: {
        gap: spacing[1],
        marginBottom: spacing[2]
    },

    cardTasks: {
        fontSize: 11,
        marginTop: spacing[1],
    },

    complete: {
        textDecorationLine: 'line-through',
    }
})

export default ReminderCard;