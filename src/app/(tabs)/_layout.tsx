import {Suspense, useEffect} from 'react';
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
import {SidebarProvider} from "@/context/SidebarContext";
import Sidebar from "@/components/sidebar/Sidebar";
import {ActivityIndicator} from "react-native";
import {openDatabaseSync, SQLiteProvider} from "expo-sqlite";
import {useMigrations} from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../../../drizzle/migrations";
import {drizzle} from "drizzle-orm/expo-sqlite/driver";

SplashScreen.preventAutoHideAsync();

const AppTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: colors.bgApp,
        card: colors.bgApp,
    },
};

export const DATABASE_NAME = 'focus_helper'

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

    const expoDb = openDatabaseSync(DATABASE_NAME);
    const db = drizzle(expoDb);
    const {success, error} = useMigrations(db, migrations)

    useEffect(() => {
        if (success) {
        }
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError, success]);

    if (!fontsLoaded && !fontError) return null;


    return (
        <Suspense fallback={<ActivityIndicator size={'large'}/>}>
            <SQLiteProvider databaseName={DATABASE_NAME} options={{enableChangeListener: true}} useSuspense>
                <SidebarProvider>
                    <StatusBar style="dark" backgroundColor={'transparent'}/>
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
                        <Sidebar/>
                    </ThemeProvider>
                </SidebarProvider>
            </SQLiteProvider>
        </Suspense>
    );
}