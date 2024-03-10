import { useState, useEffect, useContext } from "react";

import {
    View,
    Text,
    Image,
    FlatList,
    Linking,
    TouchableWithoutFeedback,
    Video,
    Modal,
    BackHandler
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { usersChat } from "../lib/data";
("");
import {
    CusIcon,
    VideoPlayer,
    AudioMsg,
    VideoMsg,
    ImageMsg,
    NormalMsg,
    DocMsg,
    ContactMsg,
    ReplyMsg,
    Messanger
} from "../components";
("");
import { getUser, AudioRecorder, processText } from "../lib/utils";
import { GlobalContext } from "../hooks/GlobalContext";
import { SafeAreaView } from "react-native-safe-area-context";
const SChatScreen = ({ route, navigation }) => {
    const { currentUser, getReceiver } = useContext(GlobalContext);
    const {
        recording,
        startRecording,
        stopRecording,
        downloadAndPlay,
        downloadAndSave
    } = () => AudioRecorder();
    const { chat } = route.params;
    const [chats, setChats] = useState({});
    const hd = getReceiver(chat.chatId);
    const [curAction, setCurAction] = useState("typing");
    const [menu, setMenu] = useState(false);
    const [replyId, setReplyId] = useState("");
    const [videoModal, setVideoModal] = useState(false);
    const handleMenu = () => {
        setMenu(prev => !prev);
    };
    const handleReplyMessage = replyId => {
        const messageReplied = chat.messages.find(m => m._id === replyId);
        const message = messageReplied.message;
        const username =
            messageReplied.senderId === currentUser._id
                ? "You"
                : getUser(messageReplied.senderId).username;
        return [username, message];
    };

    const handleIsTyping = () => {
        return `is typing...`;
    };
    const handleContact = contact => {
        const contactArray = contact.split("contact");

        return contactArray;
    };
    const handleDialPress = async phoneNumber => {
        const dialUrl = `tel:${phoneNumber}`;
        // Check if the device supports the 'tel' scheme
        Linking.openURL(dialUrl);

        // Open the phone dialer
        //     try {
        //       const supported = await Linking.canOpenURL(dialUrl);
        //       if (supported)
        //       {
        //         Linking.openURL(dialUrl);
        //   } else {
        //     throw new Error(supported);
        // }

        //     } catch (err) {
        //         console.error("not supported" + err);
        //     }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 bg-green-950">
                <View
                    className="px-2 py-1 rounded-b-md flex-row items-center
                justify-between space-x-2  bg-background"
                >
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
                        <View className="flex-row items-center space-x-1">
                            <CusIcon
                                name="close-circle-outline"
                                color="text-danger"
                                action={() => handleMenu()}
                            />
                            <Text>Block</Text>
                        </View>
                        <View className="flex-row items-center space-x-1">
                            <CusIcon
                                name="folder-outline"
                                color="text-primary"
                                action={() => handleMenu()}
                            />
                            <Text>Media</Text>
                        </View>
                        <View className="flex-row items-center space-x-1">
                            <CusIcon
                                name="person-outline"
                                color="text-primary"
                                action={() => handleMenu()}
                            />
                            <Text>profile</Text>
                        </View>
                    </View>
                ) : null}
                <View className="flex-1 px-2 py-2 ">
                    <FlatList
                        keyExtractor={m => m._id}
                        data={chat.messages}
                        renderItem={({ item: m }) =>
                            m ? (
                                <TouchableWithoutFeedback
                                    onLongPress={() => setReplyId(m._id)}
                                >
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
                                            }  bg-background 
                                        rounded-b-md w-[60%]
                              justify-center          min-h-[50px]`}
                                        >
                                            {m.replyId.length ? (
                                                <ReplyMsg
                                                    sender={m.senderId}
                                                    currentUser={
                                                        currentUser._id
                                                    }
                                                    message={
                                                        handleReplyMessage(
                                                            m.replyId
                                                        )[1]
                                                    }
                                                    username={
                                                        handleReplyMessage(
                                                            m.replyId
                                                        )[0]
                                                    }
                                                />
                                            ) : null}
                                            <View
                                                className="flex-row
                      items-start space-x-1 px-2 py-1 flex-1"
                                            >
                                                {m.receiverId ===
                                                currentUser._id ? (
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
                                                                    resizeMode:
                                                                        "cover"
                                                                }}
                                                                className="w-full h-full rounded-full"
                                                                source={
                                                                    hd.image
                                                                }
                                                            />
                                                        </TouchableWithoutFeedback>
                                                    </View>
                                                ) : null}
                                                <View className="flex-1 items-center flex-row">
                                                    {m.documents.includes(
                                                        "image"
                                                    ) ? (
                                                        <ImageMsg
                                                            CusIcon={CusIcon}
                                                            documents={
                                                                m.documents
                                                            }
                                                            message={m.message}
                                                        />
                                                    ) : m.documents.includes(
                                                          "audio"
                                                      ) ? (
                                                        <AudioMsg
                                                            documents={
                                                                m.documents
                                                            }
                                                            CusIcon={CusIcon}
                                                            message={m.message}
                                                        />
                                                    ) : m.documents.includes(
                                                          "video"
                                                      ) ? (
                                                        <VideoMsg
                                                            documents={
                                                                m.documents
                                                            }
                                                            CusIcon={CusIcon}
                                                            message={m.message}
                                                        />
                                                    ) : m.documents.includes(
                                                          "doc"
                                                      ) ? (
                                                        <DocMsg
                                                            documents={
                                                                m.documents
                                                            }
                                                            CusIcon={CusIcon}
                                                            processText={
                                                                processText
                                                            }
                                                            message={m.message}
                                                        />
                                                    ) : m.documents.includes(
                                                          "contact"
                                                      ) ? (
                                                        <ContactMsg
                                                            documents={
                                                                m.documents
                                                            }
                                                            CusIcon={CusIcon}
                                                            handleDialPress={
                                                                handleDialPress
                                                            }
                                                            processText={
                                                                processText
                                                            }
                                                            handleContact={
                                                                handleContact
                                                            }
                                                            message={m.message}
                                                        />
                                                    ) : (
                                                        <NormalMsg
                                                            CusIcon={CusIcon}
                                                            message={m.message}
                                                        />
                                                    )}
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            ) : null
                        }
                    />
                </View>
                <Messanger
                    setReplyId={setReplyId}
                    processText={processText}
                    handleReplyMessage={handleReplyMessage}
                    senderId={currentUser._id}
                    receiverId={hd._id}
                    replyId={replyId}
                />
            </View>
        </SafeAreaView>
    );
};
export default SChatScreen;
