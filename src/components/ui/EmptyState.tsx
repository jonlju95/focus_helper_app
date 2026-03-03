import {View, Text, StyleSheet} from "react-native";
import typography from "@/constants/typography";
import spacing from "@/constants/spacing";

interface EmptyStateProps {
    message: string;
}

function EmptyState({ message }: EmptyStateProps) {
    return (
        <View style={styles.body}>
            <Text style={typography.styles.metaText}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingBottom: spacing[4],
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default EmptyState;