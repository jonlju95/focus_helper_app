// components/ui/ColorPalettePicker.tsx
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {CheckIcon} from 'phosphor-react-native';

export interface ColorPair {
    color_text: string;
    color_bg: string;
}

export const COLOR_PALETTE: ColorPair[] = [
    {color_text: '#3A9A5A', color_bg: '#E8F5E8'},  // green
    {color_text: '#C4622D', color_bg: '#FDE8D8'},  // orange
    {color_text: '#3A7FC1', color_bg: '#DDEEF8'},  // blue
    {color_text: '#C13A9A', color_bg: '#FDE8F8'},  // pink
    {color_text: '#8A3AC1', color_bg: '#F0E8FD'},  // purple
    {color_text: '#C49028', color_bg: '#FDF3D8'},  // yellow
    {color_text: '#7A6A5A', color_bg: '#EDE8E0'},  // brown
    {color_text: '#C13A3A', color_bg: '#FDE8E8'},  // red
    {color_text: '#3AABC1', color_bg: '#DDF4F8'},  // teal
    {color_text: '#6A8A3A', color_bg: '#EEF5DD'},  // olive
];

interface ColorPalettePickerProps {
    selected: ColorPair | null;
    onSelect: (pair: ColorPair) => void;
}

function ColorPalettePicker({selected, onSelect}: ColorPalettePickerProps) {
    return (
        <View style={styles.container}>
            {COLOR_PALETTE.map((pair, index) => {
                const isSelected = selected?.color_text === pair.color_text;
                return (
                    <Pressable
                        key={index}
                        style={[styles.swatch, {backgroundColor: pair.color_bg, borderColor: pair.color_text},
                            isSelected && styles.swatchSelected
                        ]}
                        onPress={() => onSelect(pair)}>
                        {isSelected && <CheckIcon size={14} color={pair.color_text} weight={'bold'}/>}
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    swatch: {
        width: 32,
        height: 32,
        borderRadius: 8,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    swatchSelected: {
        borderWidth: 2.5,
    },
});

export default ColorPalettePicker;