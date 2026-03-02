import {Stack} from "expo-router";
import colors from "@/constants/colors";

function ExpensesLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {backgroundColor: colors.bgApp},
                animation: 'slide_from_right'
            }}>
            <Stack.Screen name={'index'} options={{
                headerShown: false,
                contentStyle: {backgroundColor: colors.bgApp},
                animation: 'slide_from_right'
            }}/>
            <Stack.Screen name={'[id]'} options={{
                headerShown: false,
                contentStyle: {backgroundColor: colors.bgApp},
                animation: 'slide_from_right'
            }}/>
            <Stack.Screen name={'new'} options={{
                headerShown: false,
                contentStyle: {backgroundColor: colors.bgApp},
                animation: 'slide_from_right'
            }}/>
        </Stack>
    );
}

export default ExpensesLayout;
