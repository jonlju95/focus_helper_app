import {StyleSheet} from "react-native";
import colors from "@/constants/colors";
import spacing from "@/constants/spacing";


export const sharedStyles = StyleSheet.create({
    // Root screen container - used on every list/detail screen
    container: {
        flex: 1,
        backgroundColor: colors.bgApp,
        paddingHorizontal: spacing[4],
        gap: spacing[3],
    },

    scroll: {
        flex: 1,
    },

    // ScrollView content container
    scrollContent: {
        paddingBottom: spacing[4],
        gap: spacing[4],
    },

    // White card - used everywhere
    card: {
        backgroundColor: colors.bgCard,
        borderRadius: spacing[4],
        padding: spacing[4],
    },

    // Section group with gap
    section: {
        gap: spacing[3],
    },

    // Add button row at bottom of lists
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: spacing[15],
    },

    // Generic row
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    border: {
        borderWidth: 1,
        borderColor: colors.border,
    }
})