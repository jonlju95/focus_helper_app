import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {ArrowRightIcon, BasketIcon, BellIcon, ClockIcon, PhoneIcon, PillIcon} from "phosphor-react-native";
import colors from "@/constants/colors";

interface CardProps {
    icon: ReactNode,
    iconBg: string,
    title: string,
    time: string,
    urgent?: boolean,
}

function DailyCards({icon, iconBg, title, time, urgent}: CardProps) {
    return (
        <View style={styles.cardWrapper}>
            <View style={[styles.cardIcon, {backgroundColor: iconBg}]}>
                {icon}
            </View>
            <View style={styles.cardLabel}>
                <Text style={styles.cardTitle}>{title}</Text>
                <View style={styles.cardTime}>
                    <ClockIcon size={11} color={colors.textMuted} weight={'fill'}/>
                    <Text style={styles.cardTimeText}>{time}</Text>
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

function DailyReminders() {
    return (

        <View style={styles.container}>

            {/* Badge */}
            <View style={styles.sectionLabel}>
                <View style={styles.sectionLabelTitle}>
                    <BellIcon size={16} color={colors.textPrimary} weight="fill"/>
                    <Text style={styles.sectionLabelText}>Reminders today</Text>
                </View>
                <View style={styles.sectionLabelTitle}>
                    <Text style={styles.sectionLabelLink}>See all</Text>
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
        marginHorizontal: 16,
        gap: 12,
    },
    sectionLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sectionLabelTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    sectionLabelText: {
        fontSize: 15,
        fontFamily: 'Nunito_800',
        color: colors.textPrimary,
    },
    sectionLabelLink: {
        fontSize: 12,
        fontFamily: 'Nunito_700',
        color: colors.primary,
    },

    cardWrapper: {
        backgroundColor: colors.bgCard,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderRadius: 16
    },

    cardIcon: {
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardLabel: {
        flex: 1,
        gap: 2
    },
    cardTitle: {
        color: colors.textPrimary,
        fontSize: 14,
        fontFamily: 'Nunito_800',

    },
    cardTime: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    cardTimeText: {
        color: colors.textMuted,
        fontSize: 12,
        fontFamily: 'Nunito_600',
    },
    cardTag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
    },
    cardTagText: {
        fontSize: 10,
        fontFamily: 'Nunito_800',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    }
})

export default DailyReminders;