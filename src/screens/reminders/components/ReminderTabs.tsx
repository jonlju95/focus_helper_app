import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import colors from "@/constants/colors";
import {ReminderType} from "@/types/reminder";
import spacing from "@/constants/spacing";

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
        <View style={styles.container}>
            {TABS.map(tab => {
                const isActive = activeTab === tab.type;
                return (
                    <Pressable
                        key={tab.type}
                        onPress={() => onChange(tab.type)}
                        style={[styles.tabButton, isActive && styles.activeTab]}
                    >
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
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.bgCard,
        borderRadius: spacing[4],
        padding: spacing[1]
    },
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
        color: '#ffffff',
    },
    tabButtonText: {
        color: colors.textMuted,
        fontSize: 13,
        fontFamily: 'Nunito_800',
    },
})

export default ReminderTabs;