import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import { useEffect } from "react";
import MinistryNavigator from "./MinistryNavigator";
import DepartmentNavigator from "./DepartmentNavigator";
import DevotionalNavigator from "./DevotionalNavigator";
import QuoteNavigator from "./QuoteNavigator";
import EventNavigator from "./EventNavigator";
import HymnNavigator from "./HymnNavigator";
import AnnouncementNavigator from "./AnnouncementNavigator";
import BranchNavigator from "./BranchNavigator";
import GiveNavigator from "./GiveNavigator";
import DoctrineNavigator from "./DoctrineNavigator";
import TestimonyNavigator from "./TestimonyNavigator";

import {
    AboutScreen,
    LiveScreen,
    SChatScreen,
    SNewsScreen,
    SSermonScreen,
    STestimonyScreen,
    ProfileScreen,
    ChosenSchoolScreen,
    MoreGraceScreen,
    NotificationScreen,
    FormScreen,
    LoginScreen,
    RegisterScreen
} from "../screens";
import { Dimensions } from "react-native";
import { DrawerContent } from "../components";
import LoginNavigator from "./LoginNavigator";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/auth/authSlice";

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
    const token = useSelector(selectCurrentToken);

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

            <Drawer.Screen
                name="DevotionalNavigator"
                component={DevotionalNavigator}
            />
            <Drawer.Screen name="AboutScreen" component={AboutScreen} />
            <Drawer.Screen name="BranchNavigator" component={BranchNavigator} />
            <Drawer.Screen name="LiveScreen" component={LiveScreen} />
            <Drawer.Screen name="SSermonScreen" component={SSermonScreen} />
            <Drawer.Screen
                name="STestimonyScreen"
                component={STestimonyScreen}
            />
            <Drawer.Screen
                name="TestimonyNavigator"
                component={TestimonyNavigator}
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
            <Drawer.Screen name="QuoteNavigator" component={QuoteNavigator} />
            <Drawer.Screen name="EventNavigator" component={EventNavigator} />
            <Drawer.Screen
                name="DepartmentNavigator"
                component={DepartmentNavigator}
            />

            <Drawer.Screen name="HymnNavigator" component={HymnNavigator} />

            <Drawer.Screen name="GiveNavigator" component={GiveNavigator} />
            <Drawer.Screen
                name="NotificationScreen"
                component={NotificationScreen}
            />
            <Drawer.Screen
                name="DoctrineNavigator"
                component={DoctrineNavigator}
            />
            <Drawer.Screen
                name="AnnouncementNavigator"
                component={AnnouncementNavigator}
            />
            <Drawer.Screen name="MoreGraceScreen" component={MoreGraceScreen} />
            <Drawer.Screen name="FormScreen" component={FormScreen} />
        </Drawer.Navigator>
    );
};
export default DrawerNavigator;
