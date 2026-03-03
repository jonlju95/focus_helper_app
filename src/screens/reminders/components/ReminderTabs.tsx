import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import colors from "@/constants/colors";
import {ReminderType} from "@/types/reminder";
import spacing from "@/constants/spacing";
import {sharedStyles} from "@/constants/sharedStyles";
import {useReminderTabs} from "@/screens/reminders/hooks/useReminderTabs";

interface ReminderTabsProps {
    activeTab: ReminderType;
    onChange: (tab: ReminderType) => void;
}

function ReminderTabs({activeTab, onChange}: ReminderTabsProps) {
    const {getReminderTabs} = useReminderTabs();

    const [reminderTabs, setReminderTabs] = useState<ReminderType[]>([]);

    useEffect(() => {
        getReminderTabs().then(tabs => {
            setReminderTabs(tabs);
        })
    }, []);

    return (
        <View style={[sharedStyles.row, sharedStyles.card, {padding: spacing[1]}]}>
            {reminderTabs.map(tab => {
                const isActive = activeTab.id === tab.id;
                return (
                    <Pressable
                        key={tab.id}
                        onPress={() => onChange(tab)}
                        style={[styles.tabButton, isActive && styles.activeTab]}>
                        <Text style={[styles.tabButtonText, isActive && styles.activeTabText]}>
                            {tab.name}
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