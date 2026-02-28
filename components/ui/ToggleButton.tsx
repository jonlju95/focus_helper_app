import {useEffect, useRef} from 'react';
import {Animated, Pressable, StyleSheet} from 'react-native';
import colors from '@/constants/colors';

interface ToggleProps {
    value: boolean;
    onChange: (value: boolean) => void;
    color?: string;
}

function ToggleButton({value, onChange, color = colors.primary}: ToggleProps) {
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
    );
}

const styles = StyleSheet.create({
    track: {
        width: 52,
        height: 28,
        borderRadius: 14,
        padding: 3,
        justifyContent: 'center',
    },
    thumb: {
        width: 22,
        height: 22,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
});

export default ToggleButton;