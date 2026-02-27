import {useEffect} from 'react';
import {Tabs} from 'expo-router';
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

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {tabBarConfig} from '@/components/navigation/tabBarConfig';
import {StatusBar} from "react-native";
import colors from "@/constants/colors";
import {DefaultTheme, ThemeProvider} from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

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

    const AppTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: colors.bgScreen,   // this sets the nav container background
            card: colors.bgScreen,   // this sets the header/tab bar area
        },
    };

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={colors.bgApp}/>
            <ThemeProvider value={AppTheme}>
                <Tabs screenOptions={tabBarConfig}>

                    <Tabs.Screen
                        name="index"
                        options={{
                            title: 'Overview',
                            sceneStyle: {backgroundColor: colors.bgApp},
                            tabBarIcon: ({color, focused}) => (
                                <TabBarIcon icon="house" color={color} focused={focused}/>
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name="reminders"
                        options={{
                            title: 'Reminders',
                            sceneStyle: {backgroundColor: colors.bgApp},
                            tabBarIcon: ({color, focused}) => (
                                <TabBarIcon icon="bell" color={color} focused={focused}/>
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name="activities"
                        options={{
                            title: 'Activities',
                            sceneStyle: {backgroundColor: colors.bgApp},
                            tabBarIcon: ({color, focused}) => (
                                <TabBarIcon icon="calendar" color={color} focused={focused}/>
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name="expenses"
                        options={{
                            title: 'Expenses',
                            sceneStyle: {backgroundColor: colors.bgApp},
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