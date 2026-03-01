import {useEffect} from 'react';
import {Tabs} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
    useFonts,
} from '@expo-google-fonts/nunito';
import {NunitoSans_400Regular, NunitoSans_600SemiBold,} from '@expo-google-fonts/nunito-sans';
import {DefaultTheme, ThemeProvider} from '@react-navigation/native';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {tabBarConfig} from '@/components/navigation/tabBarConfig';
import colors from '@/constants/colors';

SplashScreen.preventAutoHideAsync();

const AppTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: colors.bgApp,
        card: colors.bgApp,
    },
};

export default function RootLayout() {
    const [fontsLoaded, fontError] = useFonts({
        Nunito_400: Nunito_400Regular,
        Nunito_600: Nunito_600SemiBold,
        Nunito_700: Nunito_700Bold,
        Nunito_800: Nunito_800ExtraBold,
        Nunito_900: Nunito_900Black,
        NunitoSans_400: NunitoSans_400Regular,
        NunitoSans_600: NunitoSans_600SemiBold,
    });

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) return null;

    return (
        <>
            <StatusBar style="dark" backgroundColor={colors.bgApp}/>
            <ThemeProvider value={AppTheme}>
                <Tabs screenOptions={tabBarConfig}>

                    <Tabs.Screen
                        name="index"
                        options={{
                            title: 'Overview',
                            tabBarIcon: ({color, focused}) => (
                                <TabBarIcon icon="house" color={color} focused={focused}/>
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name="reminders"
                        options={{
                            title: 'Reminders',
                            tabBarIcon: ({color, focused}) => (
                                <TabBarIcon icon="bell" color={color} focused={focused}/>
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name="activities"
                        options={{
                            title: 'Activities',
                            tabBarIcon: ({color, focused}) => (
                                <TabBarIcon icon="calendar" color={color} focused={focused}/>
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name="expenses"
                        options={{
                            title: 'Expenses',
                            tabBarIcon: ({color, focused}) => (
                                <TabBarIcon icon="cart" color={color} focused={focused}/>
                            ),
                        }}
                    />

                </Tabs>
            </ThemeProvider>
        </>
    );
}