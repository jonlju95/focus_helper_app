import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SharedInput from '@/components/ui/sharedInputs/SharedInput';
import SharedOptionPicker from '@/components/ui/sharedInputs/SharedOptionPicker';
import SharedButton from '@/components/ui/SharedButton';
import ColorPalettePicker, {COLOR_PALETTE, ColorPair} from '@/components/ui/ColorPalettePicker';
import {CheckIcon} from 'phosphor-react-native';
import spacing from '@/constants/spacing';
import typography from '@/constants/typography';
import colors from '@/constants/colors';
import {sharedStyles} from "@/constants/sharedStyles";

const TYPE_OPTIONS = [
    {label: 'Activity', value: 'ACTIVITY'},
    {label: 'Expense', value: 'EXPENSE'},
];

interface SidebarCustomCategoryProps {
    onBack?: () => void;
    onSave?: (name: string, colors: ColorPair, type: 'EXPENSE' | 'ACTIVITY') => void;
}

function SidebarCustomCategory({onBack, onSave}: SidebarCustomCategoryProps) {
    const [name, setName] = useState('');
    const [selectedColor, setSelectedColor] = useState<ColorPair>(COLOR_PALETTE[0]);
    const [type, setType] = useState<'EXPENSE' | 'ACTIVITY'>('EXPENSE');

    const handleSave = () => {
        if (!name.trim()) return;
        onSave?.(name.trim(), selectedColor, type);
        onBack?.();
    };

    return (
        <View style={styles.container}>
            <View style={[sharedStyles.card, {gap: spacing[3]}]}>
                <SharedInput
                    value={name}
                    onChangeText={setName}
                    showLabel={true}
                    label={'Name'}
                    placeholder="Category name"
                />

                <SharedOptionPicker
                    options={TYPE_OPTIONS}
                    value={type}
                    label={'Category type'}
                    onChange={(v) => setType(v as 'EXPENSE' | 'ACTIVITY')}
                />

                <View style={{gap: spacing[1]}}>
                    <Text style={[typography.styles.label]}>Color</Text>
                    <ColorPalettePicker
                        selected={selectedColor}
                        onSelect={setSelectedColor}
                    />
                </View>

                <View style={{gap: spacing[1]}}>
                    <Text style={[typography.styles.label]}>Preview</Text>
                    <View style={[styles.preview, {backgroundColor: selectedColor.color_bg}]}>
                        <Text style={[styles.previewText, {color: selectedColor.color_text}]}>
                            {name || 'Category name'}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <SharedButton
                    icon={<CheckIcon size={12} color={'white'} weight={'bold'}/>}
                    label={'Add category'}
                    customStyle={{alignSelf: 'stretch'}}
                    onPress={handleSave}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing[4],
        gap: spacing[4],
    },
    sectionLabel: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_600`,
        color: colors.textMuted,
    },
    preview: {
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[2],
        borderRadius: spacing[2],
        alignSelf: 'flex-start',
    },
    previewText: {
        fontSize: 13,
        fontFamily: `${typography.fonts.heading}_600`,
    },
    previewLabel: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_600`,
        color: colors.textMuted,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SidebarCustomCategory;