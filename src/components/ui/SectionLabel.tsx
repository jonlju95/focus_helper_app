import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from "react-native";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";

interface SectionLabelProps {
    icon: ReactNode;
    label: string;
    right?: ReactNode;
}

function SectionLabel({icon, label, right}: SectionLabelProps) {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                {icon}
                <Text style={typography.styles.sectionLabel}>{label}</Text>
            </View>
            {right && (
                <View>{right}</View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[1],
    },
});

export default SectionLabel;