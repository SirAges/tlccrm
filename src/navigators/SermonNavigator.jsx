import { createStackNavigator } from "@react-navigation/stack";
import { SermonScreen, SSermonScreen } from "../screens";

import { Text } from "react-native";
import { CusIcon } from "../components";

const Stack = createStackNavigator();
const SermonNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="SermonScreen" component={SermonScreen} />

            <Stack.Screen name="SSermonScreen" component={SSermonScreen} />
        </Stack.Navigator>
    );
};
export default SermonNavigator;
