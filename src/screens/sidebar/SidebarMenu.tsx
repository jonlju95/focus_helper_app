import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import {SidebarPanel} from '@/types/sidebar';
import spacing from "@/constants/spacing";
import colors from "@/constants/colors";
import {LinearGradient} from "expo-linear-gradient";
import {PenIcon, UserIcon, XIcon} from "phosphor-react-native";
import typography from "@/constants/typography";
import {useSidebar} from "@/context/SidebarContext";
import {getMonthName} from "@/utils/formatDate";
import ProgressBar from "@/components/ui/ProgressBar";
import SidebarLink from "@/components/sidebar/SidebarLink";

interface SidebarMenuProps {
    onNavigate: (screen: SidebarPanel) => void;  // ← SidebarPanel not Sidebar
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.82;

function SidebarMenu({onNavigate}: SidebarMenuProps) {
    const {close} = useSidebar();

    return (
        <>
            <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{x: 0.2, y: 1}}
                end={{x: 0.7, y: 0}}
                style={styles.sidebarHeader}>
                <View style={styles.sidebarBigCircle}/>
                <View style={styles.sidebarSmallCircle}/>
                <Pressable style={styles.sidebarCloseButton} onPress={close}>
                    <XIcon size={14} color="white" weight={'bold'}/>
                </Pressable>
                <View style={{gap: spacing[2]}}>
                    <View style={styles.sidebarProfile}>
                        <UserIcon size={28} color="white" weight={'bold'}/>
                    </View>
                    <View>
                        <Text style={styles.sidebarHeaderTitle}>Sunday</Text>
                        <Text style={styles.sidebarHeaderSubtitle}>Your personal helper</Text>
                    </View>
                    <Pressable style={styles.sidebarEditProfile}>
                        <PenIcon size={14} color="white" weight={'bold'}/>
                        <Text style={styles.sidebarEditProfileText}>Edit profile</Text>
                    </Pressable>
                </View>
            </LinearGradient>
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
    sidebarHeader: {
        paddingHorizontal: spacing[5],
        paddingTop: spacing[8],
        paddingBottom: spacing[5],
        backgroundColor: colors.primary,
    },
    sidebarBigCircle: {
        position: 'absolute',
        width: 160,
        height: 160,
        top: -30,
        right: SCREEN_WIDTH - SIDEBAR_WIDTH - 30,
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    sidebarSmallCircle: {
        position: 'absolute',
        width: 100,
        height: 100,
        bottom: -40,
        right: SCREEN_WIDTH - SIDEBAR_WIDTH + 40,
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    sidebarCloseButton: {
        alignSelf: 'flex-start',
        padding: spacing[2],
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: spacing[3],
        position: 'absolute',
        top: spacing[8],
        right: SCREEN_WIDTH - SIDEBAR_WIDTH + spacing[4],
        zIndex: 999,
    },
    sidebarProfile: {
        alignSelf: 'flex-start',
        padding: spacing[3],
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: spacing[4],
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    sidebarHeaderTitle: {
        fontSize: 20,
        fontFamily: `${typography.fonts.heading}_900`,
        color: 'white',
    },
    sidebarHeaderSubtitle: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_600`,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    sidebarEditProfile: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[1],
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[1],
        backgroundColor: 'rgba(255, 255, 255, 0.18)',
        borderRadius: spacing[4],
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    sidebarEditProfileText: {
        fontSize: 11,
        fontFamily: `${typography.fonts.heading}_800`,
        color: 'white',
    },
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