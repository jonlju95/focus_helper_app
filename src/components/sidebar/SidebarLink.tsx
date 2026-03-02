import {Dimensions, Pressable, StyleSheet, Text, View} from "react-native";
import {JSX} from "react";
import {
    ArrowRightIcon,
    BellRingingIcon,
    CoinsIcon,
    ExportIcon,
    InfoIcon,
    TagIcon,
    UserIcon
} from "phosphor-react-native";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import colors from "@/constants/colors";

type IconName = 'profile' | 'coins' | 'notifications' | 'categories' | 'export' | 'about';

interface SidebarLinkProps {
    icon: IconName;
    color: string;
    bg: string;
    title: string;
    subtitle: string;
    onPress: () => void;
}

const ICONS: Record<IconName, (props: { size: number; color: string; }) => JSX.Element> = {
    profile: (props) => <UserIcon {...props}/>,
    coins: (props) => <CoinsIcon {...props}/>,
    notifications: (props) => <BellRingingIcon {...props}/>,
    categories: (props) => <TagIcon {...props}/>,
    export: (props) => <ExportIcon {...props}/>,
    about: (props) => <InfoIcon {...props}/>,
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.82;

function SidebarLink({icon, color, bg, title, subtitle, onPress}: SidebarLinkProps) {
    const IconComponent = ICONS[icon];

    return (
        <Pressable style={styles.linkBody} onPress={onPress}>
            <View style={[styles.iconBody, { backgroundColor: bg }]}>
                <IconComponent
                    size={18}
                    color={color}/>
            </View>
            <View style={styles.linkContent}>
                <Text style={styles.linkContentTitle}>{title}</Text>
                <Text style={styles.linkContentSubtitle}>{subtitle}</Text>
            </View>
            <ArrowRightIcon size={15} color={'#C8C0B4'} weight={'bold'}/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    linkBody: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing[3],
        width: SIDEBAR_WIDTH - (SCREEN_WIDTH - SIDEBAR_WIDTH),
    },
    iconBody: {
        padding: spacing[2],
        borderRadius: spacing[3],
        alignItems: 'center',
        justifyContent: 'center',
    },
    linkContent: {
        gap: 2,
        marginLeft: spacing[3],
        flex: 1
    },
    linkContentTitle: {
        fontSize: 14,
        fontFamily: `${typography.fonts.heading}_800`,
        color: colors.textPrimary,
    },
    linkContentSubtitle: {
        fontSize: 11,
        fontFamily: `${typography.fonts.heading}_600`,
        color: colors.textMuted,
    },
})

export default SidebarLink;