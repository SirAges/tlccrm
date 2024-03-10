import { createStackNavigator } from "@react-navigation/stack";
import BranchesScreen from "../screens/BranchesScreen";
import BranchForm from "../forms/BranchForm";



const Stack = createStackNavigator();
const BranchNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="BranchesScreen" component={BranchesScreen} />

            <Stack.Screen name="BranchForm" component={BranchForm} />
        </Stack.Navigator>
    );
};
export default BranchNavigator;
