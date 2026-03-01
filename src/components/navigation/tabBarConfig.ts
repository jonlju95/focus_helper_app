import { Platform } from 'react-native';
import colors from '@/constants/colors';

const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 88 : 72;

export const tabBarConfig = {
    headerShown: false,

    tabBarActiveTintColor:   colors.primary,
    tabBarInactiveTintColor: colors.textMuted,

    tabBarHideOnKeyboard: true,

    sceneStyle: { backgroundColor: colors.bgScreen },

    tabBarStyle: {
        backgroundColor: '#ffffff',
        borderTopColor:  colors.border,
        borderTopWidth:  1,
        height:          TAB_BAR_HEIGHT,
        paddingTop:      12,
        paddingBottom: Platform.select({ ios: 24, android: 12 }),

        // Box shadow
        elevation:     8,
        shadowColor:   '#000',
        shadowOffset:  { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius:  8,
    },

    tabBarLabelStyle: {
        fontSize:    10,
        fontFamily:  'NunitoSans_600',
        marginTop:   2,
    },
} as const;
