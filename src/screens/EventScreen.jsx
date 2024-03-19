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
    Loader,
    CountDown
} from "../components";

import {
    useGetEventsQuery,
    useDeleteEventMutation
} from "../redux/event/eventApiSlice";

import { eventForm } from "../lib/forms";
import { GlobalContext } from "../hooks/GlobalContext";

const EventScreen = ({ navigation }) => {
    const { setValue, setFormArray } = useContext(GlobalContext);

    const {
        data: events,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetEventsQuery("eventslist");

    const [
        deleteEvent,
        { isSuccess: deleted, isError: deleteIsError, error: deleteError }
    ] = useDeleteEventMutation();
    const [allEvents, setAllEvents] = useState([]);
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
            if (events && events !== undefined) {
                setAllEvents(events);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
        return () => setLoading(false);
    }, [events]);
    useEffect(() => {
        if (filter && searchTerm) {
            const clickedArr = allEvents.filter(
                f => f[filter].toLowerCase() === searchTerm.toLowerCase()
            );
            if (clickedArr.length) {
                setAllEvents(clickedArr);
            } else {
                setAllEvents(events);
            }
        } else {
            setAllEvents(events);
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
        setFormArray(eventForm);
        setValue({
            title: "",
            image: [],
            date: "",
            body: ""
        });
        navigation.navigate("EventForm", {
            name: "Event",
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
                await deleteEvent(id);
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
            "Delete This Event",
            "Are you sure you want to delete this event",
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
        setFormArray(eventForm);
        setValue(item);
        navigation.navigate("EventForm", {
            name: "Event",
            action: "edit",
            multiple: true
        });
    };
    let content;
    content = (
        <FlatList
            keyExtractor={e => e._id}
            refreshing={isRefreshing}
            onRefresh={refresh}
            maxToRenderPerBatch={5}
            data={allEvents}
            renderItem={({ item: e }) => (
                <View className="flex bg-white relative mt-1">
                    <View className="relative h-64 w-full">
                        <Image
                            className="w-full h-full"
                            style={{ resizeMode: "cover" }}
                            source={{ uri: e.image[0] }}
                        />
                    </View>
                    <View className="absolute top-2 left-2">
                        <CountDown navigation={navigation} date={e.date} />
                    </View>
                    <View
                        className="absolute top-4 right-4 bg-white rounded-sm
                    flex flex-row items-center space-x-2"
                    >
                        <CusIcon
                            name="trash"
                            color="text-danger"
                            action={() => handleDelete(e._id)}
                        />
                        {deleting && deletingItem === e._id && <Loader />}

                        <CusIcon name="create" action={() => handleEdit(e)} />
                    </View>
                    <View
                        className="absolute bottom-0 w-full bg-black/50 py-2
                        px-3
                    rounded-t-lg"
                    >
                        <Text className="capitalize text-white font-medium text-lg">
                            {e.title}
                        </Text>
                        <Text className="capitalize text-white font-medium text-xs">
                            {formatDateTime(e.date)}
                        </Text>
                        <Text className="capitalize text-white text-xs font-medium">
                            {e.body}
                        </Text>
                    </View>
                </View>
            )}
        />
    );
    if ((!loading && !allEvents.length) || isError || error?.data)
        content = (
            <ScreenLoader refresh={refresh} text="no content try again..." />
        );
    if (loading || isLoading) content = <ScreenLoader text="loading data..." />;
    return (
        <SafeAreaView className="bg-white flex-1">
            <Text className="uppercase text-2xl text-primary font-extrabold p-2  text-center">
                Events
            </Text>
            <SearchFilter
                data={events}
                searchTerm={searchTerm}
                filterCond={["title", "body"]}
                sortCond={["title", "newest"]}
                setSearchTerm={setSearchTerm}
                filter={filter}
                setFilter={setFilter}
                searchedData={allEvents}
                setData={setAllEvents}
            />
            <View className="bg-background max-w-full flex-1">{content}</View>
            <AddButton action={() => handleNavigation()} />
        </SafeAreaView>
    );
};

export default EventScreen;
