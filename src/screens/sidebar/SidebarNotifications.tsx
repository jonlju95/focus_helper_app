import {Dimensions, StyleSheet, Text, View} from "react-native";
import React from "react";
import spacing from "@/constants/spacing";
import colors from "@/constants/colors";
import {BellIcon} from "phosphor-react-native";
import ToggleButton from "@/components/ui/sharedInputs/ToggleButton";
import typography from "@/constants/typography";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.85;

interface NotificationProps {
    color: string;
    bg: string;
    title: string;
    subtitle: string;
    active: boolean;
    lastObject?: boolean;
}

const notificationObjects: NotificationProps[] = [
    {
        color: colors.primary,
        bg: colors.primaryLight,
        title: 'Reminders today',
        subtitle: "Notify when a reminder is due",
        active: true
    },
    {
        color: colors.warning, bg: colors.warningLight,
        title: 'Upcoming reminders',
        subtitle: "24h before a reminder  is due",
        active: true
    },
    {
        color: colors.primary,
        bg: colors.primaryLight,
        title: 'Invoice due soon',
        subtitle: "3 days before an invoice is due",
        active: true
    },
    {
        color: colors.success,
        bg: colors.successLight,
        title: 'Budget alert',
        subtitle: "When spending exceeds 80% of budget",
        active: false
    },
    {
        color: colors.info,
        bg: colors.infoLight,
        title: 'Weekly digest',
        subtitle: "Summary every Sunday morning",
        active: true
    },
]

function NotificationLink({color, bg, title, subtitle, active, lastObject = false}: NotificationProps) {
    return (
        <View style={[styles.settingsCardArea, (!lastObject && {borderBottomWidth: 1, borderBottomColor: '#F5F0EA'})]}>
            <View style={[styles.linkIcon, {backgroundColor: bg}]}>
                <BellIcon size={16} color={color} weight={'fill'}/>
            </View>
            <View style={styles.linkContent}>
                <Text style={styles.linkTitle}>{title}</Text>
                <Text style={styles.linkSubtitle}>{subtitle}</Text>
            </View>
            <ToggleButton value={active} onChange={() => console.log(true)}/>
        </View>
    )
}

function SidebarNotifications() {
    return (
        <>
            <View style={styles.comingSoon}>
                <Text style={[typography.styles.pageTitle, {color: colors.textMuted}]}>Coming soon</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.settingsCard}>
                    {notificationObjects.map((n, index) => (
                        <NotificationLink key={index}
                                          color={n.color}
                                          bg={n.bg}
                                          title={n.title}
                                          subtitle={n.subtitle}
                                          active={n.active}
                                          lastObject={index === notificationObjects.length - 1}/>
                    ))}
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing[4],
        alignContent: "center",
        gap: spacing[4],
    },
    settingsCard: {
        backgroundColor: colors.bgCard,
        borderRadius: spacing[4],
        width: SIDEBAR_WIDTH - (SCREEN_WIDTH - SIDEBAR_WIDTH) - 32,
    },
    settingsCardArea: {
        padding: spacing[4],
        flexDirection: "row",
        alignItems: "center",
        gap: spacing[2],
        flex: 1
    },
    linkIcon: {
        padding: spacing[2],
        borderRadius: spacing[3],
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkContent: {
        flex: 1
    },
    linkTitle: {
        fontSize: 14,
        fontFamily: `${typography.fonts.heading}_800`,
        color: colors.textPrimary
    },
    linkSubtitle: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_600`,
        color: colors.textMuted
    },

    comingSoon: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.85)',
        zIndex: 999,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default SidebarNotifications;