import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DashboardScreen } from "../screens";
import SermonNavigator from "../navigators/SermonNavigator";
import NewsNavigator from "../navigators/NewsNavigator";
import ChatNavigator from "../navigators/ChatNavigator";
import TestimonyNavigator from "../navigators/TestimonyNavigator";

import HymnNavigator from "../navigators/HymnNavigator";

import { Text } from "react-native";
import { CusIcon } from "../components";
import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen
                name="DashboardScreen"
                options={{
                    tabBarLabel: ({ focused }) => (
                       focused ? <Text className="capitalize text-icon font-medium">
                              home
                        </Text>:null
                    ),

                    tabBarIcon: ({ focused }) => (
                        <CusIcon
                            name={focused ? "home" : "home-outline"}
                            size={24}
                        />
                    )
                }}
                component={DashboardScreen}
            />

            <Tab.Screen
                name="SermonNavigator"
                options={{
                   tabBarLabel: ({ focused }) => (
                       focused ? <Text className="capitalize text-icon font-medium">
                              sermon
                        </Text>:null
                    ),

                    tabBarIcon: ({ focused }) => (
                        <CusIcon
                            name={focused ? "book" : "book-outline"}
                            size={24}
                        />
                    )
                }}
                component={SermonNavigator}
            />

            <Tab.Screen
                name="NewsNavigator"
                options={{
                   tabBarLabel: ({ focused }) => (
                       focused ? <Text className="capitalize text-icon font-medium">
                              news
                        </Text>:null
                    ),

                    tabBarIcon: ({ focused }) => (
                        <CusIcon
                            name={focused ? "newspaper" : "newspaper-outline"}
                            size={24}
                        />
                    )
                }}
                component={NewsNavigator}
            />

            <Tab.Screen
                name="TestimonyNavigator"
                options={{
                    tabBarLabel: ({ focused }) => (
                       focused ? <Text className="capitalize text-icon font-medium">
                              testimony
                        </Text>:null
                    ),

                    tabBarIcon: ({ focused }) => (
                        <CusIcon
                            name={focused ? "mic" : "mic-outline"}
                            size={24}
                        />
                    )
                }}
                component={TestimonyNavigator}
            />
            <Tab.Screen
                name="ChatNavigator"
                options={{
                   tabBarLabel: ({ focused }) => (
                       focused ? <Text className="capitalize text-icon font-medium">
                              chats
                        </Text>:null
                    ),

                    tabBarIcon: ({ focused }) => (
                        <CusIcon
                            name={focused ? "chatbox" : "chatbox-outline"}
                            size={24}
                        />
                    )
                }}
                component={ChatNavigator}
            />
        </Tab.Navigator>
    );
};
export default TabNavigator;
