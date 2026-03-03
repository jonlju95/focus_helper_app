import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import colors from "@/constants/colors";
import {ReminderType} from "@/types/reminder";
import spacing from "@/constants/spacing";
import {sharedStyles} from "@/constants/sharedStyles";

interface ReminderTabsProps {
    activeTab: ReminderType;
    onChange: (tab: ReminderType) => void;
}

const TABS: { label: string; type: ReminderType }[] = [
    {label: 'Reminders', type: 'reminder'},
    {label: 'Shopping', type: 'shopping'},
    {label: 'Notes', type: 'note'},
];

function ReminderTabs({activeTab, onChange}: ReminderTabsProps) {
    return (
        <View style={[sharedStyles.row, sharedStyles.card, {padding: spacing[1]}]}>
            {TABS.map(tab => {
                const isActive = activeTab === tab.type;
                return (
                    <Pressable
                        key={tab.type}
                        onPress={() => onChange(tab.type)}
                        style={[styles.tabButton, isActive && styles.activeTab]}>
                        <Text style={[styles.tabButtonText, isActive && styles.activeTabText]}>
                            {tab.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabButton: {
        paddingHorizontal: spacing[1],
        paddingVertical: spacing[2],
        borderRadius: spacing[3],
        flex: 1,
        alignItems: "center",
    },

    activeTab: {
        backgroundColor: colors.primary,
    },

    inactiveTab: {
        backgroundColor: colors.bgCard,
    },

    activeTabText: {
        color: 'white',
    },

    tabButtonText: {
        color: colors.textMuted,
        fontSize: 13,
        fontFamily: 'Nunito_800',
    },
})

export default ReminderTabs;