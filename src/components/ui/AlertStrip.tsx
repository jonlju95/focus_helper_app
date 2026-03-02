import {JSX} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BellIcon, CoinsIcon, ReceiptIcon, WarningIcon,} from 'phosphor-react-native';
import colors from '@/constants/colors';
import spacing from "@/constants/spacing";
import {sharedStyles} from "@/constants/sharedStyles";
import typography from "@/constants/typography";

type IconName = 'warning' | 'bell' | 'coin' | 'receipt';

interface AlertItem {
    icon: IconName;
    iconColor: string;
    iconBg: string;
    label: string;
    value: string;
    valueColor?: string;
    stacked?: boolean;
}

interface AlertStripProps {
    left: AlertItem;
    right: AlertItem;
}

const ICONS: Record<IconName, (props: { size: number; color: string; weight: 'fill' | 'regular' }) => JSX.Element> = {
    warning: (props) => <WarningIcon {...props} />,
    bell: (props) => <BellIcon          {...props} />,
    coin: (props) => <CoinsIcon          {...props} />,
    receipt: (props) => <ReceiptIcon       {...props} />,
};

function AlertStrip({left, right}: AlertStripProps) {
    return (
        <View style={[styles.section, sharedStyles.row]}>
            <AlertItem item={left}/>
            <View style={styles.divider}/>
            <AlertItem item={right}/>
        </View>
    );
}

function AlertItem({item}: { item: AlertItem }) {
    const IconComponent = ICONS[item.icon];

    item.stacked = item.stacked ?? false;

    return (
        <View style={[styles.body, sharedStyles.row]}>
            {/* Icon bubble */}
            <View style={[styles.bodyIcon, {backgroundColor: item.iconBg}]}>
                <IconComponent size={17} color={item.iconColor} weight="fill"/>
            </View>

            {/*(!item.expenseScreen && { flexDirection: 'row'})*/}
            <View style={item.stacked ? styles.textCol : [styles.textRow, sharedStyles.row]}>

                {/* Label — two lines, small text */}
                <Text style={[typography.styles.metaText, styles.bodyLabel]}>{item.label}</Text>

                {/* Value — big bold number on the right */}
                <Text
                    style={[typography.styles.amount, {color: item.valueColor ?? item.iconColor}, item.stacked && {fontSize: 16}]}>
                    {item.value}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        backgroundColor: '#fff3e8',
        borderWidth: 1.5,
        borderColor: colors.borderWarm,
        borderRadius: spacing[4],
        padding: spacing[3],
        gap: spacing[4],
    },

    divider: {
        width: 1,
        alignSelf: 'stretch',
        backgroundColor: colors.borderWarm,
        marginHorizontal: 4,
    },

    body: {
        flex: 1,
        gap: spacing[2],
    },

    bodyIcon: {
        width: 30,
        height: 30,
        borderRadius: spacing[2],
        alignItems: 'center',
        justifyContent: 'center',
    },

    textRow: {
        flex: 1,
        justifyContent: 'space-between',
    },

    textCol: {
        flex: 1,
        flexDirection: 'column',
        gap: 2,
    },

    bodyLabel: {
        flex: 1,
        color: '#7a5a3a',
    },
});

export default AlertStrip;