import { createStackNavigator } from "@react-navigation/stack";
import AnnouncementScreen from "../screens/AnnouncementScreen";
import AnnouncementForm from "../forms/AnnouncementForm";

import { Text } from "react-native";
import { CusIcon } from "../components";

const Stack = createStackNavigator();
const AnnouncementNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="AnnouncementScreen"
                component={AnnouncementScreen}
            />

            <Stack.Screen
                name="AnnouncementForm"
                component={AnnouncementForm}
            />
        </Stack.Navigator>
    );
};
export default AnnouncementNavigator;
