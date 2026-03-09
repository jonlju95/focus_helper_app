import {Tabs} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {DefaultTheme, ThemeProvider} from '@react-navigation/native';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {tabBarConfig} from '@/components/navigation/tabBarConfig';
import colors from '@/constants/colors';
import {SidebarProvider} from '@/context/SidebarContext';
import Sidebar from '@/screens/sidebar/components/Sidebar';
import {UserSettingsProvider} from "@/context/UserSettingsContext";

const AppTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: colors.bgApp,
        card: colors.bgApp,
    },
};

export default function RootLayout() {
    return (
        <UserSettingsProvider>
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
        </UserSettingsProvider>
    );
}
