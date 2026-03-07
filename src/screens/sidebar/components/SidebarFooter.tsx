import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import spacing from "@/constants/spacing";
import colors from "@/constants/colors";
import typography from "@/constants/typography";

function SidebarFooter() {
    return (
        <View style={styles.sidebarFooter}>
            <Text style={styles.sidebarFooterText}>FocusHelper v1.0.0</Text>
            <Text style={styles.sidebarFooterText}>Made for ADHD</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    sidebarFooter: {
        padding: spacing[4],
        paddingBottom: spacing[10],
        borderTopWidth: 1,
        borderTopColor: colors.border,
        justifyContent: "center",

    },
    sidebarFooterText: {
        fontSize: 11,
        fontFamily: `${typography.fonts.heading}_600`,
        letterSpacing: 1.2,
        color: '#C8C0B4',
    }
})

export default SidebarFooter;