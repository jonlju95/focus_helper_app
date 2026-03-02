import React, {useEffect, useRef, useState} from 'react';
import {Animated, BackHandler, Dimensions, Pressable, StyleSheet} from 'react-native';
import {useSidebar} from '@/context/SidebarContext';
import SidebarMenu from '@/screens/sidebar/SidebarMenu';
import SidebarProfile from '@/screens/sidebar/SidebarProfile';
import SidebarBudget from '@/screens/sidebar/SidebarBudget';
import SidebarNotifications from '@/screens/sidebar/SidebarNotifications';
import SidebarCategories from '@/screens/sidebar/SidebarCategories';
import SidebarExport from '@/screens/sidebar/SidebarExport';
import SidebarAbout from '@/screens/sidebar/SidebarAbout';
import colors from '@/constants/colors';
import {SidebarPanel} from "@/types/sidebar";
import SidebarFooter from "@/components/sidebar/SidebarFooter";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.82;

export default function Sidebar() {
    const {isOpen, close} = useSidebar();

    const [activePanel, setActivePanel] = useState<SidebarPanel>('menu');

    const translateX = useRef(new Animated.Value(SCREEN_WIDTH)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    // Animate open/close
    useEffect(() => {
        Animated.parallel([
            Animated.timing(translateX, {
                toValue: isOpen ? SCREEN_WIDTH - SIDEBAR_WIDTH : SCREEN_WIDTH,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: isOpen ? 1 : 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, [isOpen]);

    // Reset to menu after close animation finishes
    useEffect(() => {
        if (!isOpen) {
            const timeout = setTimeout(() => setActivePanel('menu'), 300);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    // Android back button
    useEffect(() => {
        const handler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (isOpen) {
                if (activePanel !== 'menu') {
                    setActivePanel('menu');
                } else {
                    close();
                }
                return true;
            }
            return false;
        });
        return () => handler.remove();
    }, [isOpen, activePanel]);

    const renderContent = () => {
        switch (activePanel) {
            case 'menu':
                return <SidebarMenu onNavigate={setActivePanel}/>;
            case 'profile':
                return <SidebarProfile onBack={() => setActivePanel('menu')}/>;
            case 'budget':
                return <SidebarBudget onBack={() => setActivePanel('menu')}/>;
            case 'notifications':
                return <SidebarNotifications onBack={() => setActivePanel('menu')}/>;
            case 'categories':
                return <SidebarCategories onBack={() => setActivePanel('menu')}/>;
            case 'export':
                return <SidebarExport onBack={() => setActivePanel('menu')}/>;
            case 'about':
                return <SidebarAbout onBack={() => setActivePanel('menu')}/>;
        }
    };

    return (
        <>
            {/* Backdrop */}
            <Animated.View
                style={[styles.backdrop, {opacity}]}
                pointerEvents={isOpen ? 'auto' : 'none'}
            >
                <Pressable style={StyleSheet.absoluteFill} onPress={close}/>
            </Animated.View>

            {/* Panel */}
            <Animated.View style={[
                styles.sidebar,
                {transform: [{translateX}]}
            ]}>
                {renderContent()}
                <SidebarFooter/>
            </Animated.View>
        </>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 100,
        elevation: 100,
    },
    sidebar: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: SIDEBAR_WIDTH,
        backgroundColor: colors.bgApp,
        zIndex: 101,
        elevation: 101,
        shadowColor: '#000',
        shadowOffset: {width: -4, height: 0},
        shadowOpacity: 0.15,
        shadowRadius: 16,
    },
});