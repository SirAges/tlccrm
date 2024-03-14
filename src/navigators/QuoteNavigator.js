import { createStackNavigator } from "@react-navigation/stack";
import QuoteScreen from "../screens/QuoteScreen";
import QuoteForm from "../forms/QuoteForm";

import { Text } from "react-native";
import { CusIcon } from "../components";

const Stack = createStackNavigator();
const QuoteNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="QuoteScreen"
                component={QuoteScreen}
            />

            <Stack.Screen
                name="QuoteForm"
                component={QuoteForm}
            />
        </Stack.Navigator>
    );
};
export default QuoteNavigator;
