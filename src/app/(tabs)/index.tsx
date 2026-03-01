import {ScrollView, StyleSheet, View} from "react-native";
import TopBar from "@/components/ui/TopBar";
import AlertStrip from "@/components/ui/AlertStrip";
import colors from "@/constants/colors";
import HeroCard from "@/screens/overview/HeroCard";
import BudgetCard from "@/screens/overview/BudgetCard";
import QuickAdd from "@/screens/overview/QuickAdd";
import DailyReminders from "@/screens/overview/DailyReminders";

export default function Index() {
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
                <HeroCard/>
                <BudgetCard/>
                <QuickAdd/>
                <DailyReminders/>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgApp,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 16,
        gap: 16,
    },
});