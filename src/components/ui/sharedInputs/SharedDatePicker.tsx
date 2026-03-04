import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {useState} from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {CalendarBlankIcon, ClockIcon} from 'phosphor-react-native';
import colors from '@/constants/colors';
import {sharedStyles} from "@/constants/sharedStyles";
import typography from "@/constants/typography";
import spacing from "@/constants/spacing";

interface DatePickerProps {
    label: string;
    value: Date;
    onChange: (date: Date) => void;
    mode?: 'date' | 'time' | 'datetime';
}

export default function SharedDatePicker({
    label,
    value,
    onChange,
    mode = 'date',
}: DatePickerProps) {
    const [visible, setVisible] = useState(false);

    const handleChange = (event: DateTimePickerEvent, selected?: Date) => {
        if (Platform.OS === 'android') setVisible(false);

        if (event.type === 'set' && selected) {
            onChange(selected);
        }
    };

    const displayValue = mode === 'time'
        ? value.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        : value.toLocaleDateString([], {day: '2-digit', month: '2-digit', year: 'numeric'});

    return (
        <View>
            <View style={[styles.header, sharedStyles.row]}>
                <Text style={typography.styles.label}>{label}</Text>
            </View>


            {/* Trigger — same style as SharedInput and SharedOptionPicker */}
            <Pressable
                style={[sharedStyles.row, sharedStyles.border, styles.trigger, visible && styles.triggerOpen]}
                onPress={() => setVisible(true)}>
                <Text style={typography.styles.inputText}>
                    {displayValue}
                </Text>
                {mode === 'date'
                    ? <CalendarBlankIcon size={16} color={colors.textMuted} weight="fill"/>
                    : <ClockIcon size={16} color={colors.textMuted} weight="fill"/>}
            </Pressable>

            {/* Picker — only shown when show is true */}
            {visible && (
                <DateTimePicker
                    value={value}
                    mode={mode}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleChange}
                />
            )}
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
});