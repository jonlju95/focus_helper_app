import {Stack} from "expo-router";
import colors from "@/constants/colors";

function RemindersLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {backgroundColor: colors.bgApp},
                animation: 'fade_from_bottom',
                animationDuration: 300
            }}
        >
            <Stack.Screen name={"index"}/>
            <Stack.Screen name={"[id]"}/>
        </Stack>
    );
}

export default RemindersLayout;