import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {ClockIcon} from "phosphor-react-native";
import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import {sharedStyles} from "@/constants/sharedStyles";

interface CardProps {
    icon: ReactNode,
    iconBg: string,
    title: string,
    time: string,
    urgent?: boolean,
}

function DailyCards({icon, iconBg, title, time, urgent}: CardProps) {
    return (
        <View style={[sharedStyles.card, sharedStyles.row, {gap: spacing[3]}]}>
            <View style={[styles.cardIcon, {backgroundColor: iconBg}]}>
                {icon}
            </View>
            <View style={styles.cardLabel}>
                <Text style={[typography.styles.cardTitle, {fontSize: 14}]}>{title}</Text>
                <View style={[sharedStyles.row, {gap: spacing[1]}]}>
                    <ClockIcon size={11} color={colors.textMuted} weight={'fill'}/>
                    <Text style={typography.styles.metaText}>{time}</Text>
                </View>
            </View>
            {urgent ? (
                <View style={[styles.cardTag, {backgroundColor: colors.primaryLight}]}>
                    <Text style={[typography.styles.label, styles.cardTagLabel]}>Now</Text>
                </View>
            ) : (
                <View style={[styles.cardTag, {backgroundColor: colors.warningLight}]}>
                    <Text style={[typography.styles.label, styles.cardTagLabel]}>Today</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
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

    cardTag: {
        paddingHorizontal: spacing[2],
        paddingVertical: spacing[1],
        borderRadius: spacing[5],
    },

    cardTagLabel: {
        fontSize: 10,
        textTransform: 'uppercase',
        color: colors.primary
    }

})

export default DailyCards;