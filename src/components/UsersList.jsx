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
import {
    useGetUserFriendsQuery,
    useAddNewUserFriendMutation,
    useDeleteUserFriendMutation,
    useGetUserRequestsQuery,
    useAddNewUserRequestMutation,
    useDeleteUserRequestMutation
} from "../redux/user/userApiSlice";
import { useGetUserMutation } from "../redux/user/userApiSlice";
import { GlobalContext } from "../hooks/GlobalContext";
const UsersList = ({ from, modal, setModal, userId, cUser, navigation }) => {
    const { getUser } = useContext(GlobalContext);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);

    const [accepting, setAccepting] = useState(false);
    const [acceptingItem, setAcceptingItem] = useState(null);

    const [allData, setAllData] = useState([]);
    const [dropdown, setDropdown] = useState(false);
    const [idx, setIdx] = useState(false);

    const { data, isLoading, isSuccess, isError, error, refetch } =
        from === "requests"
            ? useGetUserRequestsQuery({ userId })
            : useGetUserFriendsQuery({ userId });

    const [addNewUserRequest] = useAddNewUserRequestMutation();
    const [addNewUserFriend] = useAddNewUserFriendMutation();
    const [deleteUserRequest] = useDeleteUserRequestMutation();
    const [deleteUserFriend] = useDeleteUserFriendMutation();

    useEffect(() => {
        try {
            setLoading(true);
            if (data && data !== undefined) {
                const sorted = data.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB - dateA;
                });

                setAllData(data);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }

        return () => setLoading(false);
    }, [data]);

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

    const handleOptions = id => {
        if (idx === id) {
            setDropdown(prev => !prev);
        } else {
            setIdx(id);
            setDropdown(true);
        }
    };

    const handleJoin = () => {
        const joinId = async () => {
            try {
                setLoading(true);
                const res = await addNewUserRequest({ userId });

                if (res?.error) {
                    Alert.alert("Join This Ministry", res?.error?.data);
                }
            } catch (error) {
                console.log("errorjoin", error);
            } finally {
                setLoading(false);
            }
        };

        Alert.alert(
            "Join This Ministry",
            "Are you sure you want to join this ministry",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "Yes", onPress: () => joinId() }
            ]
        );
    };

    const handleAccept = () => {
        if (from === "friends") {
            setDropdown(false);
            setAccepting(false);
            setModal(false);
            navigation.navigate("DashboardScreen",{userId:idx});
        } else {
            const joinId = async () => {
                try {
                    setAccepting(true);
                    const res = await addNewUserFriend({
                        userId,
                        friendId: idx
                    });
                    await deleteUserRequest({ userId, requestId: idx });
                } catch (error) {
                    console.log("errorjoin", error);
                } finally {
                    setAccepting(false);
                    setModal(false);
                }
            };
            Alert.alert(
                "Join This Ministry",
                "Are you sure you want to join this ministry",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    { text: "Yes", onPress: () => joinId() }
                ]
            );
        }
    };

    const handleRemove = requestId => {
        const deleteItem = async () => {
            try {
                setDeleting(true);
                setDeletingItem(requestId);

                const res =
                    from === "requests"
                        ? await deleteUserRequest({ userId, requestId: idx })
                        : await deleteUserFriend({ userId, friendId: idx });
            } catch (error) {
                throw new Error(error.message);
            } finally {
                setDeleting(false);
                setDeletingItem(null);
                setIdx(null);
                setDropdown(false);
            }
        };
        Alert.alert(
            "Delete This Ministry",
            "Are you sure you want to delete this ministry",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteItem() }
            ]
        );
    };

    useEffect(() => {
        const backAction = () => {
            if (modal) {
                setDropdown(false);
                setModal(false);
                return true; // Prevent default behavior (exit the app)
            }
            return false; // Default behavior (exit the app)
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove(); // Cleanup the event listener on component unmount
    }, [modal]);

    const options = [
        {
            name: "chat with friend",
            undo: "accept",
            func: handleAccept,
            loader: accepting,
            icon: null,
            cond: from === "requests"
        },
        {
            name: "remove friend",
            undo: "reject",
            func: handleRemove,
            loader: deleting,
            icon: null,
            cond: from === "requests"
        }
    ];

    let content;

    content = (
        <FlatList
            keyExtractor={u => u}
            data={allData}
            refreshing={isRefreshing}
            onRefresh={refresh}
            renderItem={({ item: u }) => (
                <View>
                    <View className="flex-row items-center">
                        <View
                            className="flex-1 flex-row items-center space-x-2
                justify-between
                                    px-2 py-3 bg-white
                          "
                        >
                            <View
                                className="w-12 h-12 rounded-full p-0.5 border
                    border-primary"
                            >
                                <Image
                                    style={{ resizeMode: "cover" }}
                                    className="w-full h-full rounded-full"
                                    source={{
                                        uri: getUser(u, "image")
                                    }}
                                />
                            </View>
                            <Text className="capitalize font-medium text-primary">
                                {getUser(u, "username")}
                            </Text>
                            <View className="flex-1 items-end relative">
                                <CusIcon
                                    name="ellipsis-vertical"
                                    action={() => handleOptions(u)}
                                />
                            </View>
                        </View>
                    </View>
                    <Separator />
                </View>
            )}
        />
    );
    if (isError || error?.data)
        content = (
            <ScreenLoader refresh={refresh} text="no content try again..." />
        );
    if (isLoading || loading) content = <ScreenLoader text="loading data..." />;

    return (
        <Modal
            className="w-full h-full"
            animationType="slide"
            transparent={false}
            visible={modal}
            onRequestClose={() => setModal(false)}
        >
            <View className="flex-1 bg-background ">
                <View className="px-5 py-2 bg-background flex-row items-center space-x-2">
                    <View
                        className="justify-center items-center bg-primary
                        h-7 w-7  rounded-full"
                    >
                        <Text className="font-semibold text-white ">
                            {roundNumber(allData?.length)}
                        </Text>
                    </View>
                    <Text className="font-semibold capitalize text-title">
                        {from}
                    </Text>
                </View>
                {content}
                <View className="absolute top-1 right-4">
                    <CusIcon
                        action={() => setModal(prev => !prev)}
                        bg="bg-primary"
                        color="text-white"
                        name="close"
                    />
                </View>
            </View>
            {dropdown && idx && (
                <ButtomMenu
                    title="group requests"
                    options={options}
                    setPopup={setDropdown}
                    idx={idx}
                />
            )}
        </Modal>
    );
};
export default UsersList;
