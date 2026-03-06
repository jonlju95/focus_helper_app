import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from "react-native";
import spacing from "@/constants/spacing";
import colors from "@/constants/colors";
import {CheckIcon, PenIcon, UserIcon} from "phosphor-react-native";
import SharedInput from "@/components/ui/sharedInputs/SharedInput";
import SharedOptionPicker, {Option} from "@/components/ui/sharedInputs/SharedOptionPicker";
import SharedButton from "@/components/ui/SharedButton";
import {useSidebarProfile} from "@/screens/sidebar/hooks/useSidebarProfile";

interface SidebarProfileProps {
    onBack?: () => void
}

function SidebarProfile({onBack}: SidebarProfileProps) {
    const {username, greetings} = useSidebarProfile();
    const [greeting, setGreeting] = useState<string>('goodMorning');

    const changeGreeting = (value: string) => {
        setGreeting(value);
    }

    return (
        <View style={styles.container}>
            <View style={styles.userIcon}>
                <UserIcon size={36} color={colors.primary} weight={'bold'}/>
                <Pressable style={styles.userEdit}>
                    <PenIcon size={11} color={colors.primaryLight} weight={'bold'}/>
                </Pressable>
            </View>
            <View style={styles.settingsCard}>
                <View style={[styles.settingsCardArea, {borderBottomWidth: 1, borderBottomColor: '#F5F0EA'}]}>
                    <SharedInput value={username} label={'Your name'}/>
                </View>
                <View style={styles.settingsCardArea}>
                    <SharedOptionPicker options={greetings} value={'499ed04d-bd73-433b-98a1-aabfdd39a6c7'} label={'Greeting style'}
                                        onChange={changeGreeting}/>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <SharedButton icon={<CheckIcon size={12} color={'white'} weight={'bold'}/>} label={'Save changes'}
                              customStyle={{alignSelf: 'stretch'}} onPress={onBack}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing[4],
        alignContent: "center",
        gap: spacing[4],
    },
    userIcon: {
        padding: spacing[4],
        backgroundColor: colors.primaryLight,
        alignSelf: 'center',
        borderRadius: spacing[4],
    },
    userEdit: {
        flex: 1,
        padding: spacing[1],
        backgroundColor: colors.primary,
        alignSelf: 'flex-start',
        borderRadius: spacing[2],
        position: "absolute",
        borderWidth: 1,
        borderColor: colors.primaryLight,
        right: -4,
        bottom: -4,
    },
    settingsCard: {
        backgroundColor: colors.bgCard,
        borderRadius: spacing[4],
    },
    settingsCardArea: {
        padding: spacing[4],
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default SidebarProfile;