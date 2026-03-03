import {Pressable, StyleSheet, Text, View} from "react-native";
import {CATEGORY_COLORS} from "@/types/categoryColors";
import {ExpenseTypes} from "@/types/expenseTypes";
import {ClockIcon, ShoppingCartIcon} from "phosphor-react-native";
import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import {sharedStyles} from "@/constants/sharedStyles";
import SharedBadge from "@/components/ui/SharedBadge";

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
            sharedStyles.card,
            sharedStyles.row,
            pressed && styles.pressed,
            {gap: spacing[3]}
        ]} onPress={onPress}>

            <View style={[styles.cardIcon, {backgroundColor: typeColor.bg}]}>
                <ShoppingCartIcon size={20} color={typeColor.icon} weight={'fill'}/>
            </View>
            <View style={styles.cardBody}>
                <Text style={typography.styles.cardTitle}>{title}</Text>
                <View style={[sharedStyles.row, {gap: spacing[1]}]}>
                    <ClockIcon size={11} color={colors.textMuted} weight={'fill'}/>
                    <Text style={typography.styles.metaText}>{date}</Text>
                    <SharedBadge title={type} color={typeColor.text} bgColor={typeColor.bg}/>
                </View>
            </View>
            <Text style={styles.cardAmount}>{amount} kr</Text>
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
        backgroundColor: colors.primaryLight,
    },

    cardBody: {
        flex: 1,
        gap: spacing[1],
    },

    cardAmount: {
        fontSize: 16,
        fontFamily: `Nunito_900`,
        color: colors.primary,
    }
})

export default ExpenseCard;