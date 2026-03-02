import colors from "@/constants/colors";
import {StyleSheet, Text, View} from "react-native";
import typography from "@/constants/typography";
import ProgressBar from "@/components/ui/ProgressBar";
import spacing from "@/constants/spacing";
import {ReactNode} from "react";
import {sharedStyles} from "@/constants/sharedStyles";

type Variant = 'dark' | 'light';

interface CardData {
    icon: ReactNode;
    label: string;
    amount: string;
    currency: string;
    progress?: number;
}


function StatCard({icon, label, amount, currency, progress, variant}: CardData & { variant: Variant }) {
    const isDark = variant === 'dark';

    const textColor = isDark ? 'rgba(255,255,255,0.5)' : colors.textMuted;
    const amountColor = isDark ? colors.borderWarm : colors.primary;
    const bgColor = isDark ? colors.textPrimary : colors.bgCard;

    return (
        <View style={[sharedStyles.card, {flex: 1, backgroundColor: bgColor}]}>

            {/* Badge */}
            <View style={[styles.cardHeader, sharedStyles.row]}>
                {icon}
                <Text style={[typography.styles.badgeText, {color: textColor}]}>{label}</Text>
            </View>

            {/* Amount */}
            <View style={styles.cardBody}>
                <Text style={[typography.styles.amount, {color: amountColor}]}>{amount}</Text>
                <Text style={[typography.styles.metaText, {color: textColor}]}>{currency}</Text>
            </View>

            {/* Progress bar - only renders if progress prop is passed */}
            {progress !== undefined && (
                <ProgressBar progress={progress} color={colors.primary}/>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    cardHeader: {
        gap: spacing[1],
    },

    cardBody: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: spacing[1],
        marginBottom: spacing[2],
    },
});

export default StatCard;