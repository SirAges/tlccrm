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
    Loader
} from "../components";
import {
    useGetMinMembersQuery,
    useAddNewMinMemberMutation,
    useDeleteMinMemberMutation,
    useAddNewMinBlockMutation,
    useGetMinBlocksQuery,
    useDeleteMinBlockMutation,
    useGetMinAdminsQuery,
    useDeleteMinAdminMutation,
    useAddNewMinAdminMutation
} from "../redux/ministry/ministryApiSlice";
import {
    useGetDeptMembersQuery,
    useAddNewDeptMemberMutation,
    useDeleteDeptMemberMutation,
    useAddNewDeptBlockMutation,
    useGetDeptBlocksQuery,
    useDeleteDeptBlockMutation,
    useGetDeptAdminsQuery,
    useDeleteDeptAdminMutation,
    useAddNewDeptAdminMutation
} from "../redux/department/departmentApiSlice";
import { useGetUserMutation } from "../redux/user/userApiSlice";

const MembersList = ({ from, membersModal, setMembersModal, cUser, minId }) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    const [blocking, setBlocking] = useState(false);
    const [blockItem, setBlockingItem] = useState(null);
    const [making, setMaking] = useState(false);
    const [makingItem, setMakingItem] = useState(null);

    const [allMembers, setAllMembers] = useState([]);
    const [dropdown, setDropdown] = useState(false);
    const [idx, setIdx] = useState(false);
    const [allBlocks, setAllBlocks] = useState([]);
    const [allAdmins, setAllAdmins] = useState([]);
    const {
        data: members,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = from === "ministry"
        ? useGetMinMembersQuery(minId)
        : useGetDeptMembersQuery(minId);
    const [
        addNewMember,
        { isSuccess: added, isError: addIsError, error: addError }
    ] =
        from === "ministry"
            ? useAddNewMinMemberMutation()
            : useAddNewDeptMemberMutation();
    const [deleteMember] =
        from === "ministry"
            ? useDeleteMinMemberMutation()
            : useDeleteDeptMemberMutation();
    const { data: admins } =
        from === "ministry"
            ? useGetMinAdminsQuery(minId)
            : useGetDeptAdminsQuery(minId);
    const [addNewAdmin] =
        from === "ministry"
            ? useAddNewMinAdminMutation()
            : useAddNewDeptAdminMutation();
    const [deleteAdmin] =from==="ministry"?
    useDeleteMinAdminMutation():useDeleteDeptAdminMutation();
    const { data: blocks } =from==="ministry"?
    useGetMinBlocksQuery(minId):useGetDeptBlocksQuery(minId);
    const [addNewBlock] =from==="ministry"?
    useAddNewMinBlockMutation():useAddNewDeptBlockMutation();
    const [deleteBlock] =from==="ministry"?
    useDeleteMinBlockMutation():useDeleteDeptBlockMutation();
    const inAdmins = allAdmins.find(a => idx === a);
    const inBlocks = allBlocks.find(b => b === idx);
    useEffect(() => {
        try {
            setLoading(true);
            if (members && members !== undefined) {
                const sorted = members.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB - dateA;
                });

                setAllMembers(members);
            }

            if (admins && admins !== undefined) {
                const sorted = admins.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB - dateA;
                });

                setAllAdmins(admins);
            }

            if (blocks && blocks !== undefined) {
                const sorted = blocks.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB - dateA;
                });

                setAllBlocks(blocks);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }

        return () => setLoading(false);
    }, [members, blocks, admins]);

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
        setFormArray(memberForm);
        setValue({
            title: "",
            image: [],
            body: ""
        });
        navigation.navigate("FeedForm", {
            name: "member",
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
                const res = await addNewMember({ minId, userId });

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

    const handleRemove = memberId => {
        const deleteItem = async () => {
            try {
                setDeleting(true);
                setDeletingItem(memberId);
                await deleteAdmin({ minId, adminId: memberId });
                await deleteBlock({ minId, blockId: memberId });
                const res = await deleteMember({ minId, memberId });
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
    const handleBlock = blockId => {
        const blockItem = async () => {
            try {
                setBlocking(true);
                setBlockingItem(blockId);
                if (inBlocks) {
                    const res = await deleteBlock({ minId, blockId });
                    console.log("block", res);
                } else {
                    const res = await addNewBlock({ minId, blockId });
                    console.log("block", res);
                }
            } catch (error) {
                console.log("del", error);
                throw new Error(error.message);
            } finally {
                setBlocking(false);
                setBlockingItem(null);
            }
        };
        Alert.alert(
            "Block This Ministry",
            "Are you sure you want to block this ministry",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => blockItem() }
            ]
        );
    };
    const handleMakeAdmin = adminId => {
        const makeAdminItem = async () => {
            try {
                setMaking(true);
                setMakingItem(adminId);
                if (inAdmins) {
                    const res = await deleteAdmin({ minId, adminId });
                    console.log("admin", res);
                } else {
                    const res = await addNewAdmin({ minId, adminId });
                    console.log("admin", res);
                }
            } catch (error) {
                console.log("del", error);
                throw new Error(error.message);
            } finally {
                setMaking(false);
                setMakingItem(null);
            }
        };
        Alert.alert(
            "MakeAdmin This Ministry",
            "Are you sure you want to makeAdmin this ministry",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => makeAdminItem() }
            ]
        );
    };

    useEffect(() => {
        const backAction = () => {
            if (membersModal) {
                setDropdown(false);
                setMembersModal(false);
                return true; // Prevent default behavior (exit the app)
            }
            return false; // Default behavior (exit the app)
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove(); // Cleanup the event listener on component unmount
    }, [membersModal]);

    let content;

    content = (
        <FlatList
            keyExtractor={m => m}
            data={allMembers}
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
            visible={membersModal}
            onRequestClose={() => setMembersModal(false)}
        >
            <View className="flex-1 bg-background ">
                <View className="px-5 py-2 bg-background flex-row items-center space-x-2">
                    <View
                        className="justify-center items-center bg-primary
                        h-7 w-7  rounded-full"
                    >
                        <Text className="font-semibold text-white ">
                            {roundNumber(members?.length)}
                        </Text>
                    </View>
                    <Text className="font-semibold capitalize text-title">
                        Members
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
                        action={() => setMembersModal(prev => !prev)}
                        bg="bg-primary"
                        color="text-white"
                        name="close"
                    />
                </View>
            </View>
            {dropdown && idx && (
                <TouchableWithoutFeedback onPress={() => setDropdown(false)}>
                    <View className="absolute bottom-0 h-full w-full bg-red-500 bg-transparent">
                        <View
                            className="w-full rounded-t-3xl absolute bottom-0
                items-start px-5 py-5 shadow-lg shadow-black
                bg-white max-h-56"
                        >
                            <Text className="capitalize w-full mb-3 font-bold text-xl text-center">
                                Group Member Options
                            </Text>
                            <ScrollView className="w-full">
                                <TouchableWithoutFeedback
                                    onPress={() => handleBlock(idx)}
                                >
                                    <View className="flex-row items-center mb-3">
                                        <CusIcon
                                            name="radio-button-on"
                                            color={
                                                inBlocks
                                                    ? "text-primary"
                                                    : "text-danger"
                                            }
                                        />
                                        <Text className="capitalize">
                                            {inBlocks ? "unblock" : "block"}
                                        </Text>
                                        {blocking && <Loader />}
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback
                                    onPress={() => handleRemove(idx)}
                                >
                                    <View className="flex-row mb-3  items-center">
                                        <CusIcon
                                            name="close"
                                            color="text-danger"
                                        />
                                        <Text className="capitalize">
                                            Remove
                                        </Text>
                                        {deleting && <Loader />}
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback
                                    onPress={() => handleMakeAdmin(idx)}
                                >
                                    <View className="flex-row mb-3 items-center">
                                        <CusIcon
                                            name="medal"
                                            color={
                                                inAdmins
                                                    ? "text-primary"
                                                    : "text-danger"
                                            }
                                        />
                                        <Text className="capitalize">
                                            {inAdmins
                                                ? "remove admin"
                                                : "make admin"}
                                        </Text>
                                        {making && <Loader />}
                                    </View>
                                </TouchableWithoutFeedback>
                            </ScrollView>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </Modal>
    );
};
export default MembersList;
