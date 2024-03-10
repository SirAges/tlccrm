import { createStackNavigator } from "@react-navigation/stack";
import {
    MinistryScreen,
    SMinistryScreen,
    SMinFeedScreen,
    DepartmentScreen
} from "../screens";
import MinistryForm from "../forms/MinistryForm";
import FeedForm from "../forms/FeedForm";

import { Text } from "react-native";
import { CusIcon } from "../components";

const Stack = createStackNavigator();
const MinistryNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="MinistryScreen" component={MinistryScreen} />

            <Stack.Screen name="SMinistryScreen" component={SMinistryScreen} />
            <Stack.Screen name="SMinFeedScreen" component={SMinFeedScreen} />
            <Stack.Screen
                name="DepartmentScreen"
                component={DepartmentScreen}
            />
            <Stack.Screen
                name="MinistryForm"
                component={MinistryForm}
            />
            <Stack.Screen
                name="FeedForm"
                component={FeedForm}
            />
          
            
            
        </Stack.Navigator>
    );
};
export default MinistryNavigator;
