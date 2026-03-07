import {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import colors from '@/constants/colors';
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";

interface ProgressBarProps {
    progress: number;
    showLabel?: boolean;
    completed?: number;
    total?: number;
    height?: number;
    color?: string;
    trackColor?: string;
}

export default function ProgressBar({
    progress,
    showLabel = false,
    completed = 0,
    total = 0,
    height = 6,
    color = colors.primary,
    trackColor = '#f0ebe4',
}: ProgressBarProps) {
    const widthAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(widthAnim, {
            toValue: progress * 100,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [progress, widthAnim]);

    return (
        <>
            <View style={[styles.track, {height, backgroundColor: trackColor}]}>
                <Animated.View
                    style={[
                        styles.fill,
                        {
                            height,
                            backgroundColor: color,
                            width: widthAnim.interpolate({
                                inputRange: [0, 100],
                                outputRange: ['0%', '100%'],
                            }),
                        },
                    ]}
                />
            </View>

            {showLabel && (
                <View style={styles.label}>
                    <Text style={[typography.styles.amount, {color}]}>{completed}</Text>
                    <Text style={styles.labelTotal}>/{total}</Text>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    track: {
        borderRadius: spacing[1],
        overflow: 'hidden',
        backgroundColor: '#f0ebe4',
    },
    fill: {
        borderRadius: 4,
    },
    label: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginLeft: spacing[1]
    },

    labelTotal: {
        fontSize: 14,
        fontFamily: 'Nunito_900',
        color: colors.textMuted,
    },
});