import { createStackNavigator } from "@react-navigation/stack";
import GiveScreen from "../screens/GiveScreen";
import GiveListScreen from "../screens/GiveListScreen";
import BankAccountForm from "../forms/BankAccountForm";
import GiveForm from "../forms/GiveForm";

const Stack = createStackNavigator();
const BankAccountNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="GiveScreen" component={GiveScreen} />

            <Stack.Screen name="BankAccountForm" component={BankAccountForm} />
            <Stack.Screen name="GiveForm" component={GiveForm} />
            <Stack.Screen name="GiveListScreen" component={GiveListScreen} />
        </Stack.Navigator>
    );
};
export default BankAccountNavigator;
