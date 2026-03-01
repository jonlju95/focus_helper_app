import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {useState} from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {CalendarBlankIcon} from 'phosphor-react-native';
import colors from '@/constants/colors';

interface DatePickerProps {
    label?: string;
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
    const [show, setShow] = useState(false);

    const handleChange = (event: DateTimePickerEvent, selected?: Date) => {
        // On Android the dialog closes itself — hide our show state too
        if (Platform.OS === 'android') setShow(false);

        // event.type is 'set' when user confirms, 'dismissed' when cancelled
        if (event.type === 'set' && selected) {
            onChange(selected);
        }
    };

    const displayValue = mode === 'time'
        ? value.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        : value.toLocaleDateString([], {day: 'numeric', month: '2-digit', year: 'numeric'});

    return (
        <View>
            {label && (
                <View style={styles.labelWrapper}>
                    <Text style={styles.labelText}>{label}</Text>
                    <Text>{label}</Text>
                </View>
            )}

            {/* Trigger — same style as SharedInput and OptionPicker */}
            <Pressable
                style={[styles.trigger, show && styles.triggerOpen]}
                onPress={() => setShow(true)}
            >
                <Text style={value ? styles.triggerText : styles.triggerPlaceholder}>
                    {displayValue}
                </Text>
                <CalendarBlankIcon size={16} color={colors.textMuted} weight="fill"/>
            </Pressable>

            {/* Picker — only shown when show is true */}
            {show && (
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
    labelWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
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
        paddingHorizontal: 14,
        paddingVertical: 11,
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
        color: '#C8C0B4',
    },
});