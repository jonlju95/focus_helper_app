import {JSX} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BellIcon, CoinIcon, ReceiptIcon, WarningIcon,} from 'phosphor-react-native';
import colors from '@/constants/colors';

type IconName = 'warning' | 'bell' | 'coin' | 'receipt';

interface AlertItem {
    icon: IconName;
    iconColor: string;
    iconBg: string;
    label: string;
    value: string;
    valueColor?: string;
}

interface AlertStripProps {
    left: AlertItem;
    right: AlertItem;
}

const ICONS: Record<IconName, (props: { size: number; color: string; weight: 'fill' | 'regular' }) => JSX.Element> = {
    warning: (props) => <WarningIcon {...props} />,
    bell: (props) => <BellIcon          {...props} />,
    coin: (props) => <CoinIcon          {...props} />,
    receipt: (props) => <ReceiptIcon       {...props} />,
};

function AlertStrip({left, right}: AlertStripProps) {
    return (
        <View style={styles.container}>
            <AlertItem item={left}/>
            <View style={styles.divider}/>
            <AlertItem item={right}/>
        </View>
    );
}

function AlertItem({item}: { item: AlertItem }) {
    const IconComponent = ICONS[item.icon];

    return (
        <View style={styles.item}>
            {/* Icon bubble */}
            <View style={[styles.iconWrap, {backgroundColor: item.iconBg}]}>
                <IconComponent size={17} color={item.iconColor} weight="fill"/>
            </View>

            {/* Label — two lines, small text */}
            <Text style={styles.label}>{item.label}</Text>

            {/* Value — big bold number on the right */}
            <Text style={[styles.value, {color: item.valueColor ?? item.iconColor}]}>
                {item.value}
            </Text>
        </View>
    );
}

// ── Styles ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        backgroundColor: '#fff3e8',
        borderWidth: 1.5,
        borderColor: colors.borderWarm,
        borderRadius: 16,
        padding: 12,
        gap: 16,
    },

    divider: {
        width: 1,
        alignSelf: 'stretch',
        backgroundColor: colors.borderWarm,
        marginHorizontal: 4,
    },

    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    iconWrap: {
        width: 30,
        height: 30,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },

    label: {
        flex: 1,
        fontSize: 12,
        fontFamily: 'NunitoSans_600',
        color: '#7a5a3a',
        lineHeight: 16,
    },

    value: {
        fontSize: 22,
        fontFamily: 'Nunito_900',
    },
});

export default AlertStrip;