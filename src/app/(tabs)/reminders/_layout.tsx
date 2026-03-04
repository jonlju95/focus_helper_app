import {Stack} from "expo-router";
import colors from "@/constants/colors";

function RemindersLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {backgroundColor: colors.bgApp},
                animation: 'fade',
                animationDuration: 300
            }}
        >
            <Stack.Screen name={"index"} options={{
                headerShown: false,
                contentStyle: {backgroundColor: colors.bgApp},
                animation: 'fade',
                animationDuration: 300
            }}/>
            <Stack.Screen name={"[id]"} options={{
                headerShown: false,
                contentStyle: {backgroundColor: colors.bgApp},
                animation: 'fade',
                animationDuration: 300
            }}/>
            <Stack.Screen name={"new"} options={{
                headerShown: false,
                contentStyle: {backgroundColor: colors.bgApp},
                animation: 'fade',
                animationDuration: 300
            }}/>
        </Stack>
    );
}

export default RemindersLayout;