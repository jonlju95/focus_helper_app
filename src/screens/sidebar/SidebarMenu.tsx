import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {SidebarPanel} from '@/screens/sidebar/types/sidebar';
import spacing from "@/constants/spacing";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {getMonthName} from "@/utils/dateTimeUtils";
import ProgressBar from "@/components/ui/ProgressBar";
import SidebarLink from "@/screens/sidebar/components/SidebarLink";
import {useSetting} from "@/hooks/useSetting";
import {formatCurrency} from "@/utils/formatNumber";
import {sharedStyles} from "@/constants/sharedStyles";
import {useCategory} from "@/hooks/useCategory";
import {useEffect, useRef} from "react";

interface SidebarMenuProps {
    onNavigate: (screen: SidebarPanel) => void;  // ← SidebarPanel not Sidebar
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.85;

function SidebarMenu({onNavigate}: SidebarMenuProps) {
    const {value: username} = useSetting('USER_NAME');
    const {value: income} = useSetting('MONTHLY_INCOME');
    const {value: fixedExpenses} = useSetting('FIXED_EXPENSES');
    const {getCategoryTotal} = useCategory();

    const totalCategories = useRef(0);

    useEffect(() => {
        getCategoryTotal().then(count => {
            totalCategories.current = count;
        });
    }, [getCategoryTotal]);

    return (
        <View style={sharedStyles.section}>
            <View style={[sharedStyles.card, styles.monthlyBudgetCard]}>
                <Text style={styles.monthlyBudgetTitle}>{getMonthName(new Date())} budget</Text>
                <View>
                    <View style={styles.monthlyBudgetItem}>
                        <Text style={styles.monthlyBudgetItemText}>Income</Text>
                        <Text
                            style={[styles.monthlyBudgetItemAmount, {color: colors.success}]}>{formatCurrency(Number(income))} kr</Text>
                    </View>
                    <View style={styles.monthlyBudgetItem}>
                        <Text style={styles.monthlyBudgetItemText}>Fixed expenses</Text>
                        <Text
                            style={[styles.monthlyBudgetItemAmount, {color: colors.primary}]}>{formatCurrency(Number(fixedExpenses) * -1)} kr</Text>
                    </View>
                    <View style={styles.monthlyBudgetItem}>
                        <Text style={styles.monthlyBudgetItemText}>Remaining</Text>
                        <Text
                            style={styles.monthlyBudgetItemAmount}>{formatCurrency(Number(income) - Number(fixedExpenses))} kr</Text>
                    </View>
                </View>
                <ProgressBar
                    progress={Number(income) === 0 ? 0 : (Number(income) - Number(fixedExpenses)) / Number(income)}
                    color={colors.primary}/>
            </View>
            <View style={{flex: 1}}>
                <SidebarLink onPress={() => onNavigate('profile')} title={'Edit profile'} subtitle={username}
                             icon={'profile'} color={colors.primary} bg={colors.primaryLight}/>
                <SidebarLink onPress={() => onNavigate('budget')} title={'Budget & Income'}
                             subtitle={formatCurrency(Number(income)) + 'kr /' +
                                 ' mo'} icon={'coins'} color={colors.success} bg={colors.successLight}/>
                <SidebarLink onPress={() => onNavigate('notifications')} title={'Notifications'} subtitle={'5 active'}
                             icon={'notifications'} color={colors.warning} bg={colors.warningLight}/>
                <SidebarLink onPress={() => onNavigate('categories')} title={'Categories'}
                             subtitle={totalCategories.current + ' categories'}
                             icon={'categories'} color={colors.purple} bg={colors.purpleLight}/>
                <SidebarLink onPress={() => onNavigate('export')} title={'Export data'} subtitle={'CSV, PDF, JSON'}
                             icon={'export'} color={colors.info} bg={colors.infoLight}/>
                <SidebarLink onPress={() => onNavigate('about')} title={'About & Help'} subtitle={'v1.0.0'}
                             icon={'about'} color={colors.categories.other.text} bg={colors.categories.other.bg}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    monthlyBudgetCard: {
        margin: spacing[4],
        alignSelf: 'flex-start',
        width: SIDEBAR_WIDTH - (SCREEN_WIDTH - SIDEBAR_WIDTH) - 32,
        gap: spacing[2],
    },
    monthlyBudgetTitle: {
        fontSize: 11,
        fontFamily: `${typography.fonts.heading}_700`,
        color: colors.textMuted,
    },
    monthlyBudgetItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    monthlyBudgetItemText: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_600`,
        color: colors.textSecondary,
    },
    monthlyBudgetItemAmount: {
        fontSize: 14,
        fontFamily: `${typography.fonts.heading}_800`,
        color: colors.textPrimary,
    },
})

export default SidebarMenu;
