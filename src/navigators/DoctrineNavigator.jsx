import { createStackNavigator } from "@react-navigation/stack";
import DoctrineScreen from "../screens/DoctrineScreen";
import DoctrineForm from "../forms/DoctrineForm";



const Stack = createStackNavigator();
const DoctrineNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="DoctrineScreen" component={DoctrineScreen} />

            <Stack.Screen name="DoctrineForm" component={DoctrineForm} />
        </Stack.Navigator>
    );
};
export default DoctrineNavigator;
