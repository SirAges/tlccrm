import { createStackNavigator } from "@react-navigation/stack";
import { DevotionalScreen, SDevotionalScreen } from "../screens";
import DevotionForm from "../forms/DevotionForm";
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
            <Stack.Screen
                name="DevotionalScreen"
                component={DevotionalScreen}
            />

            <Stack.Screen
                name="SDevotionalScreen"
                component={SDevotionalScreen}
            />
            <Stack.Screen
                name="DevotionForm"
                component={DevotionForm}
            />
        </Stack.Navigator>
    );
};
export default DevotionalNavigator;
