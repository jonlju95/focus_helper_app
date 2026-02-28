// components/ui/ProgressBar.tsx
import {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import colors from '@/constants/colors';

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
    }, [progress]);

    return (
        <View style={styles.wrapper}>
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
                    <Text style={[styles.labelCompleted, {color}]}>{completed}</Text>
                    <Text style={styles.labelTotal}>/{total}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        gap: 4,
    },
    track: {
        borderRadius: 4,
        overflow: 'hidden',
        backgroundColor: '#f0ebe4',
    },
    fill: {
        borderRadius: 4,
    },
    label: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    labelCompleted: {
        fontSize: 22,
        fontFamily: 'Nunito_900',
    },
    labelTotal: {
        fontSize: 14,
        fontFamily: 'Nunito_900',
        color: colors.textMuted,
    },
});