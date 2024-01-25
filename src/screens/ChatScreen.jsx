import { useState, useEffect } from "react";
import {
    Image,
    View,
    Text,
    FlatList,
    TouchableWithoutFeedback
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { users, usersChat, currentUser } from "../lib/data";

import { checkUserInContact, getTime, processText } from "../lib/utils";
import { ChatFilter } from "../components";
import * as Contacts from "expo-contacts";

const ChatScreen = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState(null);

    const [lastMessage, setLastMessage] = useState("");
    const [unSeenCount, setUnseenCount] = useState("");

    useEffect(() => {
        const phoneUsers = checkUserInContact(contacts, users);
        setAllUsers(phoneUsers);
    }, [contacts, users]);

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

    const handleLastMessage = (hisId, field) => {
        const myId = currentUser._id;

        const chatId =
            Number(myId) < Number(hisId)
                ? myId + "-" + hisId
                : hisId + "-" + myId;
        const existChat = usersChat.find(c => c.chatId === chatId);

        const lastMessageTime =
            existChat?.messages[existChat.messages.length - 1][field];
        if (field === "_createdAt") {
            const lastSeen = users.find(s => s._id === hisId);
            const time = lastSeen.onlineStatus.timestamp;

            return getTime(time);
        } else if (field == "message") {
            return processText(lastMessageTime, 20);
        } else {
            return existChat.messages.filter(s => s.seen === false).length;
        }
    };

    return (
        <SafeAreaView className=" flex-1  bg-white ">
            <View className="bg-background-dark bg-green-950 flex-1">
                <View className=""></View>
                <FlatList
                    keyExtractor={u => u._id}
                    data={allUsers}
                    renderItem={({ item: u }) => (
                        <>
                            <TouchableWithoutFeedback
                                onPress={() =>
                                    navigation.navigate("SChatScreen", {
                                        hisId: u._id
                                    })
                                }
                            >
                                <View className="flex-row items-center justify-between space-x-2 shadow-lg shadow-black/10 bg-white m-2 px-2  py-2 rounded-md">
                                    <View className="rounded-full border border-primary p-0.5 w-10  h-10 ">
                                        <Image
                                            className="rounded-full w-full h-full "
                                            style={{ resizeMode: "cover" }}
                                            source={u.image}
                                        />
                                    </View>
                                    <View className="flex-1 space-y-1">
                                        <Text className="font-semibold text-md capitalize text-primary ">
                                            @{u.username}
                                        </Text>
                                        <Text className="text-body ">
                                            {handleLastMessage(
                                                u._id,
                                                "message"
                                            )}
                                        </Text>
                                    </View>
                                    <View className="items-end justify-between">
                                        {!u.onlineStatus.status && (
                                            <Text className="capitalize font-semibold text-primary text-xs">
                                                Last Seen:{" "}
                                                {handleLastMessage(
                                                    u._id,
                                                    "_createdAt"
                                                )}
                                            </Text>
                                        )}
                                        <View className="rounded-full items-center justify-center text-center bg-primary  w-6 h-6">
                                            <Text className="text-white">
                                                {handleLastMessage(
                                                    u._id,
                                                    "newmsg"
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};
export default ChatScreen;
