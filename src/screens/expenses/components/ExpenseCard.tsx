import {Pressable, StyleSheet, Text, View} from "react-native";
import {CATEGORY_COLORS} from "@/types/categoryColors";
import {ExpenseTypes} from "@/types/expenseTypes";
import {ClockIcon, ShoppingCartIcon} from "phosphor-react-native";
import colors from "@/constants/colors";
import {capitalise} from "@/utils/formatLabel";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";

interface ExpenseCardProps {
    title: string;
    date: string;
    amount: string;
    type: ExpenseTypes;
    onPress?: () => void;
}

function ExpenseCard({title, date, amount, type = 'groceries', onPress}: ExpenseCardProps) {
    const typeColor = CATEGORY_COLORS[type];

    return (
        <Pressable style={({pressed}) => [
            styles.card,
            pressed && styles.pressed
        ]} onPress={onPress}>

            <View style={[styles.cardIcon, {backgroundColor: typeColor.bg}]}>
                <ShoppingCartIcon size={20} color={typeColor.icon} weight={'fill'}/>
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{title}</Text>
                <View style={styles.cardMeta}>
                    <ClockIcon size={11} color={colors.textMuted} weight={'fill'}/>
                    <Text style={styles.cardMetaText}>{date}</Text>

                    <View style={[styles.cardMetaType, {backgroundColor: typeColor.bg}]}>
                        <Text style={[styles.cardMetaTypeText, {color: typeColor.text}]}>
                            {capitalise(type)}
                        </Text>
                    </View>
                </View>
            </View>
            <Text style={styles.cardAmount}>{amount} kr</Text>
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
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.05,
        shadowRadius: 10,
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
    },
    cardAmount: {
        fontSize: 16,
        fontFamily: `${typography.fonts.heading}_900`,
        color: colors.primary,
    }
})

export default ExpenseCard;