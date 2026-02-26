// app/_layout.tsx
//
// This file has one job: tell Expo Router which files are tabs
// and which icon belongs to each. Nothing visual lives here.
//
// Think of it as the "router config" file. In web React you might
// compare it to your <Routes> setup in React Router — it maps
// paths to components, nothing more.

import { useEffect } from 'react';
import { Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {
    useFonts,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
} from '@expo-google-fonts/nunito';
import {
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
} from '@expo-google-fonts/nunito-sans';

import { TabBarIcon }   from '@/components/navigation/TabBarIcon';
import { tabBarConfig } from '@/components/navigation/tabBarConfig';

// Hold the splash screen until fonts are ready.
// Must be called before the component renders.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    // useFonts returns [loaded, error] — identical to any other
    // boolean state in React. The font names you set as keys here
    // are the strings you use in fontFamily throughout the app.
    const [fontsLoaded, fontError] = useFonts({
        Nunito_400: Nunito_400Regular,
        Nunito_600: Nunito_600SemiBold,
        Nunito_700: Nunito_700Bold,
        Nunito_800: Nunito_800ExtraBold,
        Nunito_900: Nunito_900Black,
        NunitoSans_400: NunitoSans_400Regular,
        NunitoSans_600: NunitoSans_600SemiBold,
    });

    // Hide the splash screen once fonts resolve (loaded or errored).
    // useEffect dependency array works exactly as in web React.
    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    // Render nothing while fonts load — splash screen covers it.
    if (!fontsLoaded && !fontError) return null;

    return (
        <Tabs screenOptions={tabBarConfig}>

            {/* Each Tabs.Screen maps a filename to a tab entry.
          `name` must match the filename in app/(tabs)/ exactly.
          In Expo Router, index.tsx = the first/default tab. */}

            <Tabs.Screen
                name="index"
                options={{
                    title: 'Overview',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon icon="house" color={color} focused={focused} />
                    ),
                }}
            />

            <Tabs.Screen
                name="reminders"
                options={{
                    title: 'Reminders',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon icon="bell" color={color} focused={focused} />
                    ),
                }}
            />

            <Tabs.Screen
                name="activities"
                options={{
                    title: 'Activities',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon icon="calendar" color={color} focused={focused} />
                    ),
                }}
            />

            <Tabs.Screen
                name="expenses"
                options={{
                    title: 'Expenses',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon icon="cart" color={color} focused={focused} />
                    ),
                }}
            />

        </Tabs>
    );
}