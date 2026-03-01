import {Stack} from "expo-router";
import React from 'react';
import colors from "@/constants/colors";

function RemindersLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {backgroundColor: colors.bgApp},
                animation: 'slide_from_right'
            }}
        >
            <Stack.Screen name={"index"} options={{
                headerShown: false,
                contentStyle: {backgroundColor: colors.bgApp},
                animation: 'slide_from_right',
            }}/>
            <Stack.Screen name={"[id]"} options={{
                headerShown: false,
                contentStyle: {backgroundColor: colors.bgApp},
                animation: 'slide_from_right',
            }}/>
            <Stack.Screen name={"new"} options={{
                headerShown: false,
                contentStyle: {backgroundColor: colors.bgApp},
                animation: 'slide_from_right',
            }}/>
        </Stack>
    );
}

export default RemindersLayout;