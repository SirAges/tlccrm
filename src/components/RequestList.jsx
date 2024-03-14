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
    useGetMinRequestsQuery,
    useAddNewMinRequestMutation,
    useDeleteMinRequestMutation,
    useAddNewMinMemberMutation
} from "../redux/ministry/ministryApiSlice";
import {
    useGetDeptRequestsQuery,
    useAddNewDeptRequestMutation,
    useDeleteDeptRequestMutation,
    useAddNewDeptMemberMutation
} from "../redux/department/departmentApiSlice";
import { useGetUserMutation } from "../redux/user/userApiSlice";

const RequestsList = ({
    from,
    requestsModal,
    setRequestsModal,
    cUser,
    minId
}) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);

    const [accepting, setAccepting] = useState(false);
    const [acceptingItem, setAcceptingItem] = useState(null);

    const [allRequests, setAllRequests] = useState([]);
    const [dropdown, setDropdown] = useState(false);
    const [idx, setIdx] = useState(false);

    const {
        data: requests,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = from === "ministry"
        ? useGetMinRequestsQuery(minId)
        : useGetDeptRequestsQuery(minId);
    const [
        addNewRequest,
        { isSuccess: added, isError: addIsError, error: addError }
    ] =
        from === "ministry"
            ? useAddNewMinRequestMutation()
            : useAddNewDeptRequestMutation();
    const [deleteRequest] =
        from === "ministry"
            ? useDeleteMinRequestMutation()
            : useDeleteDeptRequestMutation();
    const [addNewMember] =
        from === "ministry"
            ? useAddNewMinMemberMutation()
            : useAddNewDeptMemberMutation();

    useEffect(() => {
        try {
            setLoading(true);
            if (requests && requests !== undefined) {
                const sorted = requests.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB - dateA;
                });

                setAllRequests(requests);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }

        return () => setLoading(false);
    }, [requests]);

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

    const handleNavigation = () => {
        setFormArray(requestForm);
        setValue({
            title: "",
            image: [],
            body: ""
        });
        navigation.navigate("FeedForm", {
            name: "request",
            action: "create",
            multiple: false,
            minId
        });
    };

    const handleJoin = () => {
        const joinId = async () => {
            const userId = cUser._id;

            try {
                setLoading(true);
                const res = await addNewRequest({ minId, userId });

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
        const joinId = async () => {
            const userId = cUser._id;

            try {
                setAccepting(true);
                const res = await addNewMember({ minId, userId });
                await handleRemove({ minId, userId });

                if (res?.error) {
                    Alert.alert("Join This Ministry", res?.error?.data);
                }
            } catch (error) {
                console.log("errorjoin", error);
            } finally {
                setAccepting(false);
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

    const handleRemove = requestId => {
        const deleteItem = async () => {
            try {
                setDeleting(true);
                setDeletingItem(requestId);

                const res = await deleteRequest({ minId, requestId });
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
            if (requestsModal) {
                setDropdown(false);
                setRequestsModal(false);
                return true; // Prevent default behavior (exit the app)
            }
            return false; // Default behavior (exit the app)
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove(); // Cleanup the event listener on component unmount
    }, [requestsModal]);

    const options = [
        {
            name: "accept",
            undo: "remove admin",
            func: handleAccept,
            loader: accepting,
            icon: null,
            cond: null
        },
        {
            name: "reject",
            undo: "reject",
            func: handleRemove,
            loader: deleting,
            icon: null,
            cond: null
        }
    ];

    let content;

    content = (
        <FlatList
            keyExtractor={m => m}
            data={allRequests}
            refreshing={isRefreshing}
            onRefresh={refresh}
            renderItem={({ item: m }) => (
                <UserCard
                    minId={minId}
                    userId={m}
                    handleOptions={handleOptions}
                />
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
            visible={requestsModal}
            onRequestClose={() => setRequestsModal(false)}
        >
            <View className="flex-1 bg-background ">
                <View className="px-5 py-2 bg-background flex-row items-center space-x-2">
                    <View
                        className="justify-center items-center bg-primary
                        h-7 w-7  rounded-full"
                    >
                        <Text className="font-semibold text-white ">
                            {roundNumber(requests?.length)}
                        </Text>
                    </View>
                    <Text className="font-semibold capitalize text-title">
                        Requests
                    </Text>

                    <Text
                        onPress={() => (loading ? null : handleJoin())}
                        className="flex-1 text-center text-primary
                        capitalize font-semibold text-xl"
                    >
                        Join
                    </Text>
                </View>
                {content}
                <View className="absolute top-1 right-4">
                    <CusIcon
                        action={() => setRequestsModal(prev => !prev)}
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
export default RequestsList;
