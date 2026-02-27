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
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                {showDate && date && (
                    <Text style={styles.dateTag}>{date}</Text>
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
        flexDirection: 'row',
        alignItems: 'center',   // remove justifyContent entirely
        paddingHorizontal: 16,
        paddingTop: 32,
        paddingBottom: 12,
        backgroundColor: colors.bgApp,
    },

    button: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: colors.bgMuted,
    },

    titleContainer: {
        flex: 1,
        flexShrink: 1,
    },

    title: {
        fontSize: 26,
        fontFamily: 'Nunito_900',
        color: colors.textPrimary,
        flexShrink: 1,
    },

    dateTag: {
        alignSelf: 'flex-start',
        backgroundColor: colors.bgMuted,
        color: colors.textWarm,
        paddingHorizontal: 14,
        paddingVertical: 4,
        borderRadius: 20,
        fontSize: 12,
        fontFamily: 'NunitoSans_600',
        marginTop: 8,
    },
})