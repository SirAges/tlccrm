import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import {
    AboutScreen,
    BranchesScreen,
    LiveScreen,
    SSermonScreen,
    STestimonyScreen,
    SChatScreen,
    SNewsScreen,ProfileScreen
} from "../screens";
import { Dimensions } from "react-native";
import { DrawerContent } from "../components";
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                swipeEdgeWidth: 50,
                drawerStyle: {
                    width: Dimensions.get("window").width,
                    height: "100%"
                }
            }}
        >
            <Drawer.Screen name="TabNavigator" component={TabNavigator} />
            <Drawer.Screen name="AboutScreen" component={AboutScreen} />
            <Drawer.Screen name="BranchesScreen" component={BranchesScreen} />
            <Drawer.Screen name="LiveScreen" component={LiveScreen} />
            <Drawer.Screen name="SSermonScreen" component={SSermonScreen} />
            <Drawer.Screen
                name="STestimonyScreen"
                component={STestimonyScreen}
            />
            <Drawer.Screen name="SNewsScreen" component={SNewsScreen} />
            <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
            <Drawer.Screen name="SChatScreen" component={SChatScreen} />
        </Drawer.Navigator>
    );
};
export default DrawerNavigator;

<Drawer.Navigator>{/* screens */}</Drawer.Navigator>;
