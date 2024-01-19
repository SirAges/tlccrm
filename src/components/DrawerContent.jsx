import { useState, useEffect, useRef } from "react";
import { drawerMenu, socialmedia } from "../lib/data";

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from "@react-navigation/drawer";
import { CusIcon } from "./";
import { useNavigation } from "@react-navigation/native";

import { Text, View, Image, TouchableOpacity,Linking}from "react-native";

export const DrawerContent = ({ navigation, props }) => {
    const handleClicked = screen => {
        navigation.navigate(screen);
    };

    return (
        <DrawerContentScrollView {...props}>
            <View
                className="flex-1  px-2 py-2 pb-6 bg-background min-h-screen
                space-y-2 
            "
            >
                <View
                    className="backbtn justify-between  flex-row items-center
        space-x-2 "
                >
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
                <View
                    className="profile flex-row items-center justify-between
            bg-white rounded-lg px-2 py-1 space-x-2 shadow-md shadow-shadow/40"
                >
                    <View
                        className="relative h-12 w-12 rounded-full p-0.5 border
                    border-primary "
                    >
                        <Image
                            style={{ resizeMode: "contain" }}
                            className="w-full h-full rounded-full"
                            source={require("../../assets/images/p.jpg")}
                        />
                    </View>
                    <View className="flex-1">
                        <Text className="font-black text-title">
                            Ekele stephen
                        </Text>
                        <Text className="text-body font-medium">
                            View your profile
                        </Text>
                    </View>
                </View>

                <View className="menus flex-row flex-wrap flex-1">
                    {drawerMenu.map(d => (
                        <TouchableOpacity
                            onPress={() => handleClicked(d.screen)}
                            key={d._id}
                            className="bg-white px-2 py-5 shadow-lg shadow-black
                            mb-2 grow
                            rounded-lg mr-2  max-w-fit flex-row items-center
                            "
                        >
                            <CusIcon name={d.outline} />
                            <Text className="w-fit">{d.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View className="social flex-row items-center justify-between px-2">
                    {socialmedia.map(s => (
                        <TouchableOpacity 
                        key={s._id}
                        className="items-center"
                        
                        onPress={()=>Linking.openURL(s.link)}>
                            <CusIcon name={s.icon} />
                            <Text className="capitalize text-primary">{s.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </DrawerContentScrollView>
    );
};
export default DrawerContent;
