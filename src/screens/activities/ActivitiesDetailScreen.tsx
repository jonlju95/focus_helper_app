import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import {MOCK_ACTIVITIES} from "@/screens/activities/data/activities";
import TopBar from "@/components/ui/TopBar";
import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import ToggleButton from "@/components/ui/ToggleButton";
import SharedButton from "@/components/ui/SharedButton";
import {ClockIcon, FileTextIcon, PenIcon, StarIcon} from "phosphor-react-native";
import {capitalise} from "@/utils/formatLabel";
import {ACTIVITY_COLORS} from "@/types/categoryColors";

function ActivitiesDetailScreen() {
    const {id} = useLocalSearchParams<{ id: string }>();

    const foundActivity = MOCK_ACTIVITIES.find(a => a.id === id);
    const [activity, setActivity] = useState(foundActivity);

    if (!activity) return <View><Text>Activity not found</Text></View>

    const typeColor = ACTIVITY_COLORS[activity.type];

    const togglePriority = (priority: boolean) => {
        setActivity(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                prioritized: priority
            };
        });
    }

    return (
        <View style={styles.container}>
            <TopBar title={activity.title} showBack={true} onBack={() => router.back()} onMenu={() => {
            }}/>

            <ScrollView contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderText}>{activity.title}</Text>
                        <Pressable style={styles.editButton} onPress={() => {
                            router.push({
                                pathname: `/activities/new`,
                                params: {id: activity.id}
                            })
                        }}>
                            <PenIcon size={14} color={colors.primary} weight={'bold'}/>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </Pressable>
                    </View>
                    <View style={styles.cardMeta}>
                        <ClockIcon size={11} color={colors.textMuted} weight={'fill'}/>
                        <Text style={styles.cardMetaText}>{activity.time ?? activity.date}</Text>
                        <View style={[styles.cardMetaType, {backgroundColor: typeColor.bg}]}>
                            <Text style={[styles.cardMetaTypeText, {color: typeColor.text}]}>
                                {capitalise(activity.type)}
                            </Text>
                        </View>
                        {activity.prioritized && (
                            <View style={styles.tag}>
                                <StarIcon size={11} color={colors.primary} weight={'fill'}/>
                                <Text
                                    style={[typography.styles.badgeText, {color: colors.primary}]}>Prioritized</Text>
                            </View>
                        )}
                    </View>
                    {activity.description && (
                        <View>
                            <View style={styles.cardLabel}>
                                <FileTextIcon size={14} color={colors.primary} weight={'fill'}/>
                                <Text style={[typography.styles.sectionLabel, {color: colors.primary}]}>Description</Text>
                            </View>
                            <Text style={typography.styles.bodyText}>{activity.description}</Text>
                        </View>
                    )}
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.priorityToggleContainer}>
                        <Text style={typography.styles.cardTitle}>Prioritized</Text>
                        <ToggleButton value={activity.prioritized} onChange={togglePriority}/>
                    </View>
                    <SharedButton label={'Confirm'}/>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgApp,
        paddingHorizontal: spacing[4],
        gap: spacing[3]
    },
    scrollContent: {
        paddingBottom: spacing[4],
        gap: spacing[4],
    },
    card: {
        padding: spacing[4],
        backgroundColor: colors.bgCard,
        borderRadius: spacing[4]
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardHeaderText: {
        color: colors.textPrimary,
        fontSize: 22,
        fontFamily: "Nunito_900",
        textOverflow: "ellipsis",
        flexShrink: 1
    },
    editButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: colors.primaryLight,
        paddingHorizontal: spacing[4],
        paddingVertical: 8,
        borderRadius: 12
    },
    editButtonText: {
        fontSize: 13,
        fontFamily: "Nunito_800",
        color: colors.primary
    },
    cardMeta: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: 4,
        marginTop: 4,
        marginBottom: 8,
    },
    cardMetaText: {
        fontSize: typography.sizes.md,
        fontFamily: `${typography.fonts.body}_600`,
        color: colors.textMuted,
    },
    cardMetaType: {
        paddingHorizontal: spacing[2],
        paddingVertical: 2,
        borderRadius: spacing[4],
        backgroundColor: colors.primaryLight,
    },
    cardMetaTypeText: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_600`,
        color: colors.primary,
    },
    cardLabel: {
        flexDirection: "row",
        gap: 6,
        alignItems: "center",
        marginTop: 16,
        marginBottom: 8,
    },
    tag: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 2,
        borderRadius: 20,
        backgroundColor: colors.primaryLight,
    },
    prioritizedTagText: {
        fontSize: 11,
        fontFamily: "Nunito_800",
        color: colors.primary,
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    priorityToggleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing[3]
    },
})

export default ActivitiesDetailScreen;