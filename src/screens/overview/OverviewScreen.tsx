import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import TopBar from "@/components/ui/TopBar";
import AlertStrip from "@/components/ui/AlertStrip";
import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import {sharedStyles} from "@/constants/sharedStyles";
import {
    ArrowRightIcon,
    BasketIcon,
    BellIcon,
    CalendarBlankIcon,
    LightningIcon,
    ListChecksIcon,
    PhoneIcon,
    PillIcon,
    ShoppingCartIcon,
    WarningIcon
} from "phosphor-react-native";
import typography from "@/constants/typography";
import {LinearGradient} from "expo-linear-gradient";
import SectionLabel from "@/components/ui/SectionLabel";
import StatCard from "@/components/ui/StatCard";
import QuickAddButton from "@/screens/overview/components/QuickAddButton";
import React from "react";
import DailyCards from "@/screens/overview/components/DailyCards";
import {useSQLiteContext} from "expo-sqlite";
import {useDrizzleStudio} from "expo-drizzle-studio-plugin";

export default function OverviewScreen() {
    const testDB = useSQLiteContext();

    useDrizzleStudio(testDB);

    return (
        <View style={sharedStyles.container}>
            <TopBar title={'Good morning, Wednesday'} date={'Feb 24, 2026'} showDate={true}/>
            <ScrollView style={sharedStyles.scroll}
                        contentContainerStyle={sharedStyles.scrollContent}
                        showsVerticalScrollIndicator={false}>
                <AlertStrip left={{
                    icon: 'warning',
                    iconColor: colors.urgent,
                    iconBg: colors.urgentLight,
                    label: 'Upcoming invoices',
                    value: '6',
                }} right={{
                    icon: 'bell',
                    iconColor: colors.warning,
                    iconBg: colors.warningLight,
                    label: 'Upcoming reminders',
                    value: '2',
                }}/>

                {/* Hero card section */}
                <View style={sharedStyles.section}>
                    {/* Label */}
                    <SectionLabel icon={<LightningIcon size={13} color={colors.textMuted} weight="fill"/>
                    } label={'Most urgent today'}/>

                    {/* Card */}
                    <LinearGradient
                        colors={[colors.primary, colors.primaryDark]}
                        start={{x: 0.2, y: 1}}
                        end={{x: 0.8, y: 0}}
                        style={sharedStyles.card}>
                        <View style={styles.heroCardCircle}/>

                        {/*/!* Type badge *!/*/}
                        <View style={[sharedStyles.row, styles.heroCardLabel]}>
                            <WarningIcon size={13} color="rgba(255,255,255,0.7)" weight="fill"/>
                            <Text style={[typography.styles.sectionLabel, {color: 'rgba(255,255,255,0.7)'}]}>
                                Invoice due soon</Text>
                        </View>

                        {/*/!* Title *!/*/}
                        <Text style={[typography.styles.pageTitle, {color: 'white', marginBottom: spacing[1]}]}>Electricity
                            bill</Text>

                        {/*/!* Subtitle *!/*/}
                        <Text style={[typography.styles.metaText, styles.heroCardMeta]}>Due in 2 days · 1 340 kr</Text>

                        {/*/!* Action button *!/*/}
                        <Pressable
                            style={({pressed}) => [sharedStyles.row, styles.heroCardBtn, pressed && styles.pressed]}>
                            <Text style={typography.styles.btnText}>Mark as paid</Text>
                            <ArrowRightIcon size={14} color={colors.bgCard} weight="bold"/>
                        </Pressable>
                    </LinearGradient>
                </View>

                {/* Budget card section */}
                <View style={sharedStyles.section}>
                    {/* Label */}
                    <SectionLabel icon={<ShoppingCartIcon size={13} color={colors.textMuted} weight="fill"/>
                    } label={'This month'}/>

                    <View style={[sharedStyles.row, {gap: spacing[3]}]}>
                        <StatCard
                            variant="dark"
                            icon={<ShoppingCartIcon size={13} color="rgba(255,255,255,0.5)" weight="fill"/>}
                            label="Spent this month"
                            amount="8 830"
                            currency="kr"
                        />
                        <StatCard
                            variant="light"
                            icon={<ListChecksIcon size={13} color={colors.textMuted} weight="bold"/>}
                            label="Budget remaining"
                            amount="5 436"
                            currency="kr"
                            progress={0.62}
                        />
                    </View>
                </View>

                {/* Quick add section */}
                <View style={sharedStyles.section}>
                    <View style={sharedStyles.card}>
                        <Text style={typography.styles.cardTitle}>Quick add</Text>
                        <View style={[sharedStyles.row, styles.sectionBody]}>
                            <QuickAddButton
                                icon={<BellIcon size={20} color={colors.primary} weight={'fill'}/>}
                                iconBg={colors.primaryLight}
                                label={'Reminder'}
                            />
                            <QuickAddButton
                                icon={<CalendarBlankIcon size={20} color={colors.info} weight={'fill'}/>}
                                iconBg={colors.infoLight}
                                label={'Activity'}
                            />
                            <QuickAddButton
                                icon={<ShoppingCartIcon size={20} color={colors.success} weight={'fill'}/>}
                                iconBg={colors.successLight}
                                label={'Expense'}
                            />
                        </View>
                    </View>
                </View>

                {/* Daily reminders */}
                <View style={sharedStyles.section}>

                    {/* Badge */}
                    <SectionLabel icon={<BellIcon size={16} color={colors.textMuted} weight="fill"/>}
                                  label={'Reminders today'}
                                  right={<>
                                      <Text style={typography.styles.label}>See all</Text>
                                      <ArrowRightIcon size={12} color={colors.primary} weight="bold"/>
                                  </>}/>

                    <View style={{gap: spacing[3]}}>
                        <DailyCards icon={<PillIcon size={18} color={colors.primary} weight={"fill"}/>}
                                    iconBg={colors.primaryLight}
                                    title={'Take medication'} time={'8:00 AM'} urgent={true}/>
                        <DailyCards icon={<PhoneIcon size={18} color={colors.info} weight={"fill"}/>}
                                    iconBg={colors.infoLight}
                                    title={'Call the dentist'} time={'10:30 AM'}/>
                        <DailyCards icon={<BasketIcon size={18} color={colors.success} weight={"fill"}/>}
                                    iconBg={colors.successLight}
                                    title={'Grocery run'} time={'3:00 PM'}/>
                    </View>
                </View>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    heroCardCircle: {
        position: 'absolute',
        top: -20,
        right: -20,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,0.08)',
    },

    heroCardLabel: {
        gap: spacing[1],
        borderRadius: spacing[5],
        marginBottom: spacing[2],
    },

    heroCardMeta: {
        color: 'rgba(255,255,255,0.75)',
        marginBottom: 16,
    },

    heroCardBtn: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderColor: 'rgba(255,255,255,0.4)',
        borderWidth: 1.5,
        gap: spacing[2],
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[2],
        borderRadius: spacing[5],
    },
    pressed: {
        opacity: 0.85,
    },

    sectionBody: {
        justifyContent: 'space-between',
        marginTop: spacing[3],
        gap: spacing[3]
    }
});