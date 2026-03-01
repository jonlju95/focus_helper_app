import {ScrollView, StyleSheet, View} from "react-native";
import TopBar from "@/components/ui/TopBar";
import AlertStrip from "@/components/ui/AlertStrip";
import colors from "@/constants/colors";
import HeroSection from "@/screens/overview/components/HeroSection";
import BudgetSection from "@/screens/overview/components/BudgetSection";
import QuickAddSection from "@/screens/overview/components/QuickAddSection";
import DailyRemindersSection from "@/screens/overview/components/DailyRemindersSection";
import spacing from "@/constants/spacing";

export default function OverviewScreen() {
    return (
        <View style={styles.container}>
            <TopBar title={'Good morning, Wednesday'} date={'Feb 24, 2026'} showDate={true}/>
            <ScrollView style={styles.scroll}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}>
                <AlertStrip left={{
                    icon: 'warning',
                    iconColor: colors.urgent,
                    iconBg: colors.urgentLight,
                    label: 'Upcoming invoices',
                    value: '6',
                }} right={{
                    icon: 'bell',
                    iconColor: colors.warning,
                    iconBg: colors.warningLight,
                    label: 'Upcoming reminders',
                    value: '2',
                }}/>
                <HeroSection/>
                <BudgetSection/>
                <QuickAddSection/>
                <DailyRemindersSection/>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgApp,
        paddingHorizontal: spacing[4],
        gap: spacing[3]
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: spacing[4],
        gap: spacing[4],
    },
});