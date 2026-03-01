import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {ArrowRightIcon, BasketIcon, BellIcon, ClockIcon, PhoneIcon, PillIcon} from "phosphor-react-native";
import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";

interface CardProps {
    icon: ReactNode,
    iconBg: string,
    title: string,
    time: string,
    urgent?: boolean,
}

function DailyCards({icon, iconBg, title, time, urgent}: CardProps) {
    return (
        <View style={styles.card}>
            <View style={[styles.cardIcon, {backgroundColor: iconBg}]}>
                {icon}
            </View>
            <View style={styles.cardLabel}>
                <Text style={[typography.styles.cardTitle, { fontSize: 14}]}>{title}</Text>
                <View style={styles.cardTime}>
                    <ClockIcon size={11} color={colors.textMuted} weight={'fill'}/>
                    <Text style={typography.styles.metaText}>{time}</Text>
                </View>
            </View>
            {urgent ? (
                <View style={[styles.cardTag, {backgroundColor: colors.primaryLight}]}>
                    <Text style={[styles.cardTagText, {color: colors.primary}]}>Now</Text>
                </View>
            ) : (
                <View style={[styles.cardTag, {backgroundColor: colors.warningLight}]}>
                    <Text style={[styles.cardTagText, {color: colors.warning}]}>Today</Text>
                </View>
            )}
        </View>
    )
}

function DailyRemindersSection() {
    return (
        <View style={styles.container}>

            {/* Badge */}
            <View style={styles.sectionLabel}>
                <View style={styles.sectionLabelTitle}>
                    <BellIcon size={16} color={colors.textPrimary} weight="fill"/>
                    <Text style={typography.styles.cardTitle}>Reminders today</Text>
                </View>
                <View style={styles.sectionLabelTitle}>
                    <Text style={typography.styles.label}>See all</Text>
                    <ArrowRightIcon size={12} color={colors.primary} weight="bold"/>
                </View>
            </View>

            <DailyCards icon={<PillIcon size={18} color={colors.primary} weight={"fill"}/>} iconBg={colors.primaryLight}
                        title={'Take medication'} time={'8:00 AM'} urgent={true}/>
            <DailyCards icon={<PhoneIcon size={18} color={colors.info} weight={"fill"}/>} iconBg={colors.infoLight}
                        title={'Call the dentist'} time={'10:30 AM'}/>
            <DailyCards icon={<BasketIcon size={18} color={colors.success} weight={"fill"}/>}
                        iconBg={colors.successLight}
                        title={'Grocery run'} time={'3:00 PM'}/>

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
        justifyContent: 'space-between',
    },

    sectionLabelTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[1]
    },

    card: {
        backgroundColor: colors.bgCard,
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[3],
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[3],
        borderRadius: spacing[4],
        elevation: 1,
        shadowColor:   '#000',
        shadowOffset:  { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius:  10,
    },

    cardIcon: {
        padding: spacing[3],
        borderRadius: spacing[3],
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardLabel: {
        flex: 1,
        gap: spacing[1]
    },

    cardTime: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[1],
    },

    cardTag: {
        paddingHorizontal: spacing[2],
        paddingVertical: spacing[1],
        borderRadius: spacing[5],
    },

    cardTagText: {
        fontSize: 10,
        fontFamily: 'Nunito_800',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    }
})

export default DailyRemindersSection;