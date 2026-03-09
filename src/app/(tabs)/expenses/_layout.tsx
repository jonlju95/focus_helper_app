import {Stack} from "expo-router";
import colors from "@/constants/colors";

function ExpensesLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {backgroundColor: colors.bgApp},
                animation: 'fade_from_bottom'
            }}>
            <Stack.Screen name={'index'} options={{
                headerShown: false,
                contentStyle: {backgroundColor: colors.bgApp},
                animation: 'fade_from_bottom'
            }}/>
            <Stack.Screen name={'[id]'} options={{
                headerShown: false,
                contentStyle: {backgroundColor: colors.bgApp},
                animation: 'fade_from_bottom'
            }}/>
        </Stack>
    );
}

export default ExpensesLayout;
