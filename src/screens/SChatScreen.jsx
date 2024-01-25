import { useState, useEffect } from "react";

import {
    View,
    Text,
    Image,
    FlatList,
    Linking,
    TouchableWithoutFeedback,
    Video,
    Modal,BackHandler
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { usersChat, currentUser } from "../lib/data";
("");
import { CusIcon, VideoPlayer } from "../components";
("");
import { getUser, AudioRecorder } from "../lib/utils";
import { SafeAreaView } from "react-native-safe-area-context";
const SChatScreen = ({ route, navigation }) => {
    const {
        recording,
        startRecording,
        stopRecording,
        downloadAndPlay,
        downloadAndSave
    } = AudioRecorder();
    const { hisId } = route.params;
    const myId = currentUser._id;
    const [chats, setChats] = useState({});
    const [curAction, setCurAction] = useState("typing");
    const [menu, setMenu] = useState(false);
    const [videoModal, setVideoModal] = useState(false);
    const handleMenu = () => {
        setMenu(prev => !prev);
    };

    const handleIsTyping = () => {
        return `is typing...`;
    };

    const handleDialPress = phoneNumber => {
        const dialUrl = `tel:${phoneNumber}`;

        // Check if the device supports the 'tel' scheme
        Linking.canOpenURL(dialUrl).then(supported => {
            if (supported) {
                // Open the phone dialer
                Linking.openURL(dialUrl);
            } else {
                console.error("Phone dialer not supported");
            }
        });
    };

    useEffect(() => {
        const backAction = () => {
            // Perform your function here
            const orientation = ScreenOrientation.OrientationLock.PORTRAIT;

            ScreenOrientation.lockAsync(orientation);
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => {
            backHandler.remove(); // Remove the event listener on component unmount
        };
    }, []);

    useEffect(() => {
        const getChats = () => {
            const chatId =
                Number(myId) < Number(hisId)
                    ? myId + "-" + hisId
                    : hisId + "-" + myId;
            const existChat = usersChat.find(c => c.chatId === chatId);
            setChats(existChat);
        };
        getChats();
    }, [hisId]);
    const hd = getUser(hisId);
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 bg-green-950">
                <View className="px-2 py-1 rounded-b-md flex-row items-center justify-between space-x-2  bg-white">
                    <View className="w-10 h-10 rounded-full border border-primary p-0.5">
                        <TouchableWithoutFeedback
                            onPress={() =>
                                navigation.navigate("ProfileScreen", {
                                    userId: hd._id
                                })
                            }
                        >
                            <Image
                                style={{ resizeMode: "cover" }}
                                className="w-full h-full rounded-full"
                                source={hd.image}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    <View className="flex-1">
                        <Text className="capitalize font-semibold text-md text-primary">
                            {hd.username}
                        </Text>

                        {handleIsTyping().length && (
                            <Text>{handleIsTyping()}</Text>
                        )}
                    </View>
                    <CusIcon
                        action={() => handleDialPress(hd.personal.phone)}
                        name="call"
                    />

                    <CusIcon
                        action={() => setMenu(prev => !prev)}
                        name="ellipsis-vertical"
                    />
                </View>
                {menu ? (
                    <View className="absolute bg-white shadow-lg shadow-black rounded-lg px-3 py-2 space-y-3 h-fit  right-6 top-10 z-10">
                        <Text onPress={() => handleMenu()}>
                            <CusIcon name="close-circle-outline" />
                            Block
                        </Text>
                        <Text
                            onPress={() => handleMenu()}
                            className="
                            w-fit"
                        >
                            <CusIcon name="folder-outline" /> media
                        </Text>
                        <Text onPress={() => handleMenu()} className="w-fit">
                            <CusIcon name="person-outline" /> view profile
                        </Text>
                    </View>
                ) : null}
                <View className="flex-1 px-2 py-2 ">
                    <FlatList
                        keyExtractor={m => m._id}
                        data={chats.messages}
                        renderItem={({ item: m }) =>
                            m ? (
                                <View
                                    className={`${
                                        m.senderId === currentUser._id
                                            ? "items-end"
                                            : "items-start"
                                    } py-2`}
                                >
                                    <View
                                        className={`${
                                            m.senderId === currentUser._id
                                                ? "rounded-tr-md "
                                                : "rounded-tl-md "
                                        } bg-white flex-row items-start px-2 py-2 rounded-b-md w-fit space-x-2  min-h-[50px]`}
                                    >
                                        {m.receiverId === currentUser._id ? (
                                            <View className="w-10 h-10 rounded-full border  border-primary p-0.5 ">
                                                <TouchableWithoutFeedback
                                                    onPress={() =>
                                                        navigation.navigate(
                                                            "ProfileScreen",
                                                            {
                                                                userId: hd._id
                                                            }
                                                        )
                                                    }
                                                >
                                                    <Image
                                                        style={{
                                                            resizeMode: "cover"
                                                        }}
                                                        className="w-full h-full rounded-full"
                                                        source={hd.image}
                                                    />
                                                </TouchableWithoutFeedback>
                                            </View>
                                        ) : null}

                                        <View className="max-w-[170px] h-full items-center flex-row">
                                            {m.message.includes("image") ? (
                                                <View className="w-[160px] h-44">
                                                    <Image
                                                        style={{
                                                            resizeMode: "cover"
                                                        }}
                                                        className="w-full h-full rounded-md"
                                                        source={hd.image}
                                                    />
                                                </View>
                                            ) : m.message.includes("audio") ? (
                                                <View className="flex-row items-center justify-between">
                                                    <CusIcon
                                                        action={() =>
                                                            startRecording()
                                                        }
                                                        name="mic"
                                                    />
                                                    <Text>Record</Text>
                                                    <CusIcon
                                                        action={() =>
                                                            stopRecording()
                                                        }
                                                        name="play"
                                                    />
                                                </View>
                                            ) : m.message.includes("video") ? (
                                                <View className="">
                                                    <CusIcon
                                                        nsme="play"
                                                        action={() =>
                                                            setVideoModal(
                                                                prev => !prev
                                                            )
                                                        }
                                                    />
                                                </View>
                                            ) : m.message.includes("upload") ? (
                                                <Text>doc {m.message}</Text>
                                            ) : (
                                                <Text>normal {m.message}</Text>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            ) : null
                        }
                    />
                </View>
            </View>
            {videoModal && (
                <Modal>
                    <CusIcon
                        name="close"
                        action={() => setVideoModal(prev => !prev)}
                    />
                    <VideoPlayer
                        navigation={navigation}
                        url={"../../assets/videos/vid.mp4"}
                    />
                </Modal>
            )}
        </SafeAreaView>
    );
};
export default SChatScreen;
