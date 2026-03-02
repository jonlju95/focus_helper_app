import {Modal, Pressable, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import colors from "@/constants/colors";
import {CaretDownIcon} from "phosphor-react-native";
import typography from "@/constants/typography";
import spacing from "@/constants/spacing";
import {sharedStyles} from "@/constants/sharedStyles";

export interface Option {
    label: string;
    value: string;
}

interface OptionPickerProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
    showLabel?: boolean;
    placeholder?: string;
    required?: boolean;
}

function SharedOptionPicker({options, value, onChange, label, showLabel = true, placeholder, required}: OptionPickerProps) {
    const [visible, setVisible] = useState(false);

    const selectedLabel = options.find(o => o.value === value)?.label ?? placeholder;

    return (
        <View>
            {showLabel && (
                <View style={[styles.header, sharedStyles.row]}>
                    <Text style={typography.styles.label}>{label}</Text>
                    {required && (
                        <Text style={typography.styles.label}>*</Text>
                    )}
                </View>
            )}
            <Pressable
                style={[sharedStyles.row, sharedStyles.border, styles.trigger, visible && styles.triggerOpen]}
                onPress={() => setVisible(true)}>
                <Text
                    style={typography.styles.inputText}>{selectedLabel}</Text>
                <CaretDownIcon size={16} color={colors.textMuted} weight={'bold'}/>
            </Pressable>

            <Modal
                visible={visible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setVisible(false)}>

                <Pressable
                    style={styles.backdrop}
                    onPress={() => setVisible(false)}>

                    <Pressable style={styles.sheet} onPress={e => e.stopPropagation()}>

                        {/* Handle bar — purely decorative */}
                        <View style={styles.handle}/>

                        {/* Title */}
                        <Text style={typography.styles.cardTitle}>{('Select a ' + label?.toLowerCase())}</Text>

                        {/* Options */}
                        {options.map(option => (
                            <Pressable
                                key={option.value}
                                style={[
                                    styles.option,
                                    option.value === value && styles.optionSelected
                                ]}
                                onPress={() => {
                                    onChange(option.value);
                                    setVisible(false);
                                }}>
                                <Text style={[
                                    typography.styles.cardTitle,
                                    styles.optionText,
                                    option.value === value && styles.optionTextSelected]}>
                                    {option.label}
                                </Text>
                            </Pressable>
                        ))}

                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        gap: 2,
        marginBottom: spacing[1],
    },

    trigger: {
        justifyContent: 'space-between',
        backgroundColor: colors.bgInput,
        borderWidth: 1.5,
        borderRadius: spacing[3],
        paddingHorizontal: spacing[2],
        paddingVertical: spacing[3],
        gap: spacing[2]
    },

    triggerOpen: {
        borderColor: colors.primary,
        backgroundColor: colors.bgCard,
    },

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
});

export default SharedOptionPicker;