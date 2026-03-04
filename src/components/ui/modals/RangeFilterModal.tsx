import {Modal, Pressable, StyleSheet, Text, View} from "react-native";
import spacing from "@/constants/spacing";
import colors from "@/constants/colors";
import typography from "@/constants/typography";

type FilterRange = 'week' | 'month' | 'all';

interface RangeFilterModalProps {
    visible: boolean;
    value: FilterRange;
    onChange: (range: FilterRange) => void;
    onClose: () => void;
}

const PRESETS: { label: string; value: FilterRange }[] = [
    {label: 'This week', value: 'week'},
    {label: 'This month', value: 'month'},
    {label: 'All', value: 'all'},
];

export default function RangeFilterModal({visible, value, onChange, onClose}: RangeFilterModalProps) {
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <Pressable style={styles.backdrop} onPress={onClose}>
                <Pressable style={styles.sheet} onPress={e => e.stopPropagation()}>
                    <View style={styles.handle}/>
                    <Text style={typography.styles.cardTitle}>Filter by date</Text>
                    {PRESETS.map(preset => (
                        <Pressable
                            key={preset.value}
                            style={[styles.option,
                                preset.value === value && styles.optionSelected]}
                            onPress={() => {
                                onChange(preset.value);
                                onClose();
                            }}
                        >
                            <Text style={[
                                typography.styles.cardTitle,
                                styles.optionText,
                                preset.value === value && styles.optionTextSelected]}>
                                {preset.label}
                            </Text>
                        </Pressable>
                    ))}
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    // Modal
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },

    sheet: {
        backgroundColor: 'white',
        borderTopLeftRadius: spacing[6],
        borderTopRightRadius: spacing[6],
        padding: spacing[4],
        paddingBottom: spacing[8],
        gap: spacing[2],
    },

    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: colors.border,
        alignSelf: 'center',
        marginBottom: 4,
    },

    title: {
        marginBottom: spacing[1],
    },
    // Options
    option: {
        padding: spacing[3],
        borderRadius: spacing[3],
        backgroundColor: colors.bgInput,
    },
    optionSelected: {
        backgroundColor: colors.primaryLight,
        borderWidth: 1.5,
        borderColor: colors.primary,
    },
    optionText: {
        fontFamily: 'Nunito_600',
        textAlign: 'center',
    },
    optionTextSelected: {
        fontFamily: 'Nunito_800',
        color: colors.primary,
    },
})