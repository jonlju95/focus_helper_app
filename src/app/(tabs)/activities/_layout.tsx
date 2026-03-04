import colors from "@/constants/colors";
import {Stack} from "expo-router";

function ActivitiesLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {backgroundColor: colors.bgApp},
                animation: 'fade'
            }}
        >
            <Stack.Screen name={"index"} options={{
                headerShown: false,
                contentStyle: {backgroundColor: colors.bgApp},
                animation: 'fade',
            }}/>
            <Stack.Screen name={"[id]"} options={{
                headerShown: false,
                contentStyle: {backgroundColor: colors.bgApp},
                animation: 'fade',
            }}/>
            <Stack.Screen name={"new"} options={{
                headerShown: false,
                contentStyle: {backgroundColor: colors.bgApp},
                animation: 'fade',
            }}/>
        </Stack>
    );
}

export default ActivitiesLayout;
