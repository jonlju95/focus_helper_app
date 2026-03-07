import {Pressable, StyleSheet, Text, View} from "react-native";

import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import {sharedStyles} from "@/constants/sharedStyles";
import {ReminderType} from "@/screens/reminders/types/reminder";

interface ReminderTabsProps {
    tabs: ReminderType[];
    activeTab: ReminderType;
    onChange: (tab: ReminderType) => void;
}

function ReminderTabs({tabs, activeTab, onChange}: ReminderTabsProps) {
    return (
        <View style={[sharedStyles.row, sharedStyles.card, {padding: spacing[1]}]}>
            {tabs.map(tab => {
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