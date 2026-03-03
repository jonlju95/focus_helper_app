import React, {ReactNode} from 'react';
import {Text, View} from "react-native";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import {sharedStyles} from "@/constants/sharedStyles";

interface SectionLabelProps {
    icon: ReactNode;
    label: string;
    right?: ReactNode;
}

function SectionLabel({icon, label, right}: SectionLabelProps) {
    return (
        <View style={[sharedStyles.row, {justifyContent: 'space-between'}]}>
            <View style={[sharedStyles.row, {gap: spacing[1]}]}>
                {icon}
                <Text style={typography.styles.sectionLabel}>{label}</Text>
            </View>
            {right && (
                <View style={[sharedStyles.row, {gap: spacing[1]}]}>{right}</View>
            )}
        </View>
    );
}

export default SectionLabel;