import { useState, useEffect, useRef, useContext } from "react";
import { drawerMenu, socialmedia } from "../lib/data";
import { setLocalStorage } from "../lib/utils";
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
import { GlobalContext } from "../hooks/GlobalContext";
import { useLogoutMutation } from "../redux/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/auth/authSlice";
export const DrawerContent = ({ navigation, props }) => {
    const dispatch = useDispatch();
    const handleClicked = screen => {
        navigation.navigate(screen);
    };
    const { currentUser: u, setPersist } = useContext(GlobalContext);
    const [logout, { isLoading }] = useLogoutMutation();

    const handleLogout = async () => {
        const { data } = await logout();

        if (data) {
            dispatch(logOut());
            setPersist(false);
        }
    };
    return (
        <SafeAreaView className="flex flex-1 space-y-2 bg-white">
            <View className="flex space-y-3 px-2">
                <View
                    className="backbtn justify-between flex-row items-center
               my-3"
                >
                    <View
                        className=" justify-between flex-row
                    items-center space-x-2"
                    >
                        <CusIcon
                            name="arrow-back"
                            color="text-primary"
                            action={() => navigation.closeDrawer()}
                        />

                        <Text className="font-extrabold text-2xl text-primary">
                            Menu
                        </Text>
                    </View>
                    <CusIcon
                        color="text-primary"
                        action={() => handleLogout()}
                        name="power"
                    />
                </View>
                <TouchableWithoutFeedback
                    onPress={() =>
                        u &&
                        navigation.navigate("ProfileScreen", {
                            userId: u._id
                        })
                    }
                >
                    <View
                        className="profile flex-row items-center justify-between
            bg-background rounded-lg px-2 py-1 space-x-2 shadow-md shadow-shadow/40 w-full"
                    >
                        <View
                            className="relative h-12 w-12 rounded-full p-0.5 border
                    border-primary "
                        >
                            <Image
                                style={{ resizeMode: "cover" }}
                                className="w-full h-full rounded-full"
                                source={{ uri: u?.image[0] }}
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="capitalize font-black text-title">
                                { u?.username}
                            </Text>
                            <Text className="text-body font-medium">
                                View your profile
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <View className="flex-1 px-1">
                <ScrollView className="flex-1">
                    <View className="menus flex-row items-start  flex-wrap pb-10">
                        {drawerMenu.map(d => (
                            <TouchableWithoutFeedback
                                onPress={() => handleClicked(d.screen)}
                                key={d._id}
                            >
                                <View
                                    className="bg-background px-4 py-5 mb-2 mx-1
                                grow justify-center max-w-[200px] space-x-2
                                flex-row items-center rounded-sm"
                                >
                                    <CusIcon name={d.outline} />
                                    <Text className="w-fit font-semibold">
                                        {d.title}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        ))}
                    </View>
                </ScrollView>
            </View>

            <View
                className=" bg-white social flex-row items-center
            justify-between px-2 space-y-2"
            >
                {socialmedia.map(s => (
                    <TouchableWithoutFeedback
                        key={s._id}
                        className="items-center"
                        onPress={() => Linking.openURL(s.link)}
                    >
                        <View>
                            <CusIcon name={s.icon} />
                            <Text className="capitalize text-primary">
                                {s.name}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </View>
        </SafeAreaView>
    );
};
export default DrawerContent;
