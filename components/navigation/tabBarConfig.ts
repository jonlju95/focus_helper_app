// components/navigation/tabBarConfig.ts
//
// This file exports a plain object — no JSX, no components.
// It just holds the visual configuration for the tab bar so
// _layout.tsx doesn't need to know about colors or spacing.
//
// In web React you might do this with a CSS file or a theme object.
// Here it's the same concept, just typed as a plain TS object.

import { Platform } from 'react-native';
import colors from '@/constants/colors';

// Platform is React Native's way of writing platform-specific values inline.
// Equivalent concept to CSS media queries but for iOS vs Android.
// Platform.OS returns 'ios' | 'android' | 'web'.
//
// We need it here because:
//   - iOS has a "safe area" at the bottom (the home indicator bar)
//     so we need more paddingBottom to avoid the icons sitting
//     right above it.
//   - Android doesn't have this, so less padding is needed.
const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 88 : 72;

export const tabBarConfig = {
    // Hides the default screen header on every tab screen.
    // We build our own top bar in each screen, so we don't want
    // the default one. Same concept as removing default browser
    // styles in web CSS.
    headerShown: false,

    // These are the active/inactive icon and label colors.
    // Expo Router passes these down to your tabBarIcon function
    // as the `color` prop — you don't set them per-icon.
    tabBarActiveTintColor:   colors.primary,
    tabBarInactiveTintColor: colors.textMuted,

    // Hide the tab bar when the keyboard is open —
    // otherwise it floats above the keyboard on Android.
    // No web equivalent, this is a RN-specific concern.
    tabBarHideOnKeyboard: true,

    tabBarStyle: {
        backgroundColor: '#ffffff',
        borderTopColor:  colors.border,
        borderTopWidth:  1,
        height:          TAB_BAR_HEIGHT,
        paddingTop:      12,
        // Platform.select is another way to write platform-specific values.
        // It's cleaner than a ternary when you have multiple props to split.
        // Here iOS gets more bottom padding for the home indicator.
        paddingBottom: Platform.select({ ios: 24, android: 12 }),

        // Android shadow uses a single `elevation` number.
        // iOS uses four separate shadow props (no shorthand like CSS box-shadow).
        // You typically set both so the shadow works on both platforms.
        elevation:     8,
        shadowColor:   '#000',
        shadowOffset:  { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius:  8,
    },

    tabBarLabelStyle: {
        fontSize:    10,
        // fontFamily references the font name you registered in useFonts().
        // The string must match exactly what you passed as the key there.
        fontFamily:  'NunitoSans_600',
        marginTop:   2,
    },
} as const;
// `as const` freezes the object so TypeScript treats each value as a
// literal type rather than a general string/number. Helps catch mistakes.
