// components/navigation/TabBarIcon.tsx
//
// This is a standard React functional component — identical concept to web React.
// Props interface, destructuring, conditional styles — all the same.
// The only RN-specific parts are View/StyleSheet instead of div/CSS.

import {StyleSheet, View} from 'react-native';
import colors from '@/constants/colors';
import {JSX} from "react";
import {BellIcon, CalendarBlankIcon, HouseIcon, ShoppingCartIcon} from "phosphor-react-native";
import * as Svg from "react-native-svg";
import {Ionicons} from "@expo/vector-icons";
import { Circle, Rect } from "react-native-svg";

// ── Types ──────────────────────────────────────────────────────────────────
// Defines which icon names are valid. Keeping this as a union type means
// TypeScript will warn you if you typo an icon name — same as web React.
type IconName = 'house' | 'bell' | 'calendar' | 'cart';

interface TabBarIconProps {
    icon: IconName;
    color: string;   // passed in by Expo Router (active vs inactive color)
    focused: boolean;  // passed in by Expo Router (is this tab selected?)
}

// ── Icon map ───────────────────────────────────────────────────────────────
// Maps string names to Phosphor components.
// This pattern avoids a big if/else or switch — you'll use it a lot in RN
// when mapping data to components (same as in web React).
//
// The `weight` prop is Phosphor-specific — it handles filled vs outline
// variants in one component, unlike many icon libraries that ship
// separate filled/outline imports.
const ICONS: Record<IconName, (props: { size: number; color: string; weight: 'fill' | 'regular' }) => JSX.Element> = {
    house: (props) => <HouseIcon           {...props} />,
    bell: (props) => <BellIcon            {...props} />,
    calendar: (props) => <CalendarBlankIcon   {...props} />,
    cart: (props) => <ShoppingCartIcon    {...props} />,
};

// ── Component ─────────────────────────────────────────────────────────────
export function TabBarIcon({icon, color, focused}: TabBarIconProps): JSX.Element {
    const IconComponent = ICONS[icon];

    // Array style syntax — React Native's way of merging styles conditionally.
    // Equivalent to the web pattern: className={`base ${focused ? 'active' : ''}`}
    // The second item is only applied when focused is true.
    // False/undefined entries in the array are safely ignored by RN.
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

// ── Styles ─────────────────────────────────────────────────────────────────
// StyleSheet.create gives you two things over plain objects:
//   1. Validation — RN will warn you about invalid style props in dev mode
//   2. Performance — styles are registered once and referenced by ID
//      rather than creating new objects on every render
//
// Notice there's no 'px', no 'em', no units at all.
// RN uses density-independent pixels (dp) automatically,
// so your layout looks the same physical size on all screen densities.
const styles = StyleSheet.create({
    wrap: {
        width: 44,
        height: 36,
        alignItems: 'center',    // horizontal centering (flex default is column)
        justifyContent: 'center',    // vertical centering
        borderRadius: 14,
    },

    // This style is MERGED onto wrap when focused === true (see array syntax above)
    wrapActive: {
        backgroundColor: colors.primaryLight,   // warm pill background
    },
});