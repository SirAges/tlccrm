import { createStackNavigator } from "@react-navigation/stack";
import { TestimonyScreen, STestimonyScreen } from "../screens";

import { Text } from "react-native";
import { CusIcon } from "../components";

const Stack = createStackNavigator();
const TestimonyNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="TestimonyScreen" component={TestimonyScreen} />

            <Stack.Screen name="STestimonyScreen" component={STestimonyScreen} />
        </Stack.Navigator>
    );
};
export default TestimonyNavigator;
