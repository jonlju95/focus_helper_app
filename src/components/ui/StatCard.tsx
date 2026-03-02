import colors from "@/constants/colors";
import {StyleSheet, Text, View} from "react-native";
import typography from "@/constants/typography";
import ProgressBar from "@/components/ui/ProgressBar";
import spacing from "@/constants/spacing";
import {ReactNode} from "react";

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
        <View style={[styles.card, {backgroundColor: bgColor}]}>

            {/* Badge */}
            <View style={styles.cardBadge}>
                {icon}
                <Text style={[typography.styles.badgeText, {color: textColor}]}>{label}</Text>
            </View>

            {/* Amount */}
            <View style={styles.amountRow}>
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
   card: {
        flex: 1,
        padding: spacing[4],
        borderRadius: spacing[4],
        gap: spacing[2],
    },

    cardBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[1],
    },

    amountRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: spacing[1],
    },

    progressTrack: {
        height: spacing[1],
        backgroundColor: '#f0ebe4',
        borderRadius: spacing[1],
        overflow: 'hidden',
        marginTop: spacing[1],
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: spacing[1],
    },
});

export default StatCard;