import {StyleSheet, Text, View} from 'react-native';
import {ListChecksIcon, ShoppingCartIcon} from 'phosphor-react-native';
import colors from '@/constants/colors';
import {ReactNode} from "react";
import ProgressBar from "@/components/ui/ProgressBar";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";

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
    const amountColor = isDark ? colors.borderWarm : colors.textPrimary;
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

function BudgetSection() {
    return (
        <View style={styles.container}>

            {/* Label */}
            <View style={styles.sectionLabel}>
                <ShoppingCartIcon size={13} color={colors.textMuted} weight="fill"/>
                <Text style={typography.styles.sectionLabel}>This month</Text>
            </View>

            <View style={styles.sectionBody}>
                <StatCard
                    variant="dark"
                    icon={<ShoppingCartIcon size={13} color="rgba(255,255,255,0.5)" weight="fill"/>}
                    label="Spent this month"
                    amount="8 830"
                    currency="kr"
                />
                <StatCard
                    variant="light"
                    icon={<ListChecksIcon size={13} color={colors.textMuted} weight="bold"/>}
                    label="Budget remaining"
                    amount="5 436"
                    currency="kr"
                    progress={0.62}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacing[3],
    },

    sectionLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[1],
    },

    sectionBody: {
        flexDirection: 'row',
        gap: spacing[3],
    },

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

export default BudgetSection;