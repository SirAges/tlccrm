import { createStackNavigator } from "@react-navigation/stack";
import {
    DepartmentScreen,
    SDepartmentScreen,
    SDeptFeedScreen
} from "../screens";
import DepartmentForm from "../forms/DepartmentForm";
import DFeedForm from "../forms/DFeedForm";

import { Text } from "react-native";
import { CusIcon } from "../components";

const Stack = createStackNavigator();
const DepartmentNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="DepartmentScreen"
                component={DepartmentScreen}
            />

            <Stack.Screen
                name="SDepartmentScreen"
                component={SDepartmentScreen}
            />

            <Stack.Screen name="SDeptFeedScreen" component={SDeptFeedScreen} />

            <Stack.Screen name="DepartmentForm" component={DepartmentForm} />

            <Stack.Screen name="DFeedForm" component={DFeedForm} />
        </Stack.Navigator>
    );
};
export default DepartmentNavigator;
