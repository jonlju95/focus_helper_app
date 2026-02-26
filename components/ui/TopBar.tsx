import {Pressable, StyleSheet, Text, View} from "react-native";
import colors from '@/constants/colors';
import {ArrowLeftIcon, ListIcon} from "phosphor-react-native";

interface TopBarProps {
    title: string;
    showBack?: boolean;
    onBack?: () => void;
    onMenu?: () => void;
}

export default function TopBar({title, showBack, onBack, onMenu}: TopBarProps) {
    return (
        <View style={styles.container}>
            {showBack && (
                <Pressable style={styles.button} onPress={onBack}>
                    <ArrowLeftIcon size={20} color={colors.textSecondary} weight={'bold'}/>
                </Pressable>
            )}
            <Text style={styles.title}>{title}</Text>
            <Pressable style={styles.button} onPress={onMenu}>
                <ListIcon size={20} color={colors.textSecondary} weight={'bold'}/>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 52,
        paddingBottom: 10,
        backgroundColor: colors.bgScreen,
    },

    button: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: colors.bgMuted,
    },

    title: {
        fontSize: 26,
        fontFamily: 'Nunito_900',
        color: colors.textPrimary,
        flex: 1
    }
})