import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import {capitalise} from "@/utils/formatLabel";
import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import {StarIcon, XIcon} from "phosphor-react-native";
import {sharedStyles} from "@/constants/sharedStyles";

interface TagProps {
    title: string;
    color?: string;
    bgColor?: string;
    prioritized?: boolean;
    deletable?: boolean;
    onDelete?: () => void;
    deleteBtnBg?: string;
}

function SharedBadge({
    title,
    color = colors.primary,
    bgColor = colors.primaryLight,
    prioritized = false,
    deletable = false,
    onDelete,
    deleteBtnBg,
}: TagProps) {
    return (
        <View style={[styles.badge, sharedStyles.row, {backgroundColor: bgColor}]}>
            {prioritized && (
                <StarIcon color={colors.primary} size={11} weight={'fill'}/>
            )}
            <Text style={[typography.styles.metaText, {color: color ?? colors.primary}]}>
                {capitalise(title)}
            </Text>
            {deletable && (
                <Pressable style={[styles.deleteBadgeBtn, {backgroundColor: deleteBtnBg, marginRight: -6}]}
                           onPress={onDelete} hitSlop={8}>
                    <XIcon size={9} color={color} weight={'bold'}/>
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: spacing[2],
        paddingVertical: 2,
        borderRadius: spacing[4],
        backgroundColor: colors.primaryLight,
        gap: spacing[1],
        alignSelf: 'flex-start'
    },

    deleteBadgeBtn: {
        alignSelf: 'center',
        padding: spacing[1],
        borderRadius: spacing[10],
    }
})

export default SharedBadge;