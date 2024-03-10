import { createStackNavigator } from "@react-navigation/stack";
import { SermonScreen, SSermonScreen } from "../screens";
import SermonForm from "../forms/SermonForm";

import { Text } from "react-native";
import { CusIcon } from "../components";

const Stack = createStackNavigator();
const SermonNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="SermonScreen" component={SermonScreen} />

            <Stack.Screen name="SSermonScreen" component={SSermonScreen} />

            <Stack.Screen name="SermonForm" component={SermonForm} />
        </Stack.Navigator>
    );
};
export default SermonNavigator;
