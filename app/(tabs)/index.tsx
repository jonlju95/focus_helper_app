import {View} from "react-native";
import TopBar from "@/components/ui/TopBar";
import AlertStrip from "@/components/ui/AlertStrip";
import colors from "@/constants/colors";
import HeroCard from "@/components/overview/HeroCard";

export default function Index() {
    return (
        <>
            <View style={{flex: 1, gap: 20, backgroundColor: colors.bgApp}}>
                <TopBar title={'Good morning, Wednesday'} date={'Feb 24, 2026'} showDate={true}/>
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
            </View>
        </>

    );
}