import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import {capitalise} from "@/utils/formatLabel";
import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import {StarIcon, XIcon} from "phosphor-react-native";

interface TagProps {
    title: string;
    color?: string;
    bgColor?: string;
    prioritized?: boolean;
    deletable?: boolean;
    onDelete?: () => void;
    deleteBtnBg?: string;
}

function SharedTag({
    title,
    color = colors.primary,
    bgColor = colors.primaryLight,
    prioritized = false,
    deletable = false,
    onDelete,
    deleteBtnBg,
}: TagProps) {
    return (
        <View style={[styles.tagContainer, {backgroundColor: bgColor}]}>
            {prioritized && (
                <StarIcon color={colors.primary} size={11} weight={'fill'}/>
            )}
            <Text style={[styles.tagText, {color: color}]}>
                {capitalise(title)}
            </Text>
            {deletable && (
                <Pressable style={[styles.deleteTagBtn, {backgroundColor: deleteBtnBg}]} onPress={onDelete}>
                    <XIcon size={9} color={color} weight={'bold'}/>
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    tagContainer: {
        flexDirection: 'row',
        paddingLeft: spacing[2],
        paddingRight: 2,
        paddingVertical: 2,
        borderRadius: spacing[4],
        backgroundColor: colors.primaryLight,
        gap: spacing[1],
    },
    tagText: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_600`,
        color: colors.primary,
    },
    deleteTagBtn: {
        alignSelf: 'center',
        padding: spacing[1],
        borderRadius: spacing[10],
    }
})

export default SharedTag;