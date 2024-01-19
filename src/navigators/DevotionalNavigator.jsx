import { createStackNavigator } from "@react-navigation/stack";
import { DevotionalScreen, SDevotionalScreen } from "../screens";

import { Text } from "react-native";
import { CusIcon } from "../components";

const Stack = createStackNavigator();
const DevotionalNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="DevotionalScreen" component={DevotionalScreen} />

            <Stack.Screen name="SDevotionalScreen" component={SDevotionalScreen} />
        </Stack.Navigator>
    );
};
export default DevotionalNavigator;
