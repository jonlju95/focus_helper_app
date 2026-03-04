import {useEffect, useRef} from 'react';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import colors from '@/constants/colors';
import typography from "@/constants/typography";
import {sharedStyles} from "@/constants/sharedStyles";
import spacing from "@/constants/spacing";

interface ToggleProps {
    value: boolean;
    onChange: (value: boolean) => void;
    color?: string;
    label?: string;
    showLabel?: boolean;
}

function ToggleButton({value, onChange, color = colors.primary, showLabel = true, label}: ToggleProps) {
    const positionAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(positionAnim, {
            toValue: value ? 1 : 0,
            duration: 250,
            useNativeDriver: false,  // false because we animate backgroundColor too
        }).start();
    }, [value]);

    const bgColor = positionAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#CEC4B7', color],
    });

    const thumbPosition = positionAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 24],
    });

    return (
        <View style={{flex: 1}}>
            {showLabel && (
                <View style={[styles.header, sharedStyles.row]}>
                    <Text style={typography.styles.label}>{label}</Text>
                </View>
            )}

            <View style={{flex: 1, justifyContent: 'center'}}>
                <Pressable onPress={() => onChange(!value)}>
                    <Animated.View style={[styles.track, {backgroundColor: bgColor}]}>
                        <Animated.View
                            style={[
                                styles.thumb,
                                {transform: [{translateX: thumbPosition}]}
                            ]}
                        />
                    </Animated.View>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        gap: 2,
        marginBottom: spacing[1],
    },
    track: {
        // Positioning
        justifyContent: 'center',

        // Size
        width: 52,
        height: 28,
        padding: 3,

        // Other
        borderRadius: 14,
    },
    thumb: {
        // Size
        width: 22,
        height: 22,

        // Colors
        backgroundColor: '#ffffff',

        // Other
        borderRadius: 12,

        // Box shadow
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
});

export default ToggleButton;