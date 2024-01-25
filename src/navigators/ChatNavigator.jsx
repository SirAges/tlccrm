import { createStackNavigator } from "@react-navigation/stack";
import { ChatScreen, SChatScreen } from "../screens";

import { Text } from "react-native";
import { CusIcon } from "../components";

const Stack = createStackNavigator();
const ChatNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="ChatScreen" component={ChatScreen} />

            <Stack.Screen name="SChatScreen" component={SChatScreen} />
        </Stack.Navigator>
    );
};
export default ChatNavigator;
