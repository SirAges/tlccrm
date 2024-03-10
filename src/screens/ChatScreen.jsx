import { useState, useEffect, useContext } from "react";
import {
    Image,
    View,
    Text,
    FlatList,TouchableOpacity,
    TouchableWithoutFeedback
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { users } from "../lib/data";
import { usersChat } from "../lib/userschat";
import { GlobalContext } from "../hooks/GlobalContext";
import {
    checkUserInContact,
    getTime,
    processText,
    getUser
} from "../lib/utils";
import { ChatFilter, Separator } from "../components";
import * as Contacts from "expo-contacts";

const ChatScreen = ({ navigation }) => {
    const online = true;
    const { currentUser,getReceiver } = useContext(GlobalContext);
    const [contacts, setContacts] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [chatUsers, setChatUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState(null);

    const [lastMessage, setLastMessage] = useState("");
    const [unSeenCount, setUnseenCount] = useState("");

    useEffect(() => {
        const phoneUsers = checkUserInContact(contacts, users);
        setAllUsers(phoneUsers);
    }, [contacts, users]);

    useEffect(() => {
        const myChats = usersChat.filter(c => {
            const ids = c.chatId.split("-");
            return ids.includes(currentUser._id);
        });

        setChatUsers(myChats);
    }, []);

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

    const unSeen = messages => {
        const count = messages.filter(u => !u.seen).length;
        if (!count) return null;
        return count;
    };
    

    return (
        <SafeAreaView className=" flex-1  bg-white ">
            <View className="bg-background-dark bg-green-950 flex-1">
                <View className=""></View>
                <FlatList
                    keyExtractor={u => u._id}
                    data={chatUsers}
                    renderItem={({ item: c }) => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("SChatScreen", { chat: c })
                            }
                        >
                            <>
                                <View
                                    className="flex-row space-x-2  
                          px-2 py-2
                    items-center justify-between"
                                >
                                    <View
                                        className="w-12 h-12 rounded-full p-0.5 border
                    boreder-primary"
                                    >
                                        <Image
                                            style={{ resizeMode: "cover" }}
                                            className="w-full h-full rounded-full"
                                            source={getReceiver(c.chatId).image}
                                        />

                                        <Text
                                            className={`absolute ${
                                                getReceiver(c.chatId)
                                                    .onlineStatus.status
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
                                            @{getReceiver(c.chatId).username}
                                        </Text>
                                        <Text className="text-body">
                                            {c.messages[0].message}
                                        </Text>
                                    </View>
                                    {unSeen(c.messages) && (
                                        <View
                                            className="justify-center items-center
                            bg-white rounded-full h-7 w-7"
                                        >
                                            <Text className="font-medium text-primary">
                                                {unSeen(c.messages)}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};
export default ChatScreen;
