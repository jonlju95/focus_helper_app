import {Pressable, StyleSheet, Text, View} from "react-native";
import {ArrowRightIcon, LightningIcon, WarningIcon} from "phosphor-react-native";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {LinearGradient} from "expo-linear-gradient";


function HeroCard() {
    return (
        <View style={styles.container}>
            <View style={styles.sectionLabel}>
                <LightningIcon size={13} color={colors.textMuted} weight="fill"/>
                <Text style={typography.styles.sectionLabel}>Most urgent today</Text>
            </View>
            <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.card}>
                <View style={styles.circle}/>

                {/* Type badge */}
                <View style={styles.cardBadge}>
                    <WarningIcon size={13} color="rgba(255,255,255,0.7)" weight="fill"/>
                    <Text style={styles.cardBadgeText}>Invoice due soon</Text>
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
        marginHorizontal: 20,
        gap: 12,
    },

    circle: {
        position: 'absolute',
        top: -20,
        right: -20,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,0.08)',
    },

    sectionLabel: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },

    card: {
        padding: 22,
        paddingBottom: 18,
        borderRadius: 24,
    },

    cardBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        alignSelf: 'flex-start',
        borderRadius: 20,
        marginBottom: 10,
    },

    cardBadgeText: {
        fontSize: 11,
        fontFamily: 'Nunito_800',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.7)',
    },

    cardTitle: {
        fontSize: 28,
        fontFamily: 'Nunito_900',
        color: '#ffffff',
        marginBottom: 4,
    },

    cardSubtitle: {
        fontSize: 13,
        fontFamily: 'NunitoSans_500',
        color: 'rgba(255,255,255,0.75)',
        marginBottom: 16,
    },

    cardButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderWidth: 1.5,
        borderStyle: 'solid',
        borderColor: 'rgba(255,255,255,0.4)',
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderRadius: 20,
    },

    cardButtonText: {
        fontSize: 13,
        fontFamily: 'Nunito_800',
        color: colors.bgCard,
    },
})

export default HeroCard;
