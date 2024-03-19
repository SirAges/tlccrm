import { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    FlatList,
    Alert,
    Modal,
    BackHandler
} from "react-native";
import { processText, formatDateTime, roundNumber } from "../lib/utils";
import {
    AddButton,
    CusIcon,
    SearchFilter,
    Separator,
    Reactions,
    CardActions,
    UserCard,
    ScreenLoader,
    Loader,
    ButtomMenu
} from "../components";

const ContactList = ({
    allUsers,
    setAllUsers,
    contactsModal,
    setContactsModal,
    cId,
    navigation
}) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [idx, setIdx] = useState(false);

    useEffect(() => {
        const backAction = () => {
            if (contactsModal) {
                setDropdown(false);
                setContactsModal(false);
                return true; // Prevent default behavior (exit the app)
            }
            return false; // Default behavior (exit the app)
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove(); // Cleanup the event listener on component unmount
    }, [contactsModal]);
    const handleOptions = id => {
        if (idx === id) {
            setDropdown(prev => !prev);
        } else {
            setIdx(id);
            setDropdown(true);
        }
    };
    const handleChat = clicked => {
        setContactsModal(false);
        navigation.navigate("SChatScreen", { receiverId: idx });
    };
    const refresh = async () => {
        setIsRefreshing(true);
        setLoading(true);

        try {
            return null;
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };
    const options = [
        {
            name: "chat with me",
            undo: "chat with me",
            func: handleChat,
            loader: null,
            icon: null,
            cond: null
        }
    ];

    let content;

    content = (
        <FlatList
            keyExtractor={m => m}
            data={allUsers}
            refreshing={isRefreshing}
            onRefresh={refresh}
            renderItem={({ item: m }) =>
                m._id === cId && (
                    <UserCard userId={m._id} handleOptions={handleOptions} />
                )
            }
        />
    );
    if (!loading && !allUsers)
        content = (
            <ScreenLoader refresh={refresh} text="no content try again..." />
        );
    if (loading) content = <ScreenLoader text="loading data..." />;

    return (
        <Modal
            className="w-full h-full"
            animationType="slide"
            transparent={false}
            visible={contactsModal}
            onRequestClose={() => setContactsModal(false)}
        >
            <View className="flex-1 bg-background ">
                <View
                    className="px-5 py-5 bg-primary flex-row items-center
                justify-between space-x-2"
                >
                    {allUsers.length > 0 && (
                        <View
                            className="justify-center items-center bg-black
                        h-7 w-7  rounded-full"
                        >
                            <Text className="font-semibold text-white ">
                                {roundNumber(allUsers?.length - 1)}
                            </Text>
                        </View>
                    )}
                    <Text
                        className="font-semibold capitalize
                    text-white"
                    >
                        {allUsers.length < 2
                            ? "No registered user in your contact"
                            : "Registered Contacts"}
                    </Text>
                    <View className="">
                        <CusIcon
                            action={() => setContactsModal(prev => !prev)}
                            color="text-danger"
                            name="close"
                        />
                    </View>
                </View>
                {content}
            </View>
            {dropdown && idx && (
                <ButtomMenu
                    title="Users"
                    options={options}
                    setPopup={setDropdown}
                    idx={idx}
                />
            )}
        </Modal>
    );
};
export default ContactList;
