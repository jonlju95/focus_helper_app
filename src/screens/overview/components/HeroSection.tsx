import {Pressable, StyleSheet, Text, View} from "react-native";
import {ArrowRightIcon, LightningIcon, WarningIcon} from "phosphor-react-native";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {LinearGradient} from "expo-linear-gradient";
import spacing from "@/constants/spacing";

const {sizes, fonts} = typography;

export default function HeroSection() {
    return (
        <View style={styles.container}>
            {/* Label */}
            <View style={styles.sectionLabel}>
                <LightningIcon size={13} color={colors.textMuted} weight="fill"/>
                <Text style={typography.styles.sectionLabel}>Most urgent today</Text>
            </View>

            {/* Card */}
            <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.card}>
                <View style={styles.cardCircle}/>

                {/* Type badge */}
                <View style={styles.cardLabel}>
                    <WarningIcon size={13} color="rgba(255,255,255,0.7)" weight="fill"/>
                    <Text style={[typography.styles.sectionLabel, {color: 'rgba(255,255,255,0.7)'}]}>
                        Invoice due soon</Text>
                </View>

                {/* Title */}
                <Text style={styles.cardTitle}>Electricity bill</Text>

                {/* Subtitle */}
                <Text style={styles.cardSubtitle}>Due in 2 days · 1 340 kr</Text>

                {/* Action button */}
                <Pressable style={styles.cardButton}>
                    <Text style={styles.cardButtonText}>Mark as paid</Text>
                    <ArrowRightIcon size={14} color={colors.bgCard} weight="bold"/>
                </Pressable>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacing[3],
    },

    sectionLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[1],
    },

    card: {
        padding: spacing[5],
        paddingBottom: spacing[6],
        borderRadius: spacing[6],
    },

    cardCircle: {
        position: 'absolute',
        top: -20,
        right: -20,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,0.08)',
    },

    cardLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: spacing[1],
        borderRadius: spacing[5],
        marginBottom: spacing[2],
    },

    cardTitle: {
        fontSize: sizes["4xl"],
        fontFamily: `${fonts.heading}_900`,
        color: '#ffffff',
        marginBottom: spacing[1],
    },

    cardSubtitle: {
        fontSize: sizes.md,
        fontFamily: `${fonts.body}_600`,
        color: 'rgba(255,255,255,0.75)',
        marginBottom: 16,
    },

    cardButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderColor: 'rgba(255,255,255,0.4)',
        borderWidth: 1.5,
        gap: spacing[2],
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[2],
        borderRadius: spacing[5],
    },

    cardButtonText: {
        fontSize: sizes.md,
        fontFamily: `${fonts.heading}_800`,
        color: colors.bgCard,
    },
});
