import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import SharedBadge from "@/components/ui/SharedBadge";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import colors from "@/constants/colors";
import SharedButton from "@/components/ui/SharedButton";
import {sharedStyles} from "@/constants/sharedStyles";
import {useSidebarCategories} from "@/screens/sidebar/hooks/useSidebarCategories";

interface SidebarCategoriesProps {
    onManageCustom?: () => void;
}

function SidebarCategories({onManageCustom}: SidebarCategoriesProps) {
    const {activityCategories, expenseCategories, customCategories, deleteCategory} = useSidebarCategories();

    return (
        <View style={styles.container}>
            <View style={sharedStyles.section}>
                <Text style={typography.styles.sectionLabel}>Activities</Text>
                <View style={[sharedStyles.row, {flexWrap: 'wrap', gap: spacing[2]}]}>
                    {activityCategories.map(c => (
                        <SharedBadge key={c.id} title={c.name} color={c.colorText}
                                     bgColor={c.colorBg} deletable={false}/>
                    ))}
                </View>
            </View>

            <View style={sharedStyles.section}>
                <Text style={typography.styles.sectionLabel}>Expenses</Text>
                <View style={[sharedStyles.row, {flexWrap: 'wrap', gap: spacing[2]}]}>
                    {expenseCategories.map(c => (
                        <SharedBadge key={c.id} title={c.name} color={c.colorText}
                                     bgColor={c.colorBg} deletable={false}/>
                    ))}
                </View>
            </View>

            {customCategories.length > 0 && (
                <View style={sharedStyles.section}>
                    <Text style={typography.styles.sectionLabel}>Custom</Text>
                    <View style={[sharedStyles.row, {flexWrap: 'wrap', gap: spacing[2]}]}>
                        {customCategories.map(c => (
                            <SharedBadge key={c.id} title={c.name} color={c.colorText}
                                         bgColor={c.colorBg} deletable={true}
                                         onDelete={() => deleteCategory(c.id)}/>
                        ))}
                    </View>
                </View>
            )}

            <SharedButton
                icon={<></>}
                label={'Manage custom categories'}
                customStyle={{alignSelf: 'stretch'}}
                onPress={onManageCustom}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing[4],
        alignContent: "center",
        gap: spacing[4],
    },
    header: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_600`,
        color: colors.textMuted,
    },
    inputContainer: {
        flexDirection: 'row',
    },
    addButton: {
        backgroundColor: colors.primary,
        padding: spacing[3],
        borderRadius: spacing[2],
        alignSelf: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default SidebarCategories;