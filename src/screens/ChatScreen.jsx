import { useState, useEffect, useContext } from "react";
import {
    Image,
    View,
    Text,
    FlatList,
    TouchableWithoutFeedback
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalContext } from "../hooks/GlobalContext";
import { checkUserInContact, getTime, processText } from "../lib/utils";
import {
    ChatFilter,
    Separator,
    ContactList,
    CusIcon,
    ScreenLoader,
    Loader
} from "../components";
import {
    useGetUserchatsQuery,
    useDeleteUserchatMutation
} from "../redux/userchat/userchatApiSlice.js";
import * as Contacts from "expo-contacts";

const ChatScreen = ({ navigation }) => {
    const {
        data: chats,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetUserchatsQuery("chatslist");

    const [deleteUserChat] = useDeleteUserchatMutation();
    const online = true;
    const { currentUser, getReceiver, getUser, users } =
        useContext(GlobalContext);
    const [contacts, setContacts] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [chatUsers, setChatUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [contactsModal, setContactsModal] = useState(false);
    const [lastMessage, setLastMessage] = useState("");
    const [unSeenCount, setUnseenCount] = useState("");

    useEffect(() => {
        const phoneUsers = checkUserInContact(contacts, users);
        setAllUsers(phoneUsers);
    }, [contacts, users]);
    useEffect(() => {
        const getMyChats = () => {
            setLoading(true);
            try {
                if (chats && chats !== undefined) {
                    const myChats = chats.filter(c => {
                        const ids = c?.chatId.split("-");
                        return ids.includes(currentUser._id);
                    });

                    setChatUsers(myChats);
                }
            } catch (error) {
                console.log("error", error);
            } finally {
                setLoading(false);
            }
        };
        getMyChats();
    }, [chats]);

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();

            if (status === "granted") {
                const { data } = await Contacts.getContactsAsync({
                    fields: [
                        Contacts.Fields.PhoneNumbers,
                        Contacts.Fields.Emails
                    ]
                });

                if (data.length > 0) {
                    setContacts(data);
                }
            }
        })();
    }, []);
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
    const deleteChat = async clicked => {
        setDeleting(true);
        try {
            const res = await deleteUserChat(clicked);
        } catch (error) {
            console.log("error", error);
        } finally {
            setDeleting(false);
        }
    };
    const unSeen = messages => {
        const count = messages.filter(u => !u.seen).length;
        if (!count) return null;
        return count;
    };

    const receiverId = chatId => {
        const ids = chatId.split("-");

        return ids[0] === currentUser._id ? ids[1] : ids[0];
    };

    let content;
    content = (
        <FlatList
            keyExtractor={u => u._id}
            refreshing={isRefreshing}
            onRefresh={refresh}
            data={chatUsers}
            renderItem={({ item: c }) => (
                <TouchableWithoutFeedback
                    className="flex-1"
                    onPress={() =>
                        navigation.navigate("SChatScreen", { chatId: c.chatId })
                    }
                >
                    <View
                        className="w-full bg-black/20 flex-row space-x-2  mt-2
                          px-2 py-2
                    items-center justify-between"
                    >
                        <View className="w-12 h-12 rounded-full p-0.5 bg-primary">
                            <Image
                                style={{ resizeMode: "cover" }}
                                className="w-full h-full rounded-full"
                                source={{
                                    uri: getUser(receiverId(c.chatId), "image")
                                }}
                            />

                            <Text
                                className={`absolute ${
                                    getUser(receiverId(c.chatId), "username")
                                        ? "bg-primary"
                                        : "bg-body"
                                } rounded-full
                                        h-3 w-3 border border-white/40 `}
                            />
                        </View>
                        <View className="flex-1 space-y-1">
                            <Text
                                className="text-white font-semibold
                                capitalize"
                            >
                                @{getUser(receiverId(c.chatId), "username")}
                            </Text>
                            <Text className="text-background">
                                {c?.messages[0]?.message}
                            </Text>
                        </View>
                        {unSeen(c?.messages) && (
                            <View
                                className="justify-center items-center
                            bg-white rounded-full h-7 w-7"
                            >
                                <Text className="font-medium text-primary">
                                    {unSeen(c?.messages)}
                                </Text>
                            </View>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            )}
        />
    );

    if ((!loading && !chatUsers.length) || isError || error?.data)
        content = (
            <ScreenLoader refresh={refresh} text="no content try again..." />
        );
    if (loading || isLoading) content = <ScreenLoader text="loading data..." />;
    return (
        <SafeAreaView className=" flex-1  bg-white ">
            <View className="bg-primary flex-1 px-1">{content}</View>
            <ContactList
                allUsers={allUsers}
                setAllUsers={setAllUsers}
                contactsModal={contactsModal}
                setContactsModal={setContactsModal}
                cId={currentUser._id}
                navigation={navigation}
            />
            <View className="absolute bottom-5 right-5">
                <CusIcon
                    action={() => setContactsModal(prev => !prev)}
                    name="people"
                />
            </View>
        </SafeAreaView>
    );
};
export default ChatScreen;
