import React from 'react';
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {ArrowRightIcon, InfoIcon} from "phosphor-react-native";
import spacing from "@/constants/spacing";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {useSidebarAbout} from "@/screens/sidebar/hooks/useSidebarAbout";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.85;

interface AboutProps {
    title: string;
    subtitle: string;
    lastObject?: boolean;
}

function AboutLink({title, subtitle, lastObject = false}: AboutProps) {
    return (
        <View style={[styles.settingsCardArea, (!lastObject && {borderBottomWidth: 1, borderBottomColor: '#F5F0EA'})]}>
            <View style={styles.linkContent}>
                <Text style={styles.linkTitle}>{title}</Text>
                <Text style={styles.linkSubtitle}>{subtitle}</Text>
            </View>
            <ArrowRightIcon size={15} color={'#C8C0B4'} weight={'bold'}/>
        </View>
    )
}

function SidebarAbout() {
   const {username} = useSidebarAbout();

    return (
        <View style={styles.container}>
            <View style={styles.headerContent}>
                <View style={styles.headerIcon}>
                    <InfoIcon size={32} color={colors.primary} weight={'bold'}/>
                </View>
                <Text style={styles.headerTitle}>FocusHelper</Text>
                <Text style={styles.headerSubtitle}>Version 1.0.0</Text>
            </View>
            <View style={styles.settingsCard}>
                <AboutLink title={'How to use reminders'} subtitle={'Guide to setting up your day'}/>
                <AboutLink title={'Managing your budget'} subtitle={'Track income and spending'}/>
                <AboutLink title={'FAQ'} subtitle={'Common questions answered'}/>
                <AboutLink title={'Send feedback'} subtitle={'Help improve the app'} lastObject={true}/>
            </View>
            <Text style={{
                fontSize: 11,
                fontFamily: `${typography.fonts.heading}_600`,
                color: '#C8C0B4',
                textAlign: 'center'
            }}>Made with care for ADHD users</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing[4],
        alignContent: "center",
        gap: spacing[4],
    },
    headerContent: {
        alignItems: "center",
    },
    headerIcon: {
        padding: spacing[4],
        backgroundColor: colors.primaryLight,
        borderRadius: spacing[3],
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: `${typography.fonts.heading}_900`,
        color: colors.textPrimary,
        marginTop: spacing[3]
    },
    headerSubtitle: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_600`,
        color: colors.textMuted,
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
})

export default SidebarAbout;