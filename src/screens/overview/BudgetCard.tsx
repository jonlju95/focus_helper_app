import {StyleSheet, Text, View} from 'react-native';
import {ListChecksIcon, ShoppingCartIcon} from 'phosphor-react-native';
import colors from '@/constants/colors';
import {ReactNode} from "react";
import ProgressBar from "@/components/ui/ProgressBar";

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
                <Text style={[styles.badgeText, {color: textColor}]}>{label}</Text>
            </View>

            {/* Amount */}
            <View style={styles.amountRow}>
                <Text style={[styles.amount, {color: amountColor}]}>{amount}</Text>
                <Text style={[styles.currency, {color: textColor}]}>{currency}</Text>
            </View>

            {/* Progress bar — only renders if progress prop is passed */}
            {progress !== undefined && (
                <ProgressBar progress={progress} color={colors.primary} />
            )}

        </View>
    );
}

function BudgetCard() {
    return (
        <View style={styles.container}>

            {/* Section label */}
            <View style={styles.sectionLabel}>
                <ShoppingCartIcon size={13} color={colors.textMuted} weight="fill"/>
                <Text style={styles.sectionLabelText}>This month</Text>
            </View>

            <View style={styles.cardWrapper}>
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
        marginHorizontal: 16,
        gap: 12,
    },

    sectionLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    sectionLabelText: {
        fontSize: 11,
        fontFamily: 'Nunito_800',
        color: colors.textMuted,
        letterSpacing: 1.2,
        textTransform: 'uppercase',
    },

    cardWrapper: {
        flexDirection: 'row',
        gap: 12,
    },

    card: {
        flex: 1,
        padding: 16,
        borderRadius: 16,
        gap: 6,
    },

    cardBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    badgeText: {
        fontSize: 11,
        fontFamily: 'Nunito_700',
    },

    amountRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 2,
    },
    amount: {
        fontSize: 22,
        fontFamily: 'Nunito_900',
    },
    currency: {
        fontSize: 13,
        fontFamily: 'Nunito_600',
    },

    progressTrack: {
        height: 4,
        backgroundColor: '#f0ebe4',
        borderRadius: 4,
        overflow: 'hidden',
        marginTop: 4,
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 4,
    },
});

export default BudgetCard;