import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from "react-native";
import spacing from "@/constants/spacing";
import {ArrowRightIcon, FileArrowDownIcon} from "phosphor-react-native";
import typography from "@/constants/typography";
import colors from "@/constants/colors";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.85;

function SidebarExport() {
    return (
        <>
            <View style={styles.comingSoon}>
                <Text style={[typography.styles.pageTitle, {color: colors.textMuted}]}>Coming soon</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.header}>Export your data at any time. Your data is only stored locally on your
                    device.</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: spacing[3]}}>
                    <Pressable style={styles.card}>
                        <View style={[styles.iconContainer, {backgroundColor: colors.successLight}]}>
                            <FileArrowDownIcon size={20} color={colors.success} weight={'bold'}/>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.cardTitle}>Export as CSV</Text>
                            <Text style={styles.cardSubtitle}>All expenses, reminders & activities</Text>
                        </View>
                        <ArrowRightIcon size={15} color={'#C8C0B4'} weight={'bold'}/>
                    </Pressable>
                    <Pressable style={styles.card}>
                        <View style={[styles.iconContainer, {backgroundColor: colors.primaryLight}]}>
                            <FileArrowDownIcon size={20} color={colors.primary} weight={'bold'}/>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.cardTitle}>Export as PDF</Text>
                            <Text style={styles.cardSubtitle}>Formatted monthly summary report</Text>
                        </View>
                        <ArrowRightIcon size={15} color={'#C8C0B4'} weight={'bold'}/>
                    </Pressable>
                    <Pressable style={styles.card}>
                        <View style={[styles.iconContainer, {backgroundColor: colors.infoLight}]}>
                            <FileArrowDownIcon size={20} color={colors.info} weight={'bold'}/>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.cardTitle}>Export as JSON</Text>
                            <Text style={styles.cardSubtitle}>Full data backup for developers</Text>
                        </View>
                        <ArrowRightIcon size={15} color={'#C8C0B4'} weight={'bold'}/>
                    </Pressable>
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
    header: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_600`,
        color: colors.textMuted,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing[3],
        backgroundColor: 'white',
        padding: spacing[4],
        borderRadius: spacing[4],
        width: SIDEBAR_WIDTH - (SCREEN_WIDTH - SIDEBAR_WIDTH) - 32,
        elevation: 1,
        shadowColor:   '#000',
        shadowOffset:  { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius:  10,
    },
    iconContainer: {
        padding: spacing[3],
        borderRadius: spacing[3],
    },
    cardTitle: {
        fontSize: 14,
        fontFamily: `${typography.fonts.heading}_800`,
        color: colors.textPrimary,
    },
    cardSubtitle: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_600`,
        color: colors.textMuted,
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

export default SidebarExport;