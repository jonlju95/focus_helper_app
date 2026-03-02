import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {SidebarPanel} from '@/types/sidebar';
import spacing from "@/constants/spacing";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {getMonthName} from "@/utils/formatDate";
import ProgressBar from "@/components/ui/ProgressBar";
import SidebarLink from "@/components/sidebar/SidebarLink";

interface SidebarMenuProps {
    onNavigate: (screen: SidebarPanel) => void;  // ← SidebarPanel not Sidebar
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.85;

function SidebarMenu({onNavigate}: SidebarMenuProps) {
    return (
        <>
            <View style={styles.monthlyBudgetCard}>
                <Text style={styles.monthlyBudgetTitle}>{getMonthName(new Date())} budget</Text>
                <View>
                    <View style={styles.monthlyBudgetItem}>
                        <Text style={styles.monthlyBudgetItemText}>Income</Text>
                        <Text style={[styles.monthlyBudgetItemAmount, {color: colors.success}]}>19 245 kr</Text>
                    </View>
                    <View style={styles.monthlyBudgetItem}>
                        <Text style={styles.monthlyBudgetItemText}>Fixed expenses</Text>
                        <Text style={[styles.monthlyBudgetItemAmount, {color: colors.primary}]}>-8 830 kr</Text>
                    </View>
                    <View style={styles.monthlyBudgetItem}>
                        <Text style={styles.monthlyBudgetItemText}>Remaining</Text>
                        <Text style={styles.monthlyBudgetItemAmount}>5 436 kr</Text>
                    </View>
                </View>
                <ProgressBar progress={5436 / 19245} color={colors.primary}/>
            </View>
            <View style={{flex: 1}}>
                <SidebarLink onPress={() => onNavigate('profile')} title={'Profile'} subtitle={'Sunday'}
                             icon={'profile'} color={colors.primary} bg={colors.primaryLight}/>
                <SidebarLink onPress={() => onNavigate('budget')} title={'Budget & Income'} subtitle={'19 245 kr /' +
                    ' mo'} icon={'coins'} color={colors.success} bg={colors.successLight}/>
                <SidebarLink onPress={() => onNavigate('notifications')} title={'Notifications'} subtitle={'5 active'}
                             icon={'notifications'} color={colors.warning} bg={colors.warningLight}/>
                <SidebarLink onPress={() => onNavigate('categories')} title={'Categories'} subtitle={'6 categories'}
                             icon={'categories'} color={colors.purple} bg={colors.purpleLight}/>
                <SidebarLink onPress={() => onNavigate('export')} title={'Export data'} subtitle={'CSV, PDF, JSON'}
                             icon={'export'} color={colors.info} bg={colors.infoLight}/>
                <SidebarLink onPress={() => onNavigate('about')} title={'About & Help'} subtitle={'v1.0.0'}
                             icon={'about'} color={colors.categories.other.text} bg={colors.categories.other.bg}/>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    monthlyBudgetCard: {
        padding: spacing[4],
        backgroundColor: colors.bgCard,
        borderRadius: spacing[4],
        margin: spacing[4],
        alignSelf: 'flex-start',
        width: SIDEBAR_WIDTH - (SCREEN_WIDTH - SIDEBAR_WIDTH) - 32,
        gap: spacing[2],
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: {width: 2, height: 0},
        shadowOpacity: 0.05,
        shadowRadius: 12,
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
//
// <Pressable onPress={() => onNavigate('profile')}>
//     <Text>Profile</Text>
// </Pressable>
// <Pressable onPress={() => onNavigate('budget')}>
//     <Text>Budget & Income</Text>
// </Pressable>