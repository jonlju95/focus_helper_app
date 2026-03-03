import {Pressable, StyleSheet, Text, View} from "react-native";
import {ActivityTypes} from "@/types/activityTypes";
import {ArrowRightIcon, CalendarBlankIcon, ClockIcon, StarIcon} from "phosphor-react-native";
import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import {ACTIVITY_COLORS} from "@/types/categoryColors";
import {sharedStyles} from "@/constants/sharedStyles";
import SharedBadge from "@/components/ui/SharedBadge";

interface ActivityCardProps {
    title: string;
    time: string;
    priority?: boolean;
    type: ActivityTypes;
    onPress?: () => void;
}

function ActivityCard({title, time, priority = false, type = 'appointment', onPress}: ActivityCardProps) {
    const typeColor = ACTIVITY_COLORS[type];

    return (
        <Pressable style={({pressed}) => [
            sharedStyles.card,
            sharedStyles.row,
            pressed && styles.pressed,
            priority && styles.priority,
            {gap: spacing[3]}
        ]}
                   onPress={onPress}>
            <View style={[styles.cardIcon, {backgroundColor: typeColor.bg}]}>
                <CalendarBlankIcon size={20} color={typeColor.icon} weight={'fill'}/>
            </View>
            <View style={styles.cardBody}>
                <Text style={typography.styles.cardTitle}>{title}</Text>
                <View style={[sharedStyles.row, {gap: spacing[1]}]}>
                    <ClockIcon size={11} color={colors.textMuted} weight={'fill'}/>
                    <Text style={typography.styles.metaText}>{time}</Text>
                    <SharedBadge title={type} color={typeColor.text} bgColor={typeColor.bg}/>
                    {priority && (
                        <StarIcon size={12} color={colors.primary} weight={'fill'}/>
                    )}
                </View>
            </View>
            <ArrowRightIcon size={16} color={'#C8C0B4'} weight={'bold'}/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.85,
    },

    priority: {
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

    cardBody: {
        flex: 1,
        gap: spacing[1],
    },
})

export default ActivityCard;
