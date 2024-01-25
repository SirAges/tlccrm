import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import MinistryNavigator from "./MinistryNavigator";
import DevotionalNavigator from "./DevotionalNavigator";


import HymnNavigator from "./HymnNavigator";
import {
    AboutScreen,
    AnnouncementScreen,
    BranchesScreen,
    LiveScreen,
    SSermonScreen,
    STestimonyScreen,
    SChatScreen,
    SNewsScreen,
    ProfileScreen,
    ChosenSchoolScreen,
    MoreGraceScreen,
    DepartmentScreen,
    GiveScreen,
    NotificationScreen,
    
    DoctrineScreen,
    
    
  
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
            <Drawer.Screen name="DevotionalNavigator" component={DevotionalNavigator} />
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
            <Drawer.Screen
                name="ChosenSchoolScreen"
                component={ChosenSchoolScreen}
            />
            <Drawer.Screen
                name="MinistryNavigator"
                component={MinistryNavigator}
            />
            <Drawer.Screen name="DepartmentScreen" component={DepartmentScreen} />
            <Drawer.Screen name="HymnNavigator" component={HymnNavigator} />
            
            <Drawer.Screen name="GiveScreen" component={GiveScreen} />
            <Drawer.Screen name="NotificationScreen" component={NotificationScreen} />
            <Drawer.Screen name="DoctrineScreen" component={DoctrineScreen} />
            <Drawer.Screen name="AnnouncementScreen" component={AnnouncementScreen} />
            <Drawer.Screen name="MoreGraceScreen" component={MoreGraceScreen} />
        </Drawer.Navigator>
    );
};
export default DrawerNavigator;


