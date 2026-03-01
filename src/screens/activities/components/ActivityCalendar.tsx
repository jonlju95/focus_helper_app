import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import OptionPicker from "@/components/ui/OptionPicker";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import colors from "@/constants/colors";
import {months, years} from "@/screens/activities/data/dates";

interface CalendarProps {
    markedDates?: string[];
    onDaySelect: (date: Date) => void;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// ── Pure helpers — outside component ──────────────────────
const getDaysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();

const getPrevMonthDays = (month: number, year: number) =>
    new Date(year, month, 0).getDate();

const getFirstDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
};

function ActivityCalendar({markedDates = [], onDaySelect}: CalendarProps) {
    const [selectedYear, setSelectedYear] = useState<string>(years[1].value);
    const [selectedMonth, setSelectedMonth] = useState<string>(months[new Date().getMonth()].value);
    const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());

    const year = parseInt(selectedYear);
    const monthIndex = months.findIndex(m => m.value === selectedMonth);
    const today = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const daysInMonth = getDaysInMonth(monthIndex, year);
    const firstDay = getFirstDayOfMonth(monthIndex, year);
    const prevMonthDays = getPrevMonthDays(monthIndex, year);

    const cells: { day: number; currentMonth: boolean }[] = [
        ...Array.from({length: firstDay}, (_, i) => ({
            day: prevMonthDays - firstDay + i + 1,
            currentMonth: false,
        })),
        ...Array.from({length: daysInMonth}, (_, i) => ({
            day: i + 1,
            currentMonth: true,
        })),
    ];

    let nextDay = 1;
    while (cells.length % 7 !== 0) {
        cells.push({day: nextDay++, currentMonth: false});
    }

    const markedSet = new Set(
        markedDates.map(d => {
            const date = new Date(d);
            return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        })
    );


    const changeMonth = (value: string) => {
        setSelectedMonth(value);
        setSelectedDay(null);
    };

    const changeYear = (value: string) => {
        setSelectedYear(value);
        setSelectedDay(null);
    };

    return (
        <View style={styles.card}>

            {/* Month + Year pickers */}
            <View style={styles.cardInputs}>
                <View style={{flex: 1}}>
                    <OptionPicker
                        options={months}
                        value={selectedMonth}
                        showLabel={false}
                        onChange={changeMonth}
                    />
                </View>
                <OptionPicker
                    options={years}
                    value={selectedYear}
                    showLabel={false}
                    onChange={changeYear}
                />
            </View>

            {/* Day name headers */}
            <View style={styles.calendarDaysRow}>
                {DAYS.map(day => (
                    <Text key={day} style={styles.calendarDays}>{day}</Text>
                ))}
            </View>

            {/* Day grid */}
            <View style={styles.grid}>
                {Array.from({length: cells.length / 7}, (_, rowIndex) => (
                    <View key={rowIndex} style={styles.gridRow}>
                        {cells.slice(rowIndex * 7, rowIndex * 7 + 7).map((cell, colIndex) => {
                            const isToday = (
                                cell.day === today &&
                                monthIndex === currentMonth &&
                                year === currentYear &&
                                cell.currentMonth
                            );
                            const isSelected = cell.day === selectedDay && cell.currentMonth;

                            const isMarked = cell.currentMonth && markedSet.has(
                                `${year}-${monthIndex}-${cell.day}`
                            );

                            return (
                                <Pressable
                                    key={colIndex}
                                    style={styles.dayCell}
                                    onPress={() => {
                                        cell.currentMonth && setSelectedDay(cell.day);
                                        onDaySelect(new Date(new Date(Number(selectedYear), Number(selectedMonth), cell.day).toLocaleDateString()))
                                    }}
                                >
                                    <View style={[
                                        styles.dayNumber,
                                        isToday && styles.dayToday,
                                        isSelected && styles.daySelected,
                                    ]}>
                                        <Text style={[
                                            styles.dayText,
                                            !cell.currentMonth && styles.dayMuted,
                                            isToday && styles.dayTodayText,
                                            isSelected && styles.daySelectedText,
                                        ]}>
                                            {cell.day}
                                        </Text>
                                    </View>
                                    {isMarked && !isSelected && (
                                        <View style={[
                                            styles.dot,
                                            isToday && styles.dotToday,
                                        ]}/>)}
                                </Pressable>
                            );
                        })}
                    </View>
                ))}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: spacing[4],
        padding: spacing[4],
    },
    cardInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        marginBottom: spacing[2],
        gap: spacing[3],
    },
    yearText: {
        fontSize: typography.sizes['3xl'],
        fontFamily: `${typography.fonts.heading}_900`,
        color: colors.textPrimary,
    },
    calendarDaysRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    calendarDays: {
        paddingTop: spacing[1],
        paddingBottom: spacing[2],
        fontSize: 11,
        fontFamily: `${typography.fonts.heading}_800`,
        textAlign: 'center',
        color: colors.textMuted,
        flex: 1
    },
    grid: {
        alignSelf: 'stretch',
        gap: spacing[1],
    },
    gridRow: {
        flexDirection: 'row',
    },
    dayCell: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: spacing[1],
    },
    dayNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayText: {
        fontSize: typography.sizes.md,
        fontFamily: `${typography.fonts.heading}_600`,
        color: colors.textPrimary,
    },
    dayToday: {
        backgroundColor: colors.primaryLight,
        borderRadius: 16,
    },
    dayTodayText: {
        color: colors.primary,
        fontFamily: `${typography.fonts.heading}_800`,
    },
    daySelected: {
        backgroundColor: colors.primary,
        borderRadius: 16,
    },
    daySelectedText: {
        color: '#ffffff',
        fontFamily: `${typography.fonts.heading}_800`,
        borderRadius: 16,

    },
    dayMuted: {
        color: colors.textMuted,
        opacity: 0.4,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: colors.primary,
        position: 'absolute',
        bottom: 8,
    },
    dotToday: {
        backgroundColor: colors.primary,

    },

})

export default ActivityCalendar;