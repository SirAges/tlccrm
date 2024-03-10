import { createStackNavigator } from "@react-navigation/stack";
import EventScreen from "../screens/EventScreen";
import EventForm from "../forms/EventForm";

import { Text } from "react-native";
import { CusIcon } from "../components";

const Stack = createStackNavigator();
const EventNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="EventScreen"
                component={EventScreen}
            />

            <Stack.Screen
                name="EventForm"
                component={EventForm}
            />
        </Stack.Navigator>
    );
};
export default EventNavigator;
