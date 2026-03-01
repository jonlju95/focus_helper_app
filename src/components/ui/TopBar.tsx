import {Pressable, StyleSheet, Text, View} from "react-native";
import colors from '@/constants/colors';
import {ArrowLeftIcon, ListIcon} from "phosphor-react-native";

interface TopBarProps {
    title: string;
    date?: string;
    showBack?: boolean;
    showDate?: boolean;
    onBack?: () => void;
    onMenu?: () => void;
}

export default function TopBar({title, date, showBack, showDate, onBack, onMenu}: TopBarProps) {
    return (
        <View style={styles.container}>
            {showBack && (
                <Pressable style={styles.button} onPress={onBack}>
                    <ArrowLeftIcon size={20} color={colors.textSecondary} weight="bold"/>
                </Pressable>
            )}
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                {showDate && date && (
                    <Text style={styles.meta}>{date}</Text>
                )}
            </View>

            <Pressable style={styles.button} onPress={onMenu}>
                <ListIcon size={20} color={colors.textSecondary} weight="bold"/>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // Positioning
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 48,
        paddingBottom: 12,
        gap: 12,

        // Colors
        backgroundColor: colors.bgApp,

        // Other
        borderRadius: 12,
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

    header: {
        flex: 1,
        flexShrink: 1,
    },

    title: {
        // Size
        flexShrink: 1,

        // Colors
        color: colors.textPrimary,

        // Fonts
        fontSize: 26,
        fontFamily: 'Nunito_900',
    },

    meta: {
        // Positioning
        alignSelf: 'flex-start',
        paddingHorizontal: 14,
        paddingVertical: 4,
        marginTop: 8,

        // Colors
        backgroundColor: colors.bgMuted,
        color: colors.textWarm,

        // Fonts
        fontSize: 12,
        fontFamily: 'NunitoSans_600',

        // Other
        borderRadius: 20,
    },
})