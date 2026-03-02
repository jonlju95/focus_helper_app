import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import SharedBadge from "@/components/ui/SharedBadge";
import spacing from "@/constants/spacing";
import typography from "@/constants/typography";
import colors from "@/constants/colors";
import SharedInput from "@/components/ui/sharedInputs/SharedInput";
import {CheckIcon, PlusIcon} from "phosphor-react-native";
import SharedButton from "@/components/ui/SharedButton";

const categories: { title: string; color: string, bgColor: string, btnBg: string }[] = [
    {title: 'groceries', color: '#3A9A5A', bgColor: '#E8F5E8', btnBg: 'rgba(58,154,90,0.2)'},
    {title: 'food & drink', color: '#C4622D', bgColor: '#FDE8D8', btnBg: 'rgba(196,98,45,0.2)'},
    {title: 'transport', color: '#3A7FC1', bgColor: '#DDEEF8', btnBg: 'rgba(58,127,193,0.2)'},
    {title: 'health', color: '#C13A9A', bgColor: '#FDE8F8', btnBg: 'rgba(193,58,154,0.2)'},
    {title: 'subscriptions', color: '#8A3AC1', bgColor: '#F0E8FD', btnBg: 'rgba(138,58,193,0.2)'},
    {title: 'home', color: '#C49028', bgColor: '#FDF3D8', btnBg: 'rgba(196,144,40,0.2)'},
    {title: 'other', color: '#7A6A5A', bgColor: '#EDE8E0', btnBg: 'rgba(122,106,90,0.2)'}
];

interface SidebarCategoriesProps {
    onBack?: () => void
}

function SidebarCategories({onBack}: SidebarCategoriesProps) {
    const [newCategory, setNewCategory] = useState('');

    const handleAdd = () => {
        if (!newCategory.trim()) return;
        // onAddTask?.(newTaskLabel.trim());
        setNewCategory('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Tap a category to remove it. These appear in Expenses and Activities.</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: spacing[3]}}>
                {categories.map((c) => (
                    <SharedBadge title={c.title} color={c.color} bgColor={c.bgColor} deleteBtnBg={c.btnBg}
                                 deletable={true}/>
                ))}
            </View>
            <View style={[styles.inputContainer]}>
                <View style={{flex: 1, marginRight: 8}}>
                    <SharedInput
                        value={''}
                        showLabel={false} placeholder="New category"
                        customStyle={{backgroundColor: 'white'}}/>
                </View>
                <Pressable
                    style={styles.addButton}
                    onPress={handleAdd}>
                    <PlusIcon size={18} color="white" weight="bold"/>
                </Pressable>
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
    header: {
        fontSize: 12,
        fontFamily: `${typography.fonts.heading}_600`,
        color: colors.textMuted,
    },
    inputContainer: {
        flexDirection: 'row',
    },
    addButton: {
        backgroundColor: colors.primary,
        padding: spacing[3],
        borderRadius: spacing[2],
        alignSelf: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default SidebarCategories;