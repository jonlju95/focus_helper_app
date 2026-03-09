import {Stack} from 'expo-router';
import {useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {migrate} from 'drizzle-orm/expo-sqlite/migrator';
import {db, expoDb, migrations} from '@/db/database';
import {setBackgroundColorAsync} from 'expo-system-ui';
import {backupDatabase} from '@/utils/backupDatabase';
import {useDrizzleStudio} from "expo-drizzle-studio-plugin";
import {
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black, useFonts
} from "@expo-google-fonts/nunito";
import {NunitoSans_400Regular, NunitoSans_600SemiBold} from "@expo-google-fonts/nunito-sans";

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
    const [migrationsReady, setMigrationsReady] = useState(false);
    const [migrationError, setMigrationError] = useState<Error | null>(null);

    useDrizzleStudio(expoDb);

    useEffect(() => {
        migrate(db, migrations)
            .then(() => {
                expoDb.execSync('PRAGMA foreign_keys = ON;');
                setMigrationsReady(true);
            })
            .catch((e) => setMigrationError(e));
    }, []);

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
            setBackgroundColorAsync('#fff');
            backupDatabase().catch(err => console.warn('Backup failed:', err));
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) return null;
    if (!migrationsReady && !migrationError) return null;

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="reminders/new"
                          options={{presentation: 'modal', headerShown: false, animation: 'fade_from_bottom'}}/>
            <Stack.Screen name="expenses/new"
                          options={{presentation: 'modal', headerShown: false, animation: 'fade_from_bottom'}}/>
            <Stack.Screen name="activities/new"
                          options={{presentation: 'modal', headerShown: false, animation: 'fade_from_bottom'}}/>
        </Stack>
    );
}