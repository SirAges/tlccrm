import { createStackNavigator } from "@react-navigation/stack";
import { HymnScreen, SHymnScreen } from "../screens";

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
        </Stack.Navigator>
    );
};
export default HymnNavigator;
