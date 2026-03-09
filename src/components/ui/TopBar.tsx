import {Pressable, StyleSheet, Text, View} from "react-native";
import colors from '@/constants/colors';
import {ArrowLeftIcon, ListIcon} from "phosphor-react-native";
import {useSidebar} from "@/context/SidebarContext";
import {sharedStyles} from "@/constants/sharedStyles";
import typography from "@/constants/typography";
import spacing from "@/constants/spacing";

interface TopBarProps {
    title: string;
    date?: string;
    showBack?: boolean;
    showDate?: boolean;
    showMenu?: boolean;
    onBack?: () => void;
}


export default function TopBar({title, date, showBack, showDate, showMenu = true, onBack}: TopBarProps) {
    const {open} = useSidebar();

    return (
        <View style={[styles.container, sharedStyles.row]}>
            {showBack && (
                <Pressable style={styles.button} onPress={onBack}>
                    <ArrowLeftIcon size={20} color={colors.textSecondary} weight="bold"/>
                </Pressable>
            )}
            <View style={styles.header}>
                <Text style={typography.styles.pageTitle}>{title}</Text>
                {showDate && date && (
                    <Text style={[typography.styles.metaText, styles.meta]}>{date}</Text>
                )}
            </View>

            {showMenu ? (
                <Pressable style={styles.button} onPress={open}>
                    <ListIcon size={20} color={colors.textSecondary} weight="bold"/>
                </Pressable>
            ) : <></>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // Positioning
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: spacing[12],
        paddingBottom: spacing[3],
        gap: spacing[3],

        // Colors
        backgroundColor: colors.bgApp,

        // Other
        borderRadius: spacing[3],
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
        borderRadius: spacing[3],
    },

    header: {
        flex: 1,
        flexShrink: 1,
    },

    meta: {
        // Positioning
        alignSelf: 'flex-start',
        paddingHorizontal: 14,
        paddingVertical: 4,
        marginTop: spacing[2],

        // Colors
        backgroundColor: colors.bgMuted,
        color: colors.textWarm,

        // Other
        borderRadius: spacing[4],
    },
})