import {Pressable, StyleSheet, Text, View} from "react-native";
import {Categories} from "@/types/categories";
import {ArrowRightIcon, CalendarBlankIcon, ClockIcon, StarIcon} from "phosphor-react-native";
import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import {ACTIVITY_COLORS} from "@/types/categoryColors";
import {capitalise} from "@/utils/formatLabel";

interface ActivityCardProps {
    title: string;
    time: string;
    priority?: boolean;
    type: Categories;
    onPress?: () => void;
}

function ActivityCard({ title, time, priority = false, type = 'appointment', onPress }: ActivityCardProps) {
    const typeColor = ACTIVITY_COLORS[type];

    return (
        <Pressable style={({pressed}) => [
            styles.card,
            pressed && styles.pressed,
            priority && styles.priority
        ]}
        onPress={onPress}>
            <View style={[styles.cardIcon, { backgroundColor: typeColor.bg }]}>
                <CalendarBlankIcon size={20} color={typeColor.icon} weight={'fill'}/>
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{title}</Text>
                <View style={styles.cardMeta}>
                    <ClockIcon size={11} color={colors.textMuted} weight={'fill'}/>
                    <Text style={styles.cardMetaText}>{time}</Text>

                    <View style={[styles.cardMetaType, { backgroundColor: typeColor.bg }]}>
                        <Text style={[styles.cardMetaTypeText, { color: typeColor.text }]}>
                            {capitalise(type)}
                        </Text>
                    </View>

                    {priority && (
                        <StarIcon size={12} color={colors.primary} weight={'fill'}/>
                    )}
                </View>
            </View>
            <ArrowRightIcon size={16} color={'#C8C0B4'} weight={'bold'} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing[3],
        backgroundColor: colors.bgCard,
        padding: spacing[4],
        borderRadius: spacing[4],
        borderColor: 'transparent',
        borderWidth: 1.5,
        elevation: 1,
        shadowColor:   '#000',
        shadowOffset:  { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius:  10,
    },
    pressed: {
        opacity: 0.85,
    },
    priority: {
        backgroundColor: '#FFFBF7',
        borderColor: colors.borderWarm,
        borderWidth: 1.5
    },
    cardIcon: {
        padding: spacing[3],
        borderRadius: spacing[3],
        backgroundColor: colors.primaryLight,
    },
    cardContent: {
        flex: 1,
        gap: spacing[1],
    },
    cardTitle: {
        fontSize: 15,
        fontFamily: `${typography.fonts.heading}_800`,
        color: colors.textPrimary
    },
    cardMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[1],
    },
    cardMetaText: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_600`,
        color: colors.textMuted,
    },
    cardMetaType: {
        paddingHorizontal: spacing[2],
        paddingVertical: 2,
        borderRadius: spacing[4],
        backgroundColor: colors.primaryLight,
    },
    cardMetaTypeText: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_600`,
        color: colors.primary,
    }
})

export default ActivityCard;
