import {Modal, Pressable, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import colors from "@/constants/colors";
import {CaretDownIcon} from "phosphor-react-native";

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

function OptionPicker({options, value, onChange, label, showLabel = true, placeholder, required}: OptionPickerProps) {
    const [visible, setVisible] = useState(false);

    // The label we display on the trigger button
    const selectedLabel = options.find(o => o.value === value)?.label ?? placeholder;

    return (
        <View>
            {showLabel && (
                <View style={styles.labelWrapper}>
                    <Text style={styles.labelText}>{label}</Text>
                    {required && (
                        <Text style={styles.labelText}>*</Text>
                    )}
                </View>
            )}
            <Pressable
                style={[styles.trigger, visible && styles.triggerOpen]}
                onPress={() => setVisible(true)}
            >
                <Text style={styles.triggerText}>{selectedLabel}</Text>
                <CaretDownIcon size={16} color={colors.textMuted} weight={'bold'}/>
            </Pressable>

            <Modal
                visible={visible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setVisible(false)}  // Android back button
            >

                <Pressable
                    style={styles.backdrop}
                    onPress={() => setVisible(false)}
                >

                    <Pressable style={styles.sheet} onPress={e => e.stopPropagation()}>

                        {/* Handle bar — purely decorative */}
                        <View style={styles.handle}/>

                        {/* Title */}
                        <Text style={styles.title}>{('Select a ' + label?.toLowerCase())}</Text>

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
    labelWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        marginBottom: 4,
    },
    labelText: {
        fontSize: 11,
        fontFamily: 'Nunito_800',
        color: colors.primary,
    },

    trigger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.bgInput,
        borderColor: colors.border,
        borderWidth: 1.5,
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 11,
        gap: 8
    },
    triggerOpen: {
        borderColor: colors.primary,
        backgroundColor: colors.bgCard,
    },
    triggerText: {
        fontSize: 14,
        fontFamily: 'Nunito_600',
        color: colors.textPrimary,
    },
    triggerPlaceholder: {
        fontSize: 14,
        fontFamily: 'Nunito_600',
        color: '#C8C0B4',   // same as input placeholder
    },

    // Modal
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        paddingBottom: 32,
        gap: 8,
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
        fontSize: 16,
        fontFamily: 'Nunito_800',
        color: colors.textPrimary,
        marginBottom: 4,
    },

    // Options
    option: {
        padding: 14,
        borderRadius: 12,
        backgroundColor: colors.bgInput,
    },
    optionSelected: {
        backgroundColor: colors.primaryLight,
        borderWidth: 1.5,
        borderColor: colors.primary,
    },
    optionText: {
        fontSize: 15,
        fontFamily: 'Nunito_600',
        color: colors.textPrimary,
        textAlign: 'center',
    },
    optionTextSelected: {
        fontFamily: 'Nunito_800',
        color: colors.primary,
    },
});

export default OptionPicker;