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
import {} from "../lib/data";
import { announcementForm } from "../lib/forms";
import {
    AddButton,
    CusIcon,
    SearchFilter,
    Separator,
    Reactions,
    CardActions,
    ScreenLoader,
    Loader
} from "./";

import {
    useGetMinAnnouncementsQuery,
    useDeleteMinAnnouncementMutation
} from "../redux/ministry/ministryApiSlice";
import {
    useGetDeptAnnouncementsQuery,
    useDeleteDeptAnnouncementMutation
} from "../redux/department/departmentApiSlice";
import { GlobalContext } from "../hooks/GlobalContext";
const AnnouncementsList = ({
    from,
    minId,
    navigation,
    announcementsModal,
    setAnnouncementsModal
}) => {
    const { setValue, setFormArray } = useContext(GlobalContext);
    const [dropDown, setDropDown] = useState(false);
    const [idx, setIdx] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [allAnnouncements, setAllAnnouncements] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    const {
        data: announcements,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = from === "ministry"
        ? useGetMinAnnouncementsQuery(minId)
        : useGetDeptAnnouncementsQuery(minId);
    const [
        deleteAnnouncement,
        { isSuccess: deleted, isError: deleteIsError, error: deleteError }
    ] =
        from === "ministry"
            ? useDeleteMinAnnouncementMutation()
            : useDeleteDeptAnnouncementMutation();
    useEffect(() => {
        setLoading(true);
        try {
            if (announcements && announcements !== undefined) {
                const sorted = [...announcements].sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB - dateA;
                });

                setAllAnnouncements(announcements);
            }
        } catch (error) {
            console.log("announcementserror", error);
        } finally {
            setLoading(false);
        }

        return () => setLoading(false);
    }, [announcements]);
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

    const handleNavigation = () => {
        setFormArray(announcementForm);
        setValue({
            title: "",
            image: "",
            start: "",
            end: "",
            link: "",
            body: ""
        });
        setAnnouncementsModal(false);
        navigation.navigate(from==="ministry"?"FeedForm":"DFeedForm", {
            name: "announcement",
            action: "create",
            minId: minId,
            multiple: false
        });
    };

    const isExpired = date => {
        const currentDate = new Date();
        const endDate = new Date(date);
        return currentDate > endDate;
    };

    const handleDropdown = clicked => {
        if (clicked === idx) {
            setDropDown(prev => !prev);
        } else {
            setIdx(clicked);
            setDropDown(true);
        }
        console.log(idx);
    };
    useEffect(() => {
        if (filter && searchTerm) {
            const clickedArr = allAnnouncements.filter(
                f => f[filter].toLowerCase() === searchTerm.toLowerCase()
            );
            if (clickedArr.length) {
                setAllAnnouncements(clickedArr);
            } else {
                setAllAnnouncements(announcements);
            }
        } else {
            setAllAnnouncements(announcements);
        }
    }, [filter, searchTerm]);

    useEffect(() => {
        const backAction = () => {
            if (announcementsModal) {
                setAnnouncementsModal(false);
                return true; // Prevent default behavior (exit the app)
            }
            return false; // Default behavior (exit the app)
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove(); // Cleanup the event listener on component unmount
    }, [announcementsModal]);
    const handleDelete = announcementId => {
        const deleteItem = async () => {
            try {
                setDeleting(true);
                setDeletingItem(announcementId);
                const res = await deleteAnnouncement({ minId, announcementId });
                console.log("delerr", res);
            } catch (error) {
                console.log("del", deleteError);
                throw new Error(error.message);
            } finally {
                setDeleting(false);
                setDeletingItem(null);
            }
        };
        Alert.alert(
            "Delete This Announcement",
            "Are you sure you want to delete this announcement",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteItem() }
            ]
        );
    };

    const handleEdit = item => {
        setFormArray(announcementForm);
        setValue(item);
        setAnnouncementsModal(false);
        navigation.navigate("FeedForm", {
            name: "announcement",
            action: "edit",
            minId: minId,
            multiple: false
        });
    };
    let content;

    content = (
        <FlatList
            keyExtractor={a => a._id}
            refreshing={isRefreshing}
            onRefresh={refresh}
            maxToRenderPerBatch={5}
            data={allAnnouncements}
            renderItem={({ item: a }) => (
                <TouchableWithoutFeedback onPress={() => handleDropdown(a._id)}>
                    <View
                        className="h-fit bg-white shadow-sm shadow-black
                        mx-2 mb-4 mt-2 rounded-md flex-row items-center"
                    >
                        <View
                            className={`${
                                isExpired(a.end) ? "bg-danger" : "bg-primary"
                            } w-[2%] rounded-l-md h-full min-h-[70px]`}
                        />
                        <View className="flex-1">
                            <View className="flex-row items-center justify-between">
                                <Text
                                    className="flex-1  capitalize font-semibold
                                        text-md px-2 py-1 text-justify"
                                >
                                    {a.title}
                                </Text>
                                <CusIcon
                                    action={() => handleEdit(a)}
                                    size={20}
                                    name="create"
                                />
                                {deleting && a._id === deletingItem && (
                                    <Loader />
                                )}
                                <CusIcon
                                    color="text-danger"
                                    action={() => handleDelete(a._id)}
                                    size={20}
                                    name="trash"
                                />
                            </View>

                            {dropDown && idx === a._id && (
                                <View className="px-2 space-y-2 py-2">
                                    <Separator />
                                    <View className="flex-row items-center space-x-2">
                                        <Text className="capitalize text-primary  font-semibold">
                                            Start
                                        </Text>
                                        <Text className="font-semibold capitalize">
                                            {formatDateTime(a.start)}
                                        </Text>
                                    </View>
                                    <View className="flex-row items-center space-x-2">
                                        <Text className="capitalize text-danger  font-semibold">
                                            End
                                        </Text>
                                        <Text className="font-semibold capitalize">
                                            {formatDateTime(a.end)}
                                        </Text>
                                    </View>
                                    <Separator />

                                    {a?.image?.length && (
                                        <View className="w-full h-36 ">
                                            <Image
                                                source={{
                                                    uri: a?.image[0]
                                                }}
                                                style={{
                                                    resizeMode: "cover"
                                                }}
                                                className="w-full h-full"
                                            />
                                        </View>
                                    )}

                                    <Text className="text-justify text-lg text-body">
                                        {a.body}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )}
        />
    );
    if (isError || error?.data)
        content = (
            <ScreenLoader refresh={refresh} text="no content try again..." />
        );
    if (loading || isLoading) content = <ScreenLoader text="loading data..." />;
    return (
        <Modal
            className="w-full h-full"
            animationType="slide"
            transparent={false}
            visible={announcementsModal}
            onRequestClose={() => setAnnouncementsModal(false)}
        >
            <View className="flex-1 ">
                <View className="px-5 py-2 bg-background flex-row items-center space-x-2">
                    <Text className="font-semibold capitalize text-title">
                        Announcements
                    </Text>
                </View>
                <SearchFilter
                    data={announcements ? announcements : []}
                    searchTerm={searchTerm}
                    filterCond={["title", "body"]}
                    sortCond={["title", "newest", "drange"]}
                    setSearchTerm={setSearchTerm}
                    filter={filter}
                    setFilter={setFilter}
                    searchedData={allAnnouncements}
                    setData={setAllAnnouncements}
                />
                {content}
            </View>
            <View className="absolute top-0 right-4">
                <CusIcon
                    action={() => setAnnouncementsModal(prev => !prev)}
                    bg="bg-primary"
                    color="text-white"
                    name="close"
                />
            </View>

            <AddButton action={() => handleNavigation()} />
        </Modal>
    );
};
export default AnnouncementsList;
