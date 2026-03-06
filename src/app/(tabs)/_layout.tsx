import {useEffect, useState} from 'react';
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
import {Text, View} from 'react-native';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {tabBarConfig} from '@/components/navigation/tabBarConfig';
import colors from '@/constants/colors';
import {SidebarProvider} from '@/context/SidebarContext';
import Sidebar from '@/components/sidebar/Sidebar';
import {db, expoDb, migrations} from '@/db/database';
import {backupDatabase} from "@/utils/backupDatabase";
import {setBackgroundColorAsync} from "expo-system-ui";
import {migrate} from 'drizzle-orm/expo-sqlite/migrator';
import {useDrizzleStudio} from "expo-drizzle-studio-plugin";

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
    const [migrationsReady, setMigrationsReady] = useState(false);
    const [migrationError, setMigrationError] = useState<Error | null>(null);

    useDrizzleStudio(expoDb)

// Run migrations once on mount only
    useEffect(() => {
        migrate(db, migrations)
            .then(() => {
                expoDb.execSync('PRAGMA foreign_keys = ON;');
                setMigrationsReady(true);
            })
            .catch((e) => {
                console.error('Migration failed:', JSON.stringify(e));
                console.error('Message:', e.message);
                console.error('Cause:', e.cause);
                setMigrationError(e);
            });
    }, []); // <-- empty deps, runs once

// Handle fonts and backup separately
    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
            setBackgroundColorAsync('#fff');
            backupDatabase().catch(err => console.warn('Backup failed:', err));
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) return null;
    if (!migrationsReady && !migrationError) return null;

    if (migrationError) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Migration error: {migrationError.message}</Text>
            </View>
        );
    }

    return (
        <SidebarProvider>
            <StatusBar style="dark" backgroundColor="transparent"/>
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
    );
}
