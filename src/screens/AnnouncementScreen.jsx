import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    FlatList,
    Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatDateTime } from "../lib/utils";
import {
    AddButton,
    CusIcon,
    SearchFilter,
    Separator,
    ScreenLoader,
    Loader
} from "../components";

import {
    useGetAnnouncementsQuery,
    useDeleteAnnouncementMutation
} from "../redux/announcement/announcementApiSlice";

import { announcementForm } from "../lib/forms";
import { GlobalContext } from "../hooks/GlobalContext";

const AnnouncementScreen = ({ navigation }) => {
    const { setValue, setFormArray } = useContext(GlobalContext);

    const {
        data: announcements,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetAnnouncementsQuery("announcementslist", {
        // pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    const [
        deleteAnnouncement,
        { isSuccess: deleted, isError: deleteIsError, error: deleteError }
    ] = useDeleteAnnouncementMutation();
    const [allAnnouncements, setAllAnnouncements] = useState([]);
    const [dropDown, setDropDown] = useState(false);
    const [idx, setIdx] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    useEffect(() => {
        try {
            setLoading(true);
            if (announcements && announcements !== undefined) {
                setAllAnnouncements(announcements);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
        return () => setLoading(false);
    }, [announcements]);
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
            image: [],
            start: "",
            end: "",
            link: "",
            body: ""
        });
        navigation.navigate("AnnouncementForm", {
            name: "Announcement",
            action: "create",
            multiple: true
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
    };

    const handleDelete = id => {
        const deleteItem = async () => {
            try {
                setDeleting(true);
                setDeletingItem(id);
                await deleteAnnouncement(id);
            } catch (error) {
                console.log("del", deleteError);
                throw new Error(error.message);
            } finally {
                if (deleted || deleteIsError) {
                    setDeleting(false);
                    setDeletingItem(null);
                }
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
        navigation.navigate("AnnouncementForm", {
            name: "Announcement",
            action: "edit",
            multiple: true
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
                                            {a.image.map(url => (
                                                <Image
                                                    source={{
                                                        uri: url
                                                    }}
                                                    style={{
                                                        resizeMode: "cover"
                                                    }}
                                                    className="w-full h-full"
                                                />
                                            ))}
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
        content = <ScreenLoader refresh={refresh}text="no content try again..." />;
    if (loading || isLoading) content = <ScreenLoader text="loading data..." />;
    return (
        <SafeAreaView className="bg-white flex-1">
            <Text className="uppercase text-2xl text-primary font-extrabold p-2  text-center">
                Announcements
            </Text>
            <SearchFilter
                data={announcements}
                searchTerm={searchTerm}
                filterCond={["title", "body"]}
                sortCond={["title", "newest", "drange"]}
                setSearchTerm={setSearchTerm}
                filter={filter}
                setFilter={setFilter}
                searchedData={allAnnouncements}
                setData={setAllAnnouncements}
            />
            <View className="bg-white max-w-full flex-1">{content}</View>
            <AddButton action={() => handleNavigation()} />
        </SafeAreaView>
    );
};

export default AnnouncementScreen;
