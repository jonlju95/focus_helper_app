import {Dimensions, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {router} from "expo-router";
import {ClockIcon, FileTextIcon, PenIcon, TrashIcon} from "phosphor-react-native";

import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import {sharedStyles} from "@/constants/sharedStyles";
import TopBar from "@/components/ui/TopBar";
import ToggleButton from "@/components/ui/sharedInputs/ToggleButton";
import SharedButton from "@/components/ui/SharedButton";
import SharedBadge from "@/components/ui/SharedBadge";
import ConfirmDialog from "@/components/ui/modals/ConfirmDialog";
import {useActivityDetail} from "@/screens/activities/hooks/useActivityDetail";

const FIELD_WIDTH = (Dimensions.get('window').width - 78) / 2;

function ActivitiesDetailScreen() {
    const {
        activity,
        onPriorityToggle,
        onDelete,
        deleteVisible,
        setDeleteVisible
    } = useActivityDetail();

    if (!activity) return <View><Text>Activity not found</Text></View>

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
                        <SharedBadge title={activity.category?.name || ''}
                                     color={activity.category?.colorText}
                                     bgColor={activity.category?.colorBg}/>
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
                    <View style={[sharedStyles.row, {gap: spacing[3], width: FIELD_WIDTH}]}>
                        <Text style={[typography.styles.cardTitle]}>Prioritized</Text>
                        <ToggleButton showLabel={false} value={activity.prioritized ?? false}
                                      onChange={onPriorityToggle}/>
                    </View>
                    <View style={{justifyContent: 'flex-end'}}>
                        <SharedButton icon={<TrashIcon size={16} color={'#FFF'} weight={'bold'}/>}
                                      label={'Delete'} onPress={() => setDeleteVisible(true)}/>
                        <ConfirmDialog
                            visible={deleteVisible}
                            title="Delete activity?"
                            message="This cannot be undone"
                            confirmLabel="Delete"
                            onCancel={() => setDeleteVisible(false)}
                            onConfirm={onDelete}
                        />
                    </View>
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