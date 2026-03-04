import {Modal, Pressable, StyleSheet, Text, View} from "react-native";
import colors from '@/constants/colors';
import spacing from "@/constants/spacing";
import {sharedStyles} from "@/constants/sharedStyles";
import typography from "@/constants/typography";
import SharedButton from "@/components/ui/SharedButton";
import {XIcon} from "phosphor-react-native";

interface ConfirmDialogProps {
    visible: boolean;
    title: string;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({
    visible, title, message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm, onCancel
}: ConfirmDialogProps) {
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
            <Pressable style={styles.backdrop} onPress={onCancel}>
                <Pressable style={[sharedStyles.card, {gap: spacing[5]}]}
                           onPress={e => e.stopPropagation()}>
                    <View>
                        <Text style={[typography.styles.cardTitle, styles.title]}>{title}</Text>
                        {message && <Text style={typography.styles.bodyText}>{message}</Text>}
                    </View>
                    <View style={[sharedStyles.row, {justifyContent: 'space-between', gap: spacing[3]}]}>
                        <SharedButton label={cancelLabel} onPress={onCancel}
                                      icon={<XIcon size={16} color={colors.textPrimary} weight={'bold'}/>}
                                      variant={'secondary'}/>
                        <SharedButton label={confirmLabel} onPress={onConfirm}/>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 20
    },
})