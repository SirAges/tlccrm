import { useState, useEffect, useRef, useContext } from "react";

import {
    View,
    Text,
    Image,
    FlatList,
    Linking,
    TouchableWithoutFeedback,
    Video,
    Modal,
    BackHandler,
    Alert
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import Swipeout from "react-native-swipeout";

import { Swipeable } from "react-native-gesture-handler";

import {
    useGetUserchatsQuery,
    useAddNewUserchatMutation,
    useGetChatMessagesQuery,
    useAddNewChatMessageMutation,
    useUpdateChatMessageMutation,
    useDeleteChatMessageMutation
} from "../redux/userchat/userchatApiSlice.js";
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
    Messanger,
    ScreenLoader,
    Loader,
    Separator,
    SwipeableItem
} from "../components";
("");
import { AudioRecorder, processText } from "../lib/utils";
import { GlobalContext } from "../hooks/GlobalContext";
import { SafeAreaView } from "react-native-safe-area-context";
const SChatScreen = ({ route, navigation }) => {
    const { currentUser, getUser, value, setValue } = useContext(GlobalContext);
    const senderId = currentUser._id;
    const { receiverId: hisId, chatId: ids } = route.params;

    const splitIds = ids && ids.split("-");

    const receiverId = hisId
        ? hisId
        : splitIds[0] === currentUser._id
        ? splitIds[1]
        : splitIds[0];

    const hd = getUser(receiverId);

    const chatId = ids
        ? ids
        : senderId > receiverId
        ? `${receiverId}-${senderId}`
        : `${senderId}-${receiverId}`;

    const { data: chats } = useGetUserchatsQuery();
    const {
        data: messages,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetChatMessagesQuery(chatId);
    const [deleteChatMessage] = useDeleteChatMessageMutation();

    const [updateChatMessage] = useUpdateChatMessageMutation();
    const [addNewChatMessage] = useAddNewChatMessageMutation();
    const [addNewUserChat] = useAddNewUserchatMutation();

    const {
        recording,
        startRecording,
        stopRecording,
        downloadAndPlay,
        downloadAndSave
    } = () => AudioRecorder();
    const flatListRef = useRef(null);
    const [curAction, setCurAction] = useState("typing");
    const [message, setMessage] = useState("");
    const documents = value.documents || [];
    const [allMessages, setAllMessages] = useState([]);
    const [allChats, setAllChats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [idx, setIdx] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [updating, setUpdating] = useState(false);
    const [adding, setAdding] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [menu, setMenu] = useState(false);
    const [replyId, setReplyId] = useState(null);
    const [videoModal, setVideoModal] = useState(false);
    const handleMenu = () => {
        setMenu(prev => !prev);
    };
    const chatExist =
        chats &&
        chats !== undefined &&
        allChats?.find(c => c.chatId === chatId);

    useEffect(() => {
        const getMyMessages = () => {
            setLoading(true);
            try {
                if (messages && messages !== undefined) {
                    setAllMessages(messages);
                }
            } catch (error) {
                console.log("error", error);
            } finally {
                setLoading(false);
            }
        };
        getMyMessages();
    }, [messages]);
    useEffect(() => {
        const getMyChats = () => {
            setLoading(true);
            try {
                if (chats && chats !== undefined) {
                    const myChats = chats.filter(c => {
                        const ids = c.chatId.split("-");
                        return ids?.includes(currentUser._id);
                    });

                    setAllChats(myChats);
                }
            } catch (error) {
                console.log("error", error);
            } finally {
                setLoading(false);
            }
        };
        getMyChats();
    }, [chats]);

    const refresh = async () => {
        setIsRefreshing(true);
        setLoading(true);

        try {
            await refetch();
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };
    const deleteMessage = async clicked => {
        setDeleting(true);
        try {
            const res = await deleteChatMessage({ chatId, messageId: clicked });
            console.log("resdel", res);
        } catch (error) {
            console.log("error", error);
        } finally {
            setDeleting(false);
        }
    };
    const updateMessage = async clicked => {
        setDeleting(true);
        try {
            const res = await deleteUserChat(clicked);
        } catch (error) {
            console.log("error", error);
        } finally {
            setDeleting(false);
        }
    };
    const sendMessage = async clicked => {
        setAdding(true);
        const mymessage = {
            senderId,
            receiverId,
            message,
            documents,
            replyId
        };

        try {
            if (chatExist && chatExist !== undefined) {
                const res = await addNewChatMessage({
                    userchatId: chatId,
                    value: mymessage
                });
                console.log("oldchat", res);
                return;
            } else {
                const res = await addNewUserChat({
                    chatId,
                    value: message
                });
                console.log("newchat", res);

                return;
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setAdding(false);
            setMessage("");
            setValue(prev => ({ ...prev, documents: [] }));
            setReplyId(null);
            // flatListRef.current.scrollToEnd({ animated: true });
        }
    };

    const handleReplyMessage = replyId => {
        if (replyId) {
            const messageReplied = allMessages?.find(m => m?._id === replyId);
            const message = messageReplied?.message;
            const username =
                messageReplied?.senderId === currentUser._id
                    ? "You"
                    : getUser(messageReplied?.senderId, "username");
            return [username, message];
        }
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

        // try {
        //     const supported = await Linking.canOpenURL(dialUrl);
        //     if (supported) {
        //         Linking.openURL(dialUrl);
        //     } else {
        //         throw new Error(supported);
        //     }
        // } catch (err) {
        //     console.error("not supported" + err);
        // }
    };
    const handleSwiper = swiped => {
        setReplyId(null);
        setIdx(swiped);
    };
    let content;
    content = (
        <FlatList
            ref={flatListRef}
            className="px-3"
            keyExtractor={m => m?._id}
            refreshing={isRefreshing}
            onRefresh={refresh}
            onContentSizeChange={() => flatListRef.current.scrollToEnd()}
            data={allMessages}
            renderItem={({ item: m }) =>
                m ? (
                    <View
                        className={`${
                            m?.senderId === currentUser._id
                                ? "items-end"
                                : " items-start"
                        }   
                                         mt-2
                              justify-center`}
                    >
                        <View className="w-[60%]">
                            <SwipeableItem
                                gestureEnabled={idx !== m._id}
                                onSwipeLeft={() => deleteMessage(m._id)}
                                onSwipeRight={() => setReplyId(m._id)}
                            >
                                <View className="rounded-md justify-center bg-background ">
                                    <View>
                                        {m?.replyId ? (
                                            <ReplyMsg
                                                sender={m?.senderId}
                                                currentUser={currentUser._id}
                                                message={
                                                    handleReplyMessage(
                                                        m?.replyId
                                                    )[1]
                                                }
                                                username={
                                                    handleReplyMessage(
                                                        m?.replyId
                                                    )[0]
                                                }
                                            />
                                        ) : null}
                                        <View
                                            className="flex-row
                      items-center space-x-1"
                                        >
                                            {m?.receiverId ===
                                                currentUser._id &&
                                            !m?.documents[0]?.includes(
                                                "image"
                                            ) ? (
                                                <View
                                                    className="w-10 h-10
                                                rounded-full border
                                                border-primary m-1 p-0.5 "
                                                >
                                                    <TouchableWithoutFeedback
                                                        onPress={() =>
                                                            navigation.navigate(
                                                                "ProfileScreen",
                                                                {
                                                                    userId: hd?._id
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
                                                            source={{
                                                                uri: hd
                                                                    ?.image[0]
                                                            }}
                                                        />
                                                    </TouchableWithoutFeedback>
                                                </View>
                                            ) : null}

                                            {m?.documents[0]?.includes(
                                                "image"
                                            ) ? (
                                                <ImageMsg
                                                    CusIcon={CusIcon}
                                                    documents={m?.documents}
                                                    message={m?.message}
                                                />
                                            ) : m?.documents[0]?.includes(
                                                  "audio"
                                              ) ? (
                                                <AudioMsg
                                                    documents={m?.documents}
                                                    CusIcon={CusIcon}
                                                    message={m?.message}
                                                />
                                            ) : m?.documents[0]?.includes(
                                                  "video"
                                              ) ? (
                                                <VideoMsg
                                                    documents={m?.documents}
                                                    CusIcon={CusIcon}
                                                    message={m?.message}
                                                />
                                            ) : m?.documents[0]?.includes(
                                                  "doc"
                                              ) ? (
                                                <DocMsg
                                                    documents={m?.documents}
                                                    CusIcon={CusIcon}
                                                    processText={processText}
                                                    message={m?.message}
                                                />
                                            ) : m?.documents[0]?.includes(
                                                  "contact"
                                              ) ? (
                                                <ContactMsg
                                                    documents={m?.documents}
                                                    CusIcon={CusIcon}
                                                    handleDialPress={
                                                        handleDialPress
                                                    }
                                                    processText={processText}
                                                    handleContact={
                                                        handleContact
                                                    }
                                                    message={m?.message}
                                                />
                                            ) : (
                                                <NormalMsg
                                                    CusIcon={CusIcon}
                                                    message={m?.message}
                                                />
                                            )}
                                        </View>
                                    </View>
                                </View>
                            </SwipeableItem>
                        </View>
                    </View>
                ) : null
            }
        />
    );
    if (!loading && !allMessages?.length)
        content = (
            <ScreenLoader refresh={refresh} text="no content try again..." />
        );
    if (loading || isLoading) content = <ScreenLoader text="loading data..." />;
    return (
        <SafeAreaView className="flex-1  bg-background">
            <View className="bg-primary flex-1">
                <View
                    className="px-2 py-1 rounded-b-md flex-row items-center
                justify-between space-x-2  bg-background"
                >
                    <View className="w-10 h-10 rounded-full border border-primary p-0.5">
                        <TouchableWithoutFeedback
                            onPress={() =>
                                navigation.navigate("ProfileScreen", {
                                    userId: hd?._id
                                })
                            }
                        >
                            <Image
                                style={{ resizeMode: "cover" }}
                                className="w-full h-full rounded-full"
                                source={{ uri: hd?.image[0] }}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    <View className="flex-1">
                        <Text className="capitalize font-semibold text-md text-primary">
                            {hd?.username}
                        </Text>

                        {handleIsTyping()?.length && (
                            <Text>{handleIsTyping()}</Text>
                        )}
                    </View>
                    <CusIcon
                        action={() => handleDialPress(hd?.personal.phone)}
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
                <Separator />
                <View className="flex-1">{content}</View>
                <View>
                    <Messanger
                        adding={adding}
                        sendMessage={sendMessage}
                        setReplyId={setReplyId}
                        processText={processText}
                        handleReplyMessage={handleReplyMessage}
                        senderId={currentUser._id}
                        receiverId={receiverId}
                        replyId={replyId}
                        message={message}
                        setMessage={setMessage}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};
export default SChatScreen;
