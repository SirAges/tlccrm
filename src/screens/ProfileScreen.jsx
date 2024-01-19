import { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
    Modal
} from "react-native";
import { CusIcon } from "../components/";
import { getUser, formatDateAgo, roundNumber } from "../lib/utils";
import { currentUser } from "../lib/data";
const ProfileScreen = ({ route, navigation }) => {
    const { userId } = route.params;
    const u = getUser(userId);

    const [userData, setUserData] = useState({});
    const [keyToEdit, setKeyToEdit] = useState(null);
    const [editDialog, setEditDialog] = useState(false);

    const addNewCompanion = () => {
        //addNewCompanion
    };
    const removeCompanion = () => {
        //removeCompanion
    };
    const viewProfile = key => {
        setUserData(prev => ({ ...prev, [key]: "hello" }));
        Alert.alert(`${userData[key]}`);
    };
    const editProfile = key => {
        Alert.alert(`${userData[key]}`);
    };

    return (
        <View className="bg-white h-full w-full flex-1">
            <View className="relative image h-60 w-full bg-black">
                <TouchableOpacity
                    onPress={() => viewProfile("username")}
                    onLongPress={() => editProfile("username")}
                >
                    <Image
                        className="opacity-90 h-full w-full"
                        style={{ resizeMode: "cover" }}
                        source={u.cImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => viewProfile("username")}
                    onLongPress={() => editProfile("username")}
                >
                    <Image
                        className=" rounded-full bottom-5 left-5 absolute h-24 w-24"
                        style={{ resizeMode: "cover" }}
                        source={u.image}
                    />
                </TouchableOpacity>
                <View className="absolute right-3 bottom-3 flex-row items-center space-x-2 bg-background p-0.5 rounded-sm">
                    <Text className="text-sm font-semibold">Online</Text>
                    {u.onlineStatus.status ? (
                        <Text className="h-2 w-2 bg-primary rounded-full"></Text>
                    ) : (
                        <Text>{formatDateAgo(u.onlineStatus.timestamp)}</Text>
                    )}
                </View>
            </View>
            <></>

            <View className="head px-2 space-y-3 ">
                <View className="flex-row items-center justify-between">
                    <View className="">
                        <Text className="text-body text-sm capitalize">
                            {" "}
                            username
                        </Text>
                        <Text className="uppercase text-md font-extrabold text-black">
                            @{u.username}
                        </Text>
                    </View>
                    <CusIcon
                        size={20}
                        name={
                            u.isVerified
                                ? !u.department.includes("pastor")
                                    ? "medal"
                                    : u.department.includes("pastor")
                                    ? "medal"
                                    : "ribbon"
                                : "prism"
                        }
                        color={
                            u.isVerified
                                ? !u.department.includes("pastor")
                                    ? "text-primary"
                                    : u.department.includes("pastor")
                                    ? "text-yellow-500"
                                    : "text-red-500"
                                : "text-gray-500"
                        }
                    />
                    <View className="">
                        <Text className="text-body capitalize text-sm">
                            Joined
                        </Text>
                        <Text className="font-semibold">{u.dateJoined}</Text>
                    </View>
                </View>
                <View className="flex-row items-center space-x-3">
                    <Text className="text-body capitalize text-sm">
                        Department
                    </Text>
                    <View className="flex-row items-center space-x-2">
                        {u.department.map(d => (
                            <Text className="px-1 py-0.5 bg-gray-200 rounded-sm shadow-xs shadow-black font-semibold capitalize">
                                {d}
                            </Text>
                        ))}
                    </View>
                </View>
                <View className="flex-row items-center space-x-2">
                    <Text className="capitalize text-body text-sm">
                        Ministry
                    </Text>
                    <Text className="capitalize font-semibold text-sm">
                        {u.ministry} Ministry
                    </Text>
                </View>
                <View className="py-2 space-y-3">
                    <View className="flex-row items-center space-x-2 pl-5">
                        <Text className="text-lg font-extrabold">
                            {roundNumber(u.friends.length)}
                        </Text>
                        <Text className="capitalize text-body text-sm ">
                            Companions
                        </Text>
                    </View>
                    {currentUser._id !== userId && (
                        <View className="flex-row items-center justify-between">
                            <Text
                                onPress={() =>
                                    navigation.navigate("SChatScreen", userId)
                                }
                                className="bg-primary px-2 py-1 rounded-md text-white font-semibold capitalize"
                            >
                                Chat companion
                            </Text>
                            <Text
                                onPress={removeCompanion}
                                className="bg-primary px-2 py-1 rounded-md text-white font-semibold capitalize"
                            >
                                remove companion
                            </Text>
                        </View>
                    )}
                    <ScrollView className="w-full" horizontal={true}>
                        <View className="flex-row items-center space-x-2 ">
                            {u.friends.map(f => (
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate("ProfileScreen", {
                                            userId: f
                                        })
                                    }
                                    className="items-center"
                                >
                                    <View className="rounded-full h-10 w-10 bg-background p-0.5">
                                        <Image
                                            style={{
                                                resizeMode: "cover"
                                            }}
                                            className="w-full h-full rounded-full"
                                            source={getUser(f).image}
                                        />
                                    </View>
                                    <Text className="capitalize text-black text-[10px] font-semibold">
                                        {getUser(f).username}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                    <View className="absolute right-2 -top-2">
                        <CusIcon
                            bg="bg-primary"
                            action={() => addNewCompanion()}
                            color="text-white"
                            name="add"
                        />
                    </View>
                </View>
            </View>

            <ScrollView className="w-full">
                <View className="  px-2 ">
                    <Text className="capitalize text-[14px] text-primary font-semibold">
                        more Info:
                    </Text>
                    {Object.entries(u.personal).map(([key, value]) => (
                        <>
                            {!u.hidden.includes(key) && (
                                <View className="flex-row items-start space-x-3 pb-2 w-72">
                                    <Text className="font-extrabold text-md capitalize">
                                        {key}:
                                    </Text>
                                    <View className=" items-start">
                                        {key === "resident" ? (
                                            Object.entries(value).map(
                                                ([skey, svalue]) => (
                                                    <View className=" flex-row items-center space-x-3 pb-2">
                                                        <Text className="font-extrabold text-md capitalize">
                                                            {skey}:
                                                        </Text>
                                                        <Text className="text-title capitalize text-sm">
                                                            {svalue}
                                                        </Text>
                                                    </View>
                                                )
                                            )
                                        ) : (
                                            <View className="">
                                                <Text className="text-title capitalize text-sm">
                                                    {value}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            )}
                        </>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};
export default ProfileScreen;
