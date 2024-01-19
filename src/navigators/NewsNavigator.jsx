import { createStackNavigator } from "@react-navigation/stack";
import { NewsScreen, SNewsScreen } from "../screens";

import { Text } from "react-native";
import { CusIcon } from "../components";

const Stack = createStackNavigator();
const NewsNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="NewsScreen" component={NewsScreen} />

            <Stack.Screen name="SNewsScreen" component={SNewsScreen} />
        </Stack.Navigator>
    );
};
export default NewsNavigator;
