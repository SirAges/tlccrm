import { useState, useEffect, useRef } from "react";
import { drawerMenu, socialmedia, currentUser } from "../lib/data";

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from "@react-navigation/drawer";
import { CusIcon } from "./";
import { useNavigation } from "@react-navigation/native";

import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Linking,
    ScrollView,
    TouchableWithoutFeedback
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const DrawerContent = ({ navigation, props }) => {
    const handleClicked = screen => {
        navigation.navigate(screen);
    };
    const u = currentUser;
    return (
        <SafeAreaView className="flex-1   bg-white">
            <View className="px-2 items-center bg-white py-2">
                <View className="backbtn justify-between  flex-row items-center w-full">
                    <View
                        className=" justify-between flex-row
                    items-center space-x-2"
                    >
                        <CusIcon
                            name="arrow-back"
                            action={() => navigation.closeDrawer()}
                        />

                        <Text className="font-extrabold text-2xl">Menu</Text>
                    </View>
                    <CusIcon name="search" />
                </View>
                <TouchableWithoutFeedback
                    onPress={() =>
                        navigation.navigate("ProfileScreen", {
                            userId: u._id
                        })
                    }
                >
                    <View
                        className="profile flex-row items-center justify-between
            bg-white rounded-lg px-2 py-1 space-x-2 shadow-md shadow-shadow/40 w-full"
                    >
                        <View
                            className="relative h-12 w-12 rounded-full p-0.5 border
                    border-primary "
                        >
                            <Image
                                style={{ resizeMode: "contain" }}
                                className="w-full h-full rounded-full"
                                source={u.image}
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="capitalize font-black text-title">
                                {u.username}
                            </Text>
                            <Text className="text-body font-medium">
                                View your profile
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View className="flex-1 px-1">
                <ScrollView>
                    <View className="menus flex-row items-start  flex-wrap pb-10">
                        {drawerMenu.map(d => (
                            <TouchableWithoutFeedback
                                onPress={() => handleClicked(d.screen)}
                                key={d._id}
                            >
                                <View
                                    className="bg-white shadow-md shadow-black/60 px-4 py-5
                            mb-2 mx-1  grow border border-primary/10
                            rounded-lg  max-w-[200px] flex-row items-center
                            "
                                >
                                    <CusIcon name={d.outline} />
                                    <Text className="w-fit">{d.title}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        ))}
                    </View>
                </ScrollView>
            </View>

            <View className=" bg-white social flex-row items-center justify-between px-2">
                {socialmedia.map(s => (
                    <TouchableOpacity
                        key={s._id}
                        className="items-center"
                        onPress={() => Linking.openURL(s.link)}
                    >
                        <CusIcon name={s.icon} />
                        <Text className="capitalize text-primary">
                            {s.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};
export default DrawerContent;
