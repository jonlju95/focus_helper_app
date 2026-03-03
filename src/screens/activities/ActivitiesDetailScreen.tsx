import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import {MOCK_ACTIVITIES} from "@/screens/activities/data/activities";
import TopBar from "@/components/ui/TopBar";
import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import ToggleButton from "@/components/ui/sharedInputs/ToggleButton";
import SharedButton from "@/components/ui/SharedButton";
import {ClockIcon, FileTextIcon, PenIcon} from "phosphor-react-native";
import {ACTIVITY_COLORS} from "@/types/categoryColors";
import {sharedStyles} from "@/constants/sharedStyles";
import SharedBadge from "@/components/ui/SharedBadge";

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
        <View style={sharedStyles.container}>
            <TopBar title={activity.title} showBack={true} onBack={() => router.back()}/>

            <ScrollView style={sharedStyles.scroll}
                        contentContainerStyle={sharedStyles.scrollContent}
                        showsVerticalScrollIndicator={false}>
                <View style={sharedStyles.card}>
                    <View style={[sharedStyles.row, {justifyContent: 'space-between'}]}>
                        <Text style={typography.styles.detailTitle}>{activity.title}</Text>
                        <Pressable style={[sharedStyles.row, styles.editButton]} onPress={() => {
                            router.push({
                                pathname: `/activities/new`,
                                params: {id: activity.id}
                            })
                        }}>
                            <PenIcon size={14} color={colors.primary} weight={'bold'}/>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </Pressable>
                    </View>
                    <View style={[sharedStyles.row, styles.cardMeta]}>
                        <ClockIcon size={11} color={colors.textMuted} weight={'fill'}/>
                        <Text style={typography.styles.metaText}>{activity.time ?? activity.date}</Text>
                        <SharedBadge title={activity.type} color={typeColor.text} bgColor={typeColor.bg}/>
                        {activity.prioritized && (
                            <SharedBadge title={'Prioritized'} prioritized={true}/>
                        )}
                    </View>
                    {activity.description && (
                        <View>
                            <View style={[sharedStyles.row, styles.cardLabel]}>
                                <FileTextIcon size={14} color={colors.primary} weight={'fill'}/>
                                <Text
                                    style={[typography.styles.sectionLabel, {color: colors.primary}]}>Description</Text>
                            </View>
                            <Text style={typography.styles.bodyText}>{activity.description}</Text>
                        </View>
                    )}
                </View>
                <View style={[sharedStyles.row, {justifyContent: 'space-between'}]}>
                    <View style={[sharedStyles.row, {gap: spacing[3]}]}>
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
    editButton: {
        gap: spacing[1],
        backgroundColor: colors.primaryLight,
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[2],
        borderRadius: spacing[3],
    },

    editButtonText: {
        fontSize: 13,
        fontFamily: "Nunito_800",
        color: colors.primary
    },

    cardMeta: {
        alignSelf: "flex-start",
        gap: spacing[1],
        marginTop: spacing[1],
        marginBottom: spacing[2],
    },

    cardLabel: {
        gap: spacing[1],
        marginTop: spacing[4],
        marginBottom: spacing[2],
    },
})

export default ActivitiesDetailScreen;