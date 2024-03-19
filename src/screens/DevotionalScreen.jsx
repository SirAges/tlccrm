import {
    View,
    Text,
    FlatList,
    Image,
    TextInput,
    TouchableWithoutFeedback,
    Alert
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    useGetDevotionsQuery,
    useDeleteDevotionMutation
} from "../redux/devotion/devotionApiSlice";

import { devotionForm } from "../lib/forms";
import { processText, getDays, getMonth } from "../lib/utils";
import {
    SearchFilter,
    Reactions,
    DevotionFilter,
    CusIcon,
    AddButton,
    ScreenLoader,
    Loader
} from "../components/";
import { GlobalContext } from "../hooks/GlobalContext";
const DevotionalScreen = ({ navigation }) => {
    const { setValue, setFormArray } = useContext(GlobalContext);

    const [allDevotions, setAllDevotions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState({
        year: "Select Year",
        month: "Select Month",
        day: "Select Day"
    });
    const [toggleList, setToggleList] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    const {
        data: devotions,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetDevotionsQuery("devotionslist", {
        // pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });
    const [
        deleteDevotion,
        { isSuccess: deleted, isError: deleteIsError, error: deleteError }
    ] = useDeleteDevotionMutation();

    useEffect(() => {
        try {
            setLoading(true);

            if (devotions && devotions !== undefined) {
                setAllDevotions(devotions);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }

        return () => setLoading(false);
    }, [devotions]);
  
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

    const handleDelete = id => {
        const deleteItem = async () => {
            try {
                setDeleting(true);
                setDeletingItem(id);
                await deleteDevotion(id);
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
            "Delete This Devotion",
            "Are you sure you want to delete this devotion",
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
        setFormArray(devotionForm);
        setValue(item);
        navigation.navigate("DevotionForm", {
            name: "Devotion",
            action: "edit",
            multiple: false
        });
    };
    const handleNavigation = () => {
        setFormArray(devotionForm);
        setValue({
            title: "",
            text: "",
            body: "",
            memoryVerse: {
                text: "",
                body: ""
            },
            prayers: ""
        });
        navigation.navigate("DevotionForm", {
            name: "devotion",
            action: "create",
            multiple: false
        });
    };

    const handleOutsideClick = clicked => {
        if (toggleList) {
            setToggleList(false);
        } else {
            navigation.navigate("SDevotionalScreen", { devotion: clicked });
        }
    };
    let content;

    content = (
        <FlatList
            keyExtractor={d => d._id}
            horizontal={false}
            refreshing={isRefreshing}
            onRefresh={refresh}
            initialNumToRender={2}
            data={allDevotions}
            renderItem={({ item: d }) => (
                <TouchableWithoutFeedback onPress={() => handleOutsideClick(d)}>
                    <View
                        className="bg-white mx-2 mb-5
                    shadow-sm shadow-black/50  rounded-lg "
                    >
                        <View className="flex-row w-full">
                            <View className="items-center justify-center bg-primary rounded-tl-lg px-0.5">
                                <Text className="uppercase font-extrabold text-xs text-white">
                                    day {getDays(d.createdAt)}
                                </Text>
                                <Text className="uppercase text-md tracking-[5px] leading-[15px] font-extrabold text-white">
                                    {getMonth(d.createdAt)}
                                </Text>
                            </View>
                            <View className="px-2 py-1">
                                <Text className="text-md font-extrabold uppercase">
                                    theme: {processText(d.title, 27)}
                                </Text>
                                <Text className="capitalize text-sm text-title">
                                    Text: {processText(d.text, 20)}
                                </Text>
                            </View>
                        </View>
                        <View className="px-2 ">
                            <Text className="capitalize font-semibold">
                                Memory Verse of the day
                            </Text>

                            <Text className="capitalize text-primary font-semibold text-xs">
                                {processText(d.memoryVerse.text)}
                            </Text>
                            <Text className="text-md text-body">
                                {processText(d.memoryVerse.body)}
                            </Text>
                        </View>

                        <View
                            className="flex-1 justify-end items-center
                        flex-row"
                        >
                            <CusIcon
                                action={() => handleEdit(d)}
                                size={20}
                                name="create"
                            />
                            {deleting && d._id === deletingItem && <Loader />}
                            <CusIcon
                                color="text-danger"
                                action={() => handleDelete(d._id)}
                                size={20}
                                name="trash"
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )}
        />
    );

     if ((!loading && !allDevotions.length) || isError || error?.data)
        content = (
            <ScreenLoader refresh={refresh} text="no content try again..." />
        );
    if (loading || isLoading) content = <ScreenLoader text="loading data..." />;
    return (
        <SafeAreaView className=" flex-1 bg-white">
            <Text
                className="capitalize font-extrabold text-2xl py-2 text-center
            text-primary"
            >
                daily devotion
            </Text>
            <DevotionFilter
                filter={filter}
                setFilter={setFilter}
                toggleList={toggleList}
                setToggleList={setToggleList}
                data={devotions}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchedData={allDevotions}
                setData={setAllDevotions}
            />

            {content}
            <AddButton action={() => handleNavigation()} />
        </SafeAreaView>
    );
};
export default DevotionalScreen;
