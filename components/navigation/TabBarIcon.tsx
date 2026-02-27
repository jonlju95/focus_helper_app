import {StyleSheet, View} from 'react-native';
import colors from '@/constants/colors';
import {JSX} from "react";
import {BellIcon, CalendarBlankIcon, HouseIcon, ShoppingCartIcon} from "phosphor-react-native";

type IconName = 'house' | 'bell' | 'calendar' | 'cart';

interface TabBarIconProps {
    icon: IconName;
    color: string;
    focused: boolean;
}

const ICONS: Record<IconName, (props: { size: number; color: string; weight: 'fill' | 'regular' }) => JSX.Element> = {
    house: (props) => <HouseIcon           {...props} />,
    bell: (props) => <BellIcon            {...props} />,
    calendar: (props) => <CalendarBlankIcon   {...props} />,
    cart: (props) => <ShoppingCartIcon    {...props} />,
};

// ── Component ─────────────────────────────────────────────────────────────
export function TabBarIcon({icon, color, focused}: TabBarIconProps): JSX.Element {
    const IconComponent = ICONS[icon];

    return (
        <View style={[styles.wrap, focused && styles.wrapActive]}>
            <IconComponent
                size={22}
                color={color}
                weight={focused ? 'fill' : 'regular'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: {
        width: 44,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
    },

    wrapActive: {
        backgroundColor: colors.primaryLight,   // warm pill background
    },
});