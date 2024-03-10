import { createStackNavigator } from "@react-navigation/stack";
import { HymnScreen, SHymnScreen } from "../screens";
import HymnForm from "../forms/HymnForm";

import { Text } from "react-native";
import { CusIcon } from "../components";

const Stack = createStackNavigator();
const HymnNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="HymnScreen" component={HymnScreen} />

            <Stack.Screen name="SHymnScreen" component={SHymnScreen} />
            <Stack.Screen name="HymnForm" component={HymnForm} />
        </Stack.Navigator>
    );
};
export default HymnNavigator;
