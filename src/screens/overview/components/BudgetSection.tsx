import {StyleSheet, Text, View} from 'react-native';
import {ListChecksIcon, ShoppingCartIcon} from 'phosphor-react-native';
import colors from '@/constants/colors';
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import StatCard from "@/components/ui/StatCard";

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
});

export default BudgetSection;