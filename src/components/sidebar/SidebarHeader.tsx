import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import spacing from "@/constants/spacing";
import {ArrowLeftIcon, UserIcon, XIcon} from "phosphor-react-native";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {LinearGradient} from "expo-linear-gradient";
import {useSidebar} from "@/context/SidebarContext";
import {useSetting} from "@/hooks/useSetting";

interface HeaderProps {
    isMenu?: boolean;
    title: string;
    onBack?: () => void;
}

function SidebarHeader({isMenu, title, onBack}: HeaderProps) {
    const {close} = useSidebar();
    const {value: username} = useSetting('USER_NAME');

    if (isMenu) {
        return (
            <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{x: 0.2, y: 1}}
                end={{x: 0.7, y: 0}}
                style={styles.sidebarHeader}>
                <View style={styles.sidebarBigCircle}/>
                <View style={styles.sidebarSmallCircle}/>
                <Pressable style={styles.sidebarCloseButton} onPress={close}>
                    <XIcon size={14} color="white" weight={'bold'}/>
                </Pressable>
                <View style={{gap: spacing[2]}}>
                    <View style={styles.sidebarProfile}>
                        <UserIcon size={28} color="white" weight={'bold'}/>
                    </View>
                    <View>
                        <Text style={styles.sidebarHeaderTitle}>{username}</Text>
                        <Text style={styles.sidebarHeaderSubtitle}>Your personal helper</Text>
                    </View>
                </View>
            </LinearGradient>
        )
    }

    return (
        <View style={styles.headerContainer}>
            <Pressable style={styles.button} onPress={onBack}>
                <ArrowLeftIcon size={20} color={colors.textSecondary} weight="bold"/>
            </Pressable>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    sidebarHeader: {
        paddingHorizontal: spacing[5],
        paddingTop: spacing[8],
        paddingBottom: spacing[5],
        backgroundColor: colors.primary,
    },
    sidebarBigCircle: {
        position: 'absolute',
        width: 160,
        height: 160,
        top: -30,
        right: -30,
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    sidebarSmallCircle: {
        position: 'absolute',
        width: 100,
        height: 100,
        bottom: -40,
        right: 40,
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    sidebarCloseButton: {
        alignSelf: 'flex-start',
        padding: spacing[2],
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: spacing[3],
        position: 'absolute',
        top: spacing[8],
        right: spacing[4],
        zIndex: 999,
    },
    sidebarProfile: {
        alignSelf: 'flex-start',
        padding: spacing[3],
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: spacing[4],
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    sidebarHeaderTitle: {
        fontSize: 20,
        fontFamily: `${typography.fonts.heading}_900`,
        color: 'white',
    },
    sidebarHeaderSubtitle: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_600`,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    sidebarEditProfile: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[1],
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[1],
        backgroundColor: 'rgba(255, 255, 255, 0.18)',
        borderRadius: spacing[4],
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    sidebarEditProfileText: {
        fontSize: 11,
        fontFamily: `${typography.fonts.heading}_800`,
        color: 'white',
    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[3],
        paddingHorizontal: spacing[4],
        paddingTop: spacing[8],
        paddingBottom: spacing[4],
        borderBottomWidth: 1,
        borderColor: colors.border,
    },
    button: {
        // Positioning
        alignItems: 'center',
        justifyContent: 'center',

        // Size
        width: 32,
        height: 32,

        // Colors
        backgroundColor: colors.bgMuted,

        // Other
        borderRadius: 12,
    },
    title: {
        fontSize: 18,
        fontFamily: `${typography.fonts.heading}_900`,
        color: colors.textPrimary,
    }
})

export default SidebarHeader;