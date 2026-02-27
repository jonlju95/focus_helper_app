import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import colors from "@/constants/colors";
import {ReminderType} from "@/types/reminder";

// Remove the internal useState — parent owns it now
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
                        onPress={() => onChange(tab.type)}  // ← calls parent's setter
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
        marginHorizontal: 16,
        alignItems: "center",
        backgroundColor: colors.bgCard,
        borderRadius: 16,
        padding: 4
    },
    tabButton: {
        paddingHorizontal: 6,
        paddingVertical: 8,
        borderRadius: 12,
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